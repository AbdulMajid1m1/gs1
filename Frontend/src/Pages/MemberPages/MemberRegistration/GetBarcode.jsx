import React, { useEffect, useState, useRef } from 'react'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../../utils/userRequest'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

const GetBarcode = () => {
  const [hasCR, setHasCR] = useState(true); // Default to 'Yes'
  const [allDocuments, setAllDocuments] = useState([]); // Default to 'Yes'
  const [selectedDocument, setSelectedDocument] = useState('');
  const navigate = useNavigate();

  const handleRadioChange = (value) => {
    setHasCR(value === 'yes');
  };


const handleSelectChange = (event, value) => {
    console.log(value);
    setSelectedDocument(value);
};

  useEffect(() => {
    newRequest.get('/crDocuments')
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const names = data.map((document) => document.name);
        // Set the names in state or use them as needed
        setAllDocuments(names);
        console.log(names);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  const abortControllerRef = useRef(null);
  const [gpc, setGpc] = useState(null);
  const [gpcCode, setGpcCode] = useState('');
  const [gpcList, setGpcList] = useState([]); // gpc list
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
        

  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setGpc(value);
    setGpcCode(value?.gpcCode);
  }


  const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
    console.log(reason)
    if (reason === 'reset' || reason === 'clear') {
        setGpcList([]); // Clear the data list if there is no input
        return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
        return // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
        // perform operation when input is cleared
        setGpcList([]);
        return;
    }


    setAutocompleteLoading(true);
    setOpen(true);


    console.log(newInputValue);
    // setSearchText(newInputValue);
    console.log("querying...")
    try {

        // Cancel any pending requests
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create a new AbortController
        abortControllerRef.current = new AbortController();
        const res = await newRequest.get(`/crs/seachByKeyword?keyword=${newInputValue}`, {

            // signal: abortControllerRef.current.signal
        })

        // const res = await newRequest.get(`/crs/seachByKeyword?keyword=${newInputValue}`)

        console.log(res);
        setGpcList(res?.data?.gpc ?? []);
        setOpen(true);
        setAutocompleteLoading(false);
    }
    catch (error) {
        if (error?.name === 'CanceledError') {
            // Ignore abort errors
            setGpcList([]); // Clear the data list if there is no input
            setAutocompleteLoading(true);
            console.log(error)
            return;
        }
        console.error(error);
        console.log(error)
        setGpcList([]); // Clear the data list if an error occurs
        setOpen(false);
        setAutocompleteLoading(false);
    }

}



  return (
    <div>
        {/* Nav */}
          <div className='sticky top-0 z-50 bg-white'>
             <Header />
          </div>
        {/* End Nav */}
        <div className='flex justify-center items-center mt-5 mb-10'>
            <div className='h-auto w-[90%] border-l border-r border-b border-primary'>
                <div className='h-5 w-full bg-primary'></div>
                <div className='flex justify-between items-center flex-wrap px-12 py-5'>
                  <div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-3xl font-bold font-sans text-secondary'>Welcome To GS1 </h2>
                        <p className='text-xl font-bold font-sans text-secondary'>Your Registration & Barcode journey will start here.</p>
                    </div>

                    <div className='flex flex-col font-sans py-4 gap-2'>
                        <div>
                            <p className='text-xl font-bold text-secondary'>Is your company located in the Kingdom? <span className='text-[#FF3E01]'>*</span></p>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex items-center gap-2'>
                                <input type="radio" name="yes" id="yes" />
                                <label htmlFor="yes" className='text-secondary font-medium'>Yes</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="radio" name="no" id="no" />
                                <label htmlFor="no" className='text-secondary font-medium'>No</label>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-col py-4 gap-2'>
                        <div>
                            <p className='text-xl font-bold font-sans text-secondary'>Do you have CR Number? <span className='text-[#FF3E01]'>*</span></p>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio"
                                     name="yes"
                                      id="yes"
                                       checked={hasCR}
                                        onChange={() => handleRadioChange('yes')}
                                />
                                <label htmlFor="yes" className='text-secondary font-medium'>Yes</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio"
                                     name="no"
                                      id="no" 
                                       checked={!hasCR}
                                        onChange={() => handleRadioChange('no')}
                                 />
                                <label htmlFor="no" className='text-secondary font-medium'>No</label>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-col py-4 gap-2'>
                        <h2 className='text-2xl font-bold font-sans'>Note:</h2>
                        <p className='text-xl font-medium font-sans text-secondary'>*For member registration instructional video. <span className='text-[#FF3E01]'>Click Here Registration Guide</span></p>
                        <p className='text-xl font-medium font-sans text-secondary'>*For member registration step by step in pdf format <span className='text-[#FF3E01]'>Click Here PDF Guide</span></p>
                    </div>

                  </div>

                  <div>
                    <div className='flex flex-col gap-2'>
                    {hasCR ? (
                      <>
                        <label htmlFor="companyName" className='text-xl font-bold font-sans text-secondary'>CR Number <span className='text-[#FF3E01]'>* </span><span className='text-secondary font-normal text-lg'>(About CR Number)</span></label>
                        {/* <input 
                            type="text" 
                                name="companyName" id="companyName" 
                                className='h-12 w-full border border-[#8E9CAB] font-sans rounded-md px-2'
                                placeholder='Search CR Number'
                                /> */}
                        <Autocomplete
                            id="companyName"
                            required
                            options={gpcList}
                            getOptionLabel={(option) => (option && option?.value) ? option?.value : ''}
                            onChange={handleGPCAutoCompleteChange}
                            value={gpc}
                            onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                            loading={autocompleteLoading}
                            sx={{ marginTop: '10px' }}
                            open={open}
                            onOpen={() => {
                                // setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    {option ? `${option?.value}` : 'No options'}
                                </li>
                            )}

                            renderInput={(params) => (
                                <TextField
                                    // required
                                    {...params}
                                    label="Search CR Number"
                                    InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {autocompleteLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                        ),
                                    }}
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#00006A',
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#00006A',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#000000',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#000000',
                                        },
                                        },
                                    }}
                                />
                        )}

                        />

                            <p className='font-normal text-secondary font-sans'>Click here if you want to add your CR!</p>
                       
                        </>
                        ) : (
                        <>
                        <div className=''>
                            <label htmlFor="companyName" className='text-xl font-bold font-sans text-secondary'>
                                Documents <span className='text-[#FF3E01]'>* </span>
                            </label>
                            {/* <select
                              name="companyName"
                               id="companyName"
                                className='h-12 w-full border border-[#8E9CAB] font-sans rounded-md px-2'
                                 placeholder='Search CR Number'
                                 value={selectedDocument}
                                 onChange={handleSelectChange}                         
                            >
                                <option value="Select CR Number">Select CR Number</option>
                                {allDocuments.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                                ))}
                            </select> */}
                             <Autocomplete
                                id="countryName"
                                options={allDocuments}
                                getOptionLabel={(option) => option}
                                onChange={handleSelectChange}
                                value={selectedDocument}

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

                                    className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                    placeholder="Documents"
                                    required
                                />
                            )}
                                classes={{
                                    endAdornment: "text-white",
                                }}
                                sx={{
                                '& .MuiAutocomplete-endAdornment': {
                                    color: 'white',
                                },
                                }}
                            />
                            </div>
                        </>
                     )}
                        <button 
                          onClick={() => navigate('/member-registration')}
                            className='bg-secondary font-bold font-sans text-white rounded w-full py-3 hover:bg-primary'>
                                Continue
                        </button>
                        
                    </div>
                  </div>
                </div>
            </div>
        </div>



        {/* Footer */}
            <Footer />
        {/* End Footer */}
    </div>
  )
}

export default GetBarcode