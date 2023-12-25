import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import { useParams } from 'react-router-dom';
const MembersDetails = ({ gs1MemberData, refreshAllUserData, editableData, handleInputChange }) => {
  console.log(gs1MemberData);
  const { Id } = useParams();
  console.log(editableData)
  console.log(Id);
  // Use state to manage editable values
  // const [editableData, setEditableData] = useState({
  //   companyNameEnglish: gs1MemberData?.company_name_eng || '',
  //   companyNameArabic: gs1MemberData?.company_name_arabic || '',
  //   country: gs1MemberData?.country || '',
  //   countryShortName: gs1MemberData?.country || '', // Change this to the correct property
  //   state: gs1MemberData?.state || '',
  //   city: gs1MemberData?.city || '',
  //   zipCode: gs1MemberData?.zip_code || '',
  //   mobileNo: gs1MemberData?.mbl_extension || '',
  //   contactPerson: gs1MemberData?.contactPerson || '',

  // });

  const [IsLoading, setIsLoading] = useState(false);
  const [country, setCountry] = React.useState([])
  const [selectedCountry, setSelectedCountry] = useState(gs1MemberData?.country || '');
  const [state, setState] = React.useState([])
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(editableData?.city);
  const [selectedState, setSelectedState] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [error, setError] = useState(false);
  
  // const handleUpdate = () => {
  //   // Handle the update logic here, e.g., dispatch an action to update data
  //   console.log('Updated data:', editableData);
  // };
  const handleUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();

    // Add hardcoded fields to the FormData
    // formData.append('user_type', 'new');
    // formData.append('location_uk', 'yes');
    // formData.append('have_cr', 'yes');
    // formData.append('cr_documentID', '12345');
    // formData.append('document_number', 'doc-67890');
    // formData.append('fname', 'John');
    // formData.append('lname', 'Doe');
    // formData.append('email', 'abdulmajid1m2@gmail.com');
    // formData.append('mobile', '1234567890');
    // formData.append('country', 'Saudi Aribia');
    // formData.append('state', 'Riyad');
    // formData.append('city', 'Main City');
    // formData.append('po_box', 'POBox1001');
    // formData.append('mbl_extension', '101');
    // Add other hardcoded fields as needed

    // Extract editable fields from editableData state and add them to FormData
    formData.append('company_name_eng', editableData.companyNameEnglish);
    formData.append('company_name_arabic', editableData.companyNameArabic);
    // if user not change that field then send old value
    formData.append('country', selectedCountry?.name || gs1MemberData?.country);
    formData.append('state', selectedState?.name || gs1MemberData?.state);
    formData.append('city', selectedCity?.name || gs1MemberData?.city);
    // formData.append('zip_code', editableData.zipCode);
    // formData.append('companyLandLine', mobileNumber);
    // formData.append('country', selectedCountry?.name);
    // formData.append('state', selectedState?.name);
    // formData.append('city', selectedCity?.name);
    formData.append('zip_code', editableData.zipCode);
    formData.append('companyLandLine', mobileNumber);
    formData.append('cr_number', editableData.cr_number);
    formData.append('cr_activity', editableData.cr_activity);
    formData.append('password', editableData.password);
    formData.append('contactPerson', editableData.contactPerson);
    // Add other editable fields as needed

    // formData.append('document', document); // Assuming document is a file input
    // formData.append('image', image); // Assuming image is a file input

    try {
      const response = await newRequest.put(`/users/${gs1MemberData?.id}`, formData);
      console.log(response?.data);
      setIsLoading(false);

      // add api message to toast
      toast.success(response?.data?.message || 'User updated successfully');

      // refresh all user data
      refreshAllUserData();

    }
    catch (error) {    
      console.log(error);
      setIsLoading(false);

      // add api message to toast
      toast.error(error?.response?.data?.message || 'Something went wrong');

    }

  };


  // Handle country selection
  const handleCountryName = (event, value) => {
    setSelectedCountry(value);
    console.log(value)

    const filteredStates = state.filter((state) => state.country_id == value?.id);
    setFilteredStates(filteredStates);
    setSelectedState(null);
    setFilteredCities([]);
  };


  // Handle state selection
  const handleState = (event, value) => {
    setSelectedState(value);
    const filteredCities = city.filter((city) => city.state_id == value?.id);
    setFilteredCities(filteredCities);
    // setSelectedCity(null);
  };


  const handleCity = (event, value) => {
    setSelectedCity(value);
    console.log('Selected State ID:', value.id);
  };


  // all Countries Api
  const handleCountryAndState = async () => {
    try {
      const response = await newRequest.get('/address/getAllCountries');
      const statesData = await newRequest.get(`/address/getAllStates`);
      const getStatesdata = statesData.data;
      const data = response.data;

      const countries = data.map((country) => ({
        id: country.id,
        name: country.name_en,
      }));

      setCountry(countries);
      setState(getStatesdata);

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }


  }


  const handleGetAllCities = async () => {
    try {
      const response = await newRequest.get(`/address/getAllCities`);
      const data = response.data;
      setCity(data);
    }
    catch (error) {
      console.error('Error fetching states:', error);
    }
  }




  useEffect(() => {
    handleCountryAndState();
    handleGetAllCities();


    setMobileNumber(gs1MemberData?.mobile || '');
    setUserPassword(editableData?.password || '');
  }
  , []);

  useEffect(() => {
  if (editableData) {
    setUserPassword(editableData.password || '');
  }
  }, [editableData]);

  
  const handlePassword = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setUserPassword(value);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      {/* Update button */}
      <div className='flex justify-end'>
        {/* <button
                  type='button'
                  onClick={handleUpdate}
                  className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>
                  <i className="fas fa-check mr-1"></i>Update
                </button> */}
        <Button
          variant="contained"
          style={{ borderRadius: '20px', width: '100px', height: '40px' }}
          onClick={handleUpdate}
          disabled={IsLoading}
          className="bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600"
          endIcon={IsLoading ? <CircularProgress size={24} color="inherit" /> : null}
        >
          Update
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          {/* <TextField
                    id="companyNameEnglish"
                    label="Company Name English"
                    variant="outlined"
                    value={gs1MemberData?.company_name_eng}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.company_name_eng),
                      style: { fontSize: gs1MemberData?.company_name_eng ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
          <TextField
            id="companyNameEnglish"
            label="Company Name English"
            variant="outlined"
            value={editableData.companyNameEnglish}
            onChange={(e) => handleInputChange('companyNameEnglish', e.target.value)}
          />
        </div>

        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          <TextField
            id="companyNameArabic"
            label="Company Name Arabic"
            variant="outlined"
            value={editableData.companyNameArabic}
            onChange={(e) => handleInputChange('companyNameArabic', e.target.value)}
          />
        </div>

        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          {/* <TextField
                      id="Country"
                      label="Country"
                      variant="outlined"
                      value={editableData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    /> */}
          <TextField
            id="CountryShortName"
            label="Country Short Name"
            variant="outlined"
            value={editableData.countryShortName}
            onChange={(e) => handleInputChange('countryShortName', e.target.value)}
          />

        </div>
      </div>


      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          <Autocomplete
            id="zone"
            options={country}
            getOptionLabel={(option) => option?.name || ""}
            onChange={handleCountryName}
            value={selectedCountry}
            onInputChange={(event, value) => {
              if (!value) {
                // perform operation when input is cleared
                console.log("Input cleared");
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  className: "text-white",
                }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  style: { color: "white" },
                }}
                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                placeholder={gs1MemberData?.country || "Country"}
                required
              />
            )}
            classes={{
              endAdornment: "text-white",
            }}
            sx={{
              "& .MuiAutocomplete-endAdornment": {
                color: "white",
              },
            }}
          />
        </div>

        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          {/* <TextField
                        id="State"
                        label="State"
                        variant="outlined"
                        value={editableData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      /> */}
          <Autocomplete
            id="state"
            options={filteredStates}
            value={selectedState}
            required
            getOptionLabel={(option) => option?.name || ""}
            onChange={handleState}
            onInputChange={(event, value) => {
              if (!value) {
                // perform operation when input is cleared
                console.log("Input cleared");
              }
            }}
            renderInput={(params) => (
              <TextField
                autoComplete="off"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  className: "text-white",
                }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  style: { color: "white" },
                }}
                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder={gs1MemberData?.state || "State"}
              // required
              />
            )}
            classes={{
              endAdornment: "text-white",
            }}
            sx={{
              "& .MuiAutocomplete-endAdornment": {
                color: "white",
              },
            }}
          />

        </div>

        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          {/* <TextField
                        id="City"
                        label="City"
                        variant="outlined"
                        value={editableData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      /> */}
          <Autocomplete
            id="city"
            options={filteredCities}
            value={selectedCity}
            required
            getOptionLabel={(option) => option?.name || ""}
            onChange={handleCity}
            onInputChange={(event, value) => {
              if (!value) {
                // perform operation when input is cleared
                console.log("Input cleared");
              }
            }}
            renderInput={(params) => (
              <TextField
                autoComplete="off"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  className: "text-white",
                }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  style: { color: "white" },
                }}
                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder={gs1MemberData?.city || "City"}
                value={gs1MemberData.city}
              // required
              />
            )}
            classes={{
              endAdornment: "text-white",
            }}
            sx={{
              "& .MuiAutocomplete-endAdornment": {
                color: "white",
              },
            }}
          />
        </div>
      </div>


      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          {/* <TextField
                    id="ZipCode"
                    label="Zip Code"
                    variant="outlined"
                    value={gs1MemberData?.zip_code}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.zip_code),
                      style: { fontSize: gs1MemberData?.zip_code ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
          <TextField
            id="ZipCode"
            label="Zip Code"
            variant="outlined"
            value={editableData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
          />
        </div>

        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          <div className='relative w-full'>
            <label
              htmlFor='mobile'
              className='absolute -top-2 left-3 bg-white text-gray-400 font-thin text-sm px-1'
            >
              Landline Number
            </label>
            <div className='flex items-center border-2 w-full h-14 rounded-md'>
              {/* <PhoneInput
                international
                country={'sa'}
                defaultCountry={'sa'}
                value={gs1MemberData?.companyLandLine}
                inputProps={{
                  id: 'mobile',
                  placeholder: 'Mobile Number',
                }}

                inputStyle={{
                  width: '100%',
                  borderRadius: '0px',
                  border: 'none',
                }}
                required
              /> */}
              <PhoneInput
                    international
                    country={'sa'}
                    defaultCountry={'sa'}
                    value={editableData?.companyLandline}
                    inputProps={{
                      id: 'mobile',
                      placeholder: 'Mobile Number',
                    }}
                    inputStyle={{
                      width: '100%',
                      borderRadius: '0px',
                      border: 'none',
                    }}
                    required
                    onChange={(value) => setMobileNumber(value)}
                  />

            </div>
          </div>
        </div>

        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            value={gs1MemberData?.email}
            InputLabelProps={{
              shrink: Boolean(gs1MemberData?.email),
              style: { fontSize: gs1MemberData?.email ? '16px' : '16px', zIndex: '0' },
            }}
          />
        </div>
      </div>


      <div className='h-auto w-full mt-8 px-1'>
        <div className='flex justify-between'>
          <p className='text-blue-500 font-sans font-semibold'>GS1 Member Details</p>
          {/* <button className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>Change Membership</button> */}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="crNumber"
              label="Cr Number"
              variant="outlined"
              value={editableData?.cr_number}
              onChange={(e) => handleInputChange('cr_number', e.target.value)}
              InputLabelProps={{
                shrink: Boolean(editableData?.cr_number),
                style: { fontSize: editableData?.cr_number ? '16px' : '16px', zIndex: '0' },
              }}
            />
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="crActivity"
              label="Cr Activity"
              variant="outlined"
              value={editableData?.cr_activity}
              onChange={(e) => handleInputChange('cr_activity', e.target.value)}
              InputLabelProps={{
                shrink: Boolean(editableData?.cr_activity),
                style: { fontSize: editableData?.cr_activity ? '16px' : '16px', zIndex: '0' },
              }}
            />
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="companyNameEnglish"
              label="Company Name English"
              variant="outlined"
              value={gs1MemberData?.company_name_eng}
              InputLabelProps={{
                shrink: Boolean(gs1MemberData?.company_name_eng),
                style: { fontSize: gs1MemberData?.company_name_eng ? '16px' : '16px', zIndex: '0' },
              }}
            />
          </div>
        </div>


        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="companyNameArabic"
              label="Company Name Arabic"
              variant="outlined"
              value={gs1MemberData?.company_name_arabic}
              InputLabelProps={{
                shrink: Boolean(gs1MemberData?.company_name_arabic),
                style: { fontSize: gs1MemberData?.company_name_arabic ? '16px' : '16px', zIndex: '0' },
              }}
            />
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="companyGCP"
              label="Company GCP"
              variant="outlined"
              value={gs1MemberData?.gcpGLNID}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
              }}
            />
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            {/* <TextField
                      id="contactPerson"
                      label="Contact Person"
                      variant="outlined"
                      value={gs1MemberData?.contactPerson}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    /> */}
            <TextField
              id="contactPerson"
              label="Contact Person"
              variant="outlined"
              value={editableData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            />
          </div>

        </div>


        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="companyId"
              label="Company ID"
              variant="outlined"
              value={gs1MemberData?.companyID}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
              }}
            />
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            {/* <TextField
                      id="mobileNo"
                      label="Mobile No (omit zero)"
                      variant="outlined"
                      value={gs1MemberData?.mobile}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    /> */}
            <div className='relative w-full'>
              <label
                htmlFor='mobile'
                className='absolute -top-2 left-3 bg-white text-gray-400 font-thin text-sm px-1'
              >
                Mobile No (omit zero)
              </label>
              <div className='flex items-center border-2 w-full h-14 rounded-md'>
                <PhoneInput
                  international
                  country={'sa'}
                  defaultCountry={'sa'}
                  value={gs1MemberData?.mobile || ''}
                  // onChange={setMobileNumber}
                  // onChange={(e) => setCompanyLandLine(e)}
                  disabled
                  inputProps={{
                    id: 'mobileomit',
                    placeholder: 'Mobile Number',
                  }}

                  inputStyle={{
                    width: '100%',
                    borderRadius: '0px',
                    border: 'none',
                  }}

                />
              </div>
            </div>
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="memberID"
              label="Member ID"
              variant="outlined"
              value={gs1MemberData?.memberID}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
              }}
            />
          </div>

        </div>


        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="companyLandline"
              label="Company Landline"
              variant="outlined"
              value={gs1MemberData?.companyLandLine}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
              }}
            />
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={userPassword}
              onChange={handlePassword}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
              }}
            />
            {error && <p className='text-red-500 text-xs'>Password must be 6 digit</p>}
          </div>

          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
            <TextField
              id="membershipType"
              label="Membership Type"
              variant="outlined"
              value={gs1MemberData?.membership_category}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
              }}
            />
          </div>
        </div>
      </div>
    </div>
    //      </div>
    //     </div>
    // </div>
  )
}

export default MembersDetails