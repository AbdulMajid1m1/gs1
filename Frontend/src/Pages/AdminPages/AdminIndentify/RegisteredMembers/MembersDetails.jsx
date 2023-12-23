import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';

const MembersDetails = ({ gs1MemberData }) => {
   // Use state to manage editable values
   const [editableData, setEditableData] = useState({
    companyNameEnglish: gs1MemberData?.company_name_eng || '',
    companyNameArabic: gs1MemberData?.company_name_arabic || '',
    country: gs1MemberData?.country || '',
    countryShortName: gs1MemberData?.country || '', // Change this to the correct property
    state: gs1MemberData?.state || '',
    city: gs1MemberData?.city || '',
    zipCode: gs1MemberData?.zip_code || '',
    mobileNo: gs1MemberData?.mbl_extension || '',
    contactPerson: gs1MemberData?.contactPerson || '',

  });
  const [IsLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
    // formData.append('countryShortName', editableData.countryShortName);
    formData.append('state', editableData.state);
    formData.append('city', editableData.city);
    formData.append('zip_code', editableData.zipCode);
    formData.append('mobile', editableData.mobileNo);
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

    } 
    catch (error) {
      console.log(error);
      setIsLoading(false);

      // add api message to toast
      toast.error(error?.response?.data?.message || 'Something went wrong');
      
    }

  };
  

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
                  {/* <TextField
                    id="companyNameArabic"
                    label="Company Name Arabic"
                    variant="outlined"
                    value={gs1MemberData?.company_name_arabic}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.company_name_arabic),
                      style: { fontSize: gs1MemberData?.company_name_arabic ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
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
                    value={gs1MemberData?.country}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.country),
                      style: { fontSize: gs1MemberData?.country ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
                   <TextField
                      id="Country"
                      label="Country"
                      variant="outlined"
                      value={editableData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                </div>
              </div>


              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  {/* <TextField
                    id="CountryShortName"
                    label="Country Short Name"
                    variant="outlined"
                    value={gs1MemberData?.country}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.country),
                      style: { fontSize: gs1MemberData?.country ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
                   <TextField
                      id="CountryShortName"
                      label="Country Short Name"
                      variant="outlined"
                      value={editableData.countryShortName}
                      onChange={(e) => handleInputChange('countryShortName', e.target.value)}
                    />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  {/* <TextField
                    id="State"
                    label="State"
                    variant="outlined"
                    value={gs1MemberData?.state}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.state),
                      style: { fontSize: gs1MemberData?.state ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
                    <TextField
                        id="State"
                        label="State"
                        variant="outlined"
                        value={editableData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  {/* <TextField
                    id="City"
                    label="City"
                    variant="outlined"
                    value={gs1MemberData?.city}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.city),
                      style: { fontSize: gs1MemberData?.city ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
                    <TextField
                        id="City"
                        label="City"
                        variant="outlined"
                        value={editableData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
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
                  {/* <TextField
                    id="mobile"
                    label="Mobile No (omit zero)"
                    variant="outlined"
                    value={gs1MemberData?.mbl_extension}
                    InputLabelProps={{
                      shrink: Boolean(gs1MemberData?.mbl_extension),
                      style: { fontSize: gs1MemberData?.mbl_extension ? '16px' : '16px', zIndex: '0' },
                    }}
                  /> */}
                    <TextField
                        id="mobile"
                        label="Mobile No (omit zero)"
                        variant="outlined"
                        value={editableData.mobileNo}
                        onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                      />
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
                      value={gs1MemberData?.cr_number}
                      InputLabelProps={{
                        shrink: Boolean(gs1MemberData?.cr_number),
                        style: { fontSize: gs1MemberData?.cr_number ? '16px' : '16px', zIndex: '0' },
                      }}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <TextField
                      id="crActivity"
                      label="Cr Activity"
                      variant="outlined"
                      value={gs1MemberData?.cr_activity}
                      InputLabelProps={{
                        shrink: Boolean(gs1MemberData?.cr_activity),
                        style: { fontSize: gs1MemberData?.cr_activity ? '16px' : '16px', zIndex: '0' },
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
                    <TextField
                      id="mobileNo"
                      label="Mobile No (omit zero)"
                      variant="outlined"
                      value={gs1MemberData?.mobile}
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                      }}
                    />
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