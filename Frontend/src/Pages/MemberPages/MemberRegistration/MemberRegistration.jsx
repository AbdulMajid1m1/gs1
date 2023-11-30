import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import { Autocomplete, TextField } from '@mui/material';
import newRequest from '../../../utils/userRequest';
import './MemberRegistration.css';
import Header from '../../../components/Header/Header';

const MemmberRegisteration = () => {
    const [country, setCountry] = React.useState([])
    const [state, setState] = React.useState([])
    const [city, setCity] = useState([]);
    const [getAllActivities, setGetAllActivities] = React.useState([])
    const [companyLandLine, setCompanyLandLine] = React.useState('')
    const [mobileNumber, setMobileNumber] = React.useState('')
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedActivity, setSelectedActivity] = React.useState('')

    // multple select 
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeOptions, setAttributeOptions] = useState([]);
    const [selectedOtherProducts, setSelectedOtherProducts] = useState([]);
    const [otherProductsOptions, setOtherProductsOptions] = useState([]);
    const [selectedGLNOption, setSelectedGLNOption] = useState(null);

    useEffect(() => {

    //All Activities Api
    newRequest.get('/crs/getCrsById/452819')
    .then((response) => {
      const data = response.data;
      const Activities = data.map((activity) => ({
        id: activity.id,
        name: activity.activity,
      }));
      setGetAllActivities(Activities);
    })
    .catch((error) => {
      console.log(error);
    }); 

    // Search GPC Api
     newRequest.get('/attributes/113')
        .then((response) => {
          setAttributeOptions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

        
        // Other Products Api (GLN, SSCC, UDI)
        const handleOtherProductsData = async () => {
            try {
                const response = await newRequest.get('/otherProducts');
                setOtherProductsOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // handleActivityData();
        handleOtherProductsData();
  
    }, []);
  

    const handleAttributeChange = (event, value) => {
      setSelectedAttributes(value);
    //   console.log(newValue);
    const attributesValue = value.map((option) => option.attributes_title);
    console.log(attributesValue);
    
    };


    const handleOtherProductsChange = (event, value) => {
        setSelectedOtherProducts(value);
        // console.log(value);

        const name = value.map((option) => option.product_name);
        console.log(name);

        // Check if the selected option is GLN (20 Locations), GLN (10 Locations), or GLN (30 Locations)
        const selectedGLN = value.find(
          (option) =>
            option.product_name === 'GLN ( 20 Locations)' ||
            option.product_name === 'GLN ( 10 Locations)' ||
            option.product_name === 'GLN (30 Locations)'    
        );
    
        setSelectedGLNOption(selectedGLN);
      };
    
      const getOptionDisabled = (option) => {
        return (
          selectedGLNOption &&
          option.product_name.startsWith('GLN') &&
          option.product_name !== selectedGLNOption.product_name
        );
      };

    // multiple select end 


    useEffect(() => {
        
        // all Countries Api
        newRequest.get('/address/getAllCountries')
          .then((response) => {
            const data = response.data;
            const countries = data.map((country) => ({
              id: country.id,
              name: country.name_en,
            }));
            setCountry(countries);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    

      const handleCountryName = (event, value) => {
        setSelectedCountry(value);
        // console.log(value?.id);
    
        if (value) {
          // Fetch states based on the selected country, States Api
          newRequest.get(`/address/getStateByCountryId/${value.id}`)
            .then((response) => {
              const data = response.data;
              const states = data.map((state) => ({
                id: state.id,
                name: state.name,
              }));
              setState(states);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setState([]);
        }
      };
    
      const handleState = (event, value) => {
        setSelectedState(value);
        console.log(value?.id);
      };


        // City Api   
      const handleCity = (event, value) => {
        setSelectedCity(value);
       
        if (value) {
          newRequest.get(`/address/getCityByStateId/${value?.id}`)
            .then((response) => {
                const data = response.data;
                const cities = data.map((city) => ({
                    id: city.id,
                    name: city.name,
                }));
                setCity(cities);
            })
            .catch((error) => {
                console.log(error);
            });
            } else {
          // If no state is selected, clear the cities
          setCity([]);
        }
      };


      const handleSelectedActivityData = (event, value) => {
        setSelectedActivity(value);
    }

    
    

    return (
        <div>
           <div className='sticky top-0 z-50 bg-white'>
              {/* Headers */}
              <Header />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className='h-auto w-[90%] border-l border-r border-primary'>
                    <div className='h-5 w-full bg-primary'></div>
                    <div className='h-16 w-full flex justify-between items-center px-5'>
                        <p className='sm:text-2xl font-semibold text-sm text-secondary'>Member Registration</p>
                    </div>
                </div>

                <div className='h-auto sm:w-[90%] w-full p-6 shadow-xl border-l border-r border-primary'>
                    <form>
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='activty'>CR Activities<span className='text-red-600'>*</span></label> 
                                <Autocomplete
                                    id="activty"
                                    options={getAllActivities}
                                    value={selectedActivity}
                                    getOptionLabel={(option) => option?.activity || ""}
                                    onChange={handleSelectedActivityData}
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
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="CR Activities"
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

                        {/* Add Five Radio Buttons  */}
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-6 mb-6'>
                             <div className='w-full font-sans sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold text-sm'>Non-Medical Category</p>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold text-sm'>Medical Category</p>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold text-sm'>Tobacco Category</p>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold text-sm'>Cosmetics Category</p>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold text-sm'>Pharma Category</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full sm:w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='email'>Email<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationEnglish(e.target.value)}
                                    id='email'
                                    placeholder='Email'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='locationEnglish'>Company Name [English]<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationEnglish(e.target.value)}
                                    id='locationEnglish'
                                    placeholder='Company Name English'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='locationArabic'>Company Name [Arabic]<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationArabic(e.target.value)}
                                    id='locationArabic'
                                    placeholder='Company Name Arabic'
                                    type='text' className='border-2 border-[#e4e4e4] w-full text-right rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='contactperson'>Contact Person<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setContactPerson(e.target.value)}
                                    id='contactperson'
                                    placeholder='Contact Person'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>

                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Comapny Landline<span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-2 border-[#e4e4e4] w-full rounded-sm '>
                                    <PhoneInput
                                        international
                                        defaultCountry="SA"
                                        value={companyLandLine}
                                        onChange={setCompanyLandLine}
                                        containerStyle={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Company Landline',
                                        }}
                                        style={{
                                            width: '100%',
                                            border: '#e4e4e4',
                                            borderRadius: '8px',
                                            padding: '2px',
                                            marginBottom: '3px',
                                        }}
                                    />


                                </div>
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Mobile Number <span>(Omit Zero)</span><span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-2 border-[#e4e4e4] w-full rounded-sm'>
                                    <PhoneInput
                                        international
                                        defaultCountry="SA"
                                        value={mobileNumber}
                                        onChange={setMobileNumber}
                                        containerStyle={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Mobile Number',
                                        }}
                                        style={{
                                            width: '100%',
                                            border: '#e4e4e4',
                                            borderRadius: '8px',
                                            padding: '2px',
                                            marginBottom: '3px',
                                        }}
                                    />


                                </div>
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='extension'>Extension no.<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationEnglish(e.target.value)}
                                    id='extension'
                                    placeholder='Extension no.'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>

                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='zipcode'>Zip Code<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationEnglish(e.target.value)}
                                    id='zipcode'
                                    placeholder='Zip Code*'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='website'>Website<span className='text-red-600 font-normal'>* Please enter a valid URL</span></label>
                                <input
                                    // onChange={(e) => setLocationArabic(e.target.value)}
                                    id='website'
                                    placeholder='Website'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='searchgpc'>Search GPC<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    multiple
                                    id='searchgpc'
                                    options={attributeOptions}
                                    getOptionLabel={(option) => option.attributes_title}
                                    value={selectedAttributes}
                                    onChange={handleAttributeChange}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Search GPC'
                                        placeholder='Search GPC'
                                        variant='outlined'
                                    />
                                        )}
                                />
                            </div>

                        </div>



                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                         
                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='country'>Country<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="country"
                                    options={country}
                                    value={selectedCountry}
                                    getOptionLabel={(option) => option?.name || ""}
                                    onChange={handleCountryName}
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
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="Country"
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


                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='state'>State<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="state"
                                    options={state}
                                    value={selectedState}
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
                                            placeholder="State"
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


                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='city'>City<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="city"
                                    options={city}
                                    value={selectedCity}
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
                                            placeholder="City"
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


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>

                           
                        </div>



                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>

                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label className='text-secondary font-semibold' htmlFor='GTIN'>GTIN<span className='text-red-600'>*</span></label>
                                {/* <Autocomplete
                                    id="GTIN"
                                    options={country}
                                    value={selectedCountry}
                                    getOptionLabel={(option) => option}
                                    onChange={handleCountryName}
                                    onInputChange={(event, value) => {
                                        if (!value) {
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
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="GTIN"
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
                                /> */}
                            </div>


                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label className='text-secondary font-semibold' htmlFor='other'>Other Products<span className='font-normal'> (GLN,SSCC,UDI)</span></label>
                                <Autocomplete
                                    multiple
                                    id='other'
                                    options={otherProductsOptions}
                                    getOptionLabel={(option) => option.product_name}
                                    value={selectedOtherProducts}
                                    onChange={handleOtherProductsChange}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Search GPC'
                                        placeholder='Search GPC'
                                        variant='outlined'
                                    />
                                    )}
                                    getOptionDisabled={getOptionDisabled}
                            />
                                
                            </div>

                        </div>

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>
                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='upload'>Upload Company Documents<span className='text-red-600'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationEnglish(e.target.value)}
                                    id='upload'
                                    placeholder='Upload Company Documents'
                                    type='file' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='website'>Upload National Address <span className='font-normal'> (QR Code photo)</span><span className='text-red-600 font-normal'>*</span></label>
                                <input
                                    // onChange={(e) => setLocationArabic(e.target.value)}
                                    id='website'
                                    placeholder='Website'
                                    type='file' className='border-2 border-[#e4e4e4] w-full text-right rounded-sm p-2 mb-3' />
                            </div>
                        </div>


                        <div>
                          <div className='mt-6'>
                            <label className='text-secondary text-3xl font-sans font-bold'>Your Subscription</label>
                            <div className="table-Bintobin-Axapta px-4">
                                <p className='text-secondary text-2xl font-sans font-bold text-center mb-4 mt-4'>Subscription Summary</p>
                                <table>
                                <thead>
                                    <tr>
                                    <th>PRODUCT</th>
                                    <th>REGISTRATION FEE</th>
                                    <th>YEARLY FEE</th>
                                    <th>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {data.map((item, index) => (
                                    <tr key={index} onClick={() => handleRowClick(item, index)}>
                                        <td>{item.transferId}</td>
                                        <td>{item.transferStatus}</td>
                                        <td>{item.inventLocationIdFrom}</td>
                                        <td>{item.inventLocationIdTo}</td>
                                        <td>{item.itemId}</td>
                                        <td>{item.qtyTransfer}</td>
                                        <td>{item.qtyReceived}</td>
                                        <td>{item.createdDateTime}</td>
                                    </tr>
                                    ))} */}
                                    <tr>
                                        <td>GTIN</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>GLN</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>SSCC</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                                </table>
                              </div>
                            </div>
                        </div>

                        {/* add one radio button */}
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>
                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold'>Bank Transfer</p>
                                </div>
                                
                            </div>
                         </div>
                        
                        <button type='submit' className="sm:w-[30%] w-full rounded bg-primary hover:bg-secondary font-sans px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200">
                                <i className="fas fa-check-circle mr-1"></i> Submit
                        </button>

                    </form>

                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default MemmberRegisteration