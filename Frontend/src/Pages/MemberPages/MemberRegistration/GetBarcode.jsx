import React, { useEffect, useState, useRef } from 'react'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../../utils/userRequest'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { debounce } from '@mui/material/utils';
import AddCrNumber from './AddCrNumber'

const GetBarcode = () => {
  const [hasCR, setHasCR] = useState(true); // Default to 'Yes'
  const [allDocuments, setAllDocuments] = useState([]); // Default to 'Yes'
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedCr, setSelectedCr] = useState(null);
  const [crList, setCrList] = useState([]); // gpc list
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [isDocumentAutocompleteFilled, setIsDocumentAutocompleteFilled] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [location, setLocation] = useState(""); // Default to 'Yes
  const abortControllerRef = useRef(null);

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

  const handleShowCreatePopup = () => {
      setCreatePopupVisibility(true);
    };


  const navigate = useNavigate();

  const handleRadioChange = (value) => {
    setHasCR(value === 'yes');
  };


  const handleSelectChange = (event, value) => {
    console.log(value);
    setSelectedDocument(value);

    // save this value in sesstion storage
    const saveSelectedDucmentData = value;
    sessionStorage.setItem('saveDocumentData', saveSelectedDucmentData);

    // Update the state variable when Documents Autocomplete field is filled
    setIsDocumentAutocompleteFilled(value !== null && value !== '');

  };

  useEffect(() => {
    //clear all session data
    sessionStorage.removeItem('selectedCr');
    sessionStorage.removeItem('saveDocumentData');
    sessionStorage.removeItem('location');
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

  useEffect(() => {
    sessionStorage.setItem('location', location);
  }, [location]);



  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setSelectedCr(value);


    // sessionStorage.setItem('saveCrNumberData', saveCrNumberData);
    sessionStorage.setItem('selectedCr', JSON.stringify(value));

    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');
  }


  const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
    console.log(reason);
    if (reason === 'reset' || reason === 'clear') {
      setCrList([]); // Clear the data list if there is no input
      setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setCrList([]);
      setSelectedCr(null);
      return;
    }


    console.log(newInputValue);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort previous request
    }
    abortControllerRef.current = new AbortController(); // Create a new controller for the new request


    try {
      setAutocompleteLoading(true);
      setOpen(true);

      const res = await newRequest.get(`/crs/seachByKeyword?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);

      const crs = res?.data?.map(item => {
        return {
          cr: item.cr,
          activity: item.activity,
          crId: item.id,
        };
      }
      );

      setCrList(crs);

      setOpen(true);
      setAutocompleteLoading(false);
    } catch (error) {
      console.error(error);
      setCrList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  };


  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    console.log(reason);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      setCrList([]); // Clear the data list if there is no input
      setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setCrList([]);
      setSelectedCr(null);
      return;
    }

    console.log(newInputValue);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort previous request
    }
    abortControllerRef.current = new AbortController(); // Create a new controller for the new request

    try {
      setAutocompleteLoading(true);
      setOpen(true);

      const res = await newRequest.get(`/crs/seachByKeyword?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);

      const crs = res?.data?.map(item => {
        return {
          cr: item.cr,
          activity: item.activity,
          crId: item.id,
        };
      });

      setCrList(crs);

      setOpen(true);
      setAutocompleteLoading(false);
    } catch (error) {
      console.error(error);
      setCrList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);



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
          {/* <div className='flex justify-between items-center flex-wrap px-12 py-5'> */}
          <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center px-12 py-5'>
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
                    <input type="radio" name="company" id="company-yes"
                      value='yes' onChange={(e) => setLocation(e.target.value)} checked={location === 'yes'}

                    />
                    <label htmlFor="company-yes" className='text-secondary font-medium'>Yes</label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="radio" name="company" id="company-no"
                      value='no' onChange={(e) => setLocation(e.target.value)} checked={location === 'no'}
                    />
                    <label htmlFor="company-no" className='text-secondary font-medium'
                    >No</label>
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

            <div className='flex sm:justify-end sm:items-end justify-center items-center'>
              <div className='flex flex-col gap-2 sm:w-[80%] w-full'>
                {hasCR ? (
                  <>
                    <label htmlFor="companyName" className='text-xl font-bold font-sans text-secondary'>CR Number <span className='text-[#FF3E01]'>* </span><span className='text-secondary font-normal text-lg'>(About CR Number)</span></label>
                    <Autocomplete
                      id="companyName"
                      required
                      options={crList}
                      getOptionLabel={(option) => (option && option.cr) ? `${option?.cr} - ${option?.activity} ` : ''}
                      onChange={handleGPCAutoCompleteChange}
                      value={selectedCr?.cr}
                      onInputChange={(event, newInputValue, params) => debouncedHandleAutoCompleteInputChange(event, newInputValue, params)}
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
                        <li key={option.cr} {...props}>
                          {option ? `${option.cr} - ${option.activity}` : 'No options'}
                        </li>
                      )}


                      renderInput={(params) => (
                        <TextField
                          // required
                          error={isSubmitClicked && !selectedCr?.cr}
                          helperText={isSubmitClicked && !selectedCr?.cr ? "CR Number is required" : ""}
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
                    {/* If nothing is select i show that error */}


                    <p onClick={handleShowCreatePopup} className='font-normal text-secondary font-sans transition-colors duration-300 hover:text-primary cursor-pointer'>Click here if you want to add your CR!</p>

                  </>
                ) : (
                  <>
                    <div className=''>
                      <label htmlFor="companyName" className='text-xl font-bold font-sans text-secondary'>
                        Documents <span className='text-[#FF3E01]'>* </span>
                      </label>
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
                      {isSubmitClicked && !isDocumentAutocompleteFilled && (
                        <p className="text-red-500 font-sans text-sm">Documents field is required.</p>
                      )}
                    </div>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsSubmitClicked(true);

                    if (isAutocompleteFilled || isDocumentAutocompleteFilled) {
                      navigate('/member-registration');
                    } else {
                      console.log('Autocomplete field is required');
                    }
                  }}
                  // onClick={() => navigate('/member-registration')}
                  className='bg-secondary font-bold font-sans text-white rounded w-full py-3 hover:bg-primary'>
                  Continue
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* AddBrands component with handleShowCreatePopup prop */}
      {isCreatePopupVisible && (
          <AddCrNumber isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} />
      )}

      {/* Footer */}
      <div className='pt-10'>
        <Footer />
      </div>
      {/* End Footer */}
    </div>
  )
}

export default GetBarcode