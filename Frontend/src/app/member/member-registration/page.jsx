'use client';
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import { Autocomplete, TextField } from '@mui/material';

const Page = () => {
  const [country, setCountry] = React.useState([])
  const [state, setState] = React.useState([])
  const [city, setCity] = useState([]);
  const [mobileNumber, setMobileNumber] = React.useState('')
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleCity = (event, value) => {
    console.log(value);
    setSelectedCity(value);
};


const handleCountryName = (event, value) => {
    console.log(value);
    setSelectedCountry(value);
};


const handleState = (event, value) => {
    console.log(value);
    setSelectedState(value);
};

  return (
    <div>
         <div className="flex flex-col justify-center items-center">
                <div className='h-auto w-[90%] border-l border-r border-primary'>
                    <div className='h-5 w-full bg-primary'></div>
                        <div className='h-16 w-full flex justify-between items-center px-5'>
                          <p className='sm:text-2xl font-semibold text-sm text-secondary'>Member Registration</p>
                        </div>
                </div>

                {/* <div className='h-auto w-full px-0 pt-2 shadow-xl'> */}
                    <div className='h-auto sm:w-[90%] w-full p-6 shadow-xl border-l border-r border-primary'>
                        <form>
                            <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                                <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                    <label className='text-secondary font-semibold' htmlFor='activty'>CR Activities<span className='text-red-600'>*</span></label>
                                    <select
                                        // onChange={(e) => setLocationEnglish(e.target.value)}
                                        id='activty'
                                        placeholder='-select-'
                                        type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3'>
                                        <option>-select-</option>
                                    </select>
                                </div>
                            </div>

                          <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                                <div className='w-full sm:w-[32.5%] font-body sm:text-base text-sm flex flex-col gap-1'>
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
                                            value={mobileNumber}
                                            onChange={setMobileNumber}
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
                                    <label className='text-secondary font-semibold' htmlFor='locationEnglish'>Extension no.<span className='text-red-600'>*</span></label>
                                    <input
                                        // onChange={(e) => setLocationEnglish(e.target.value)}
                                        id='locationEnglish'
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
                                    <input
                                        // onChange={(e) => setContactPerson(e.target.value)}
                                        id='searchgpc'
                                        placeholder='Search GPC'
                                        type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                                </div>

                            </div>


                            
                            <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                                <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                    <label className='text-secondary font-semibold' htmlFor='addedgpc'>Added GPC<span className='text-red-600'>*</span></label>
                                    <input
                                        // onChange={(e) => setContactPerson(e.target.value)}
                                        id='addedgpc'
                                        placeholder='Added GPC'
                                        type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                                </div>

                                <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                    <label className='text-secondary font-semibold' htmlFor='country'>Country<span className='text-red-600'>*</span></label>
                                    {/* <input
                                    id='country'
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder='Country' 
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                       */}
                                    <Autocomplete
                                        id="country"
                                        options={country}
                                        value={selectedCountry}
                                        getOptionLabel={(option) => option}
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
                                        getOptionLabel={(option) => option}
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

                            </div>


                            <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>

                                <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                    <label className='text-secondary font-semibold' htmlFor='city'>City<span className='text-red-600'>*</span></label>
                                    <Autocomplete
                                        id="city"
                                        options={city}
                                        value={selectedCity}
                                        getOptionLabel={(option) => option}
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



                            <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>
                               
                                <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                    <label className='text-secondary font-semibold' htmlFor='GTIN'>GTIN<span className='text-red-600'>*</span></label>
                                     <Autocomplete
                                        id="GTIN"
                                        options={country}
                                        value={selectedCountry}
                                        getOptionLabel={(option) => option}
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
                                    />
                                </div>


                                <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                    <label className='text-secondary font-semibold' htmlFor='other'>Other Products<span className='font-normal'> (GLN,SSCC,UDI)</span></label>
                                    <Autocomplete
                                        id="other"
                                        options={state}
                                        value={selectedState}
                                        getOptionLabel={(option) => option}
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
                                                placeholder="Other Products (GLN,SSCC,UDI)"
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


                            {/* <button type='submit' className="rounded-full bg-[#1E3B8B] font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                                <i className="fas fa-check-circle mr-1"></i> Submit
                            </button> */}
                        </form>                    
                     
                    </div>
                {/* </div> */}
            </div>
    </div>
  )
}

export default Page