import React, { useEffect, useState } from 'react'
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete, TextField } from '@mui/material';

const AddBrands = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [companyName, setCompanyName] = useState("");
    const [companyNameArabic, setCompanyNameArabic] = useState("");
    const [brandCertificate, setBrandCertificate] = useState("");
    const [userID, setUserID] = useState([]);
    const [selectedUserID, setSelectedUserID] = useState("");
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const abortControllerRef = React.useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
    const handleCloseCreatePopup = () => {
        setVisibility(false);
      };


    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
      console.log(reason)
      if (reason === 'reset' || reason === 'clear') {
          setUserID([]); // Clear the data list if there is no input
          return; // Do not perform search if the input is cleared or an option is selected
      }
      if (reason === 'option') {
          return // Do not perform search if the option is selected
      }

      if (!newInputValue || newInputValue.trim() === '') {
          // perform operation when input is cleared
          setUserID([]);
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
          const res = await newRequest.get(`/users/search?keyword=${newInputValue}`, 
          {
              signal: abortControllerRef.current.signal
          })

          console.log(res);
          setUserID(res?.data);
          setOpen(true);
          setAutocompleteLoading(false);
      }
      catch (error) {
          if (error?.name === 'CanceledError') {
              // Ignore abort errors
              setUserID([]); // Clear the data list if there is no input
              setAutocompleteLoading(true);
              console.log(error)
              return;
          }
          console.error(error);
          console.log(error)
          setUserID([]); // Clear the data list if an error occurs
          setOpen(false);
          setAutocompleteLoading(false);
      }

  }

  const handleGPCAutoCompleteChange = (event, value) => {
      console.log(value);
      setSelectedUserID(value);
      // setGpcCode(value);
  }


    
    const handleFileChange = (e) => {
      // setError('');
      const file = e.target.files[0];
        if (file) {
          if (file.size <= 500 * 1024) {
              setBrandCertificate(file);
              setError(''); // Clear any previous error message
          } else {
              setError('File size should be 500KB or less');
              e.target.value = null;
            }
        }
      };

    const handleAddCompany = async (e) => {
      e.preventDefault();    
      setLoading(true);

    // create the formData object
    const formData = new FormData();
    formData.append('name', companyName);
    formData.append('name_ar', companyNameArabic);
    formData.append('status', 'active');
    formData.append('user_id', selectedUserID?.id);
    formData.append('companyID', selectedUserID?.companyID);
    formData.append('brandCertificate', brandCertificate);

    try {
      const response = await newRequest.post('/brands', formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        });

      toast.success(`Brand ${companyName} with Arabic name "${companyNameArabic}" has been added successfully.`);

      console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();
      setLoading(false);


    } catch (error) {
      toast.error(error?.response?.data?.error || 'Error');

      setLoading(false);
      console.log(error);
    }


  };

   
  return (
    <div>
          {/* create the post api popup */}
          {isVisible && (
              <div className="popup-overlay">
                <div className="popup-container h-auto sm:w-[45%] w-full">
                  <div className="popup-form w-full">         
                    <form onSubmit={handleAddCompany} className='w-full'>
                      <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Brands</h2>
                        <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                         <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                          <label htmlFor="field5" className="text-secondary">User ID</label>
                          <Autocomplete
                              id="field5"
                              required
                              options={userID}
                              getOptionLabel={(option) => (option && option.fname) ? `${option?.fname} - ${option?.email} - ${option?.company_name_eng} ` : ''}
                              onChange={handleGPCAutoCompleteChange}
                              value={selectedUserID}
                              onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                              loading={autocompleteLoading}
                              // sx={{ marginTop: '10px' }}
                              open={open}
                              onOpen={() => {
                              // setOpen(true);
                              }}
                                onClose={() => {
                                  setOpen(false);
                                }}
                                renderOption={(props, option) => (
                                  <li {...props}>
                                    {option ? `${option.fname} - ${option.email} - ${option.company_name_eng}` : 'No options'}
                                  </li>
                                )}

                                renderInput={(params) => (
                                  <TextField
                                    // required
                                    {...params}
                                      label="Search User ID here"
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
                        </div>

                          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <label htmlFor="field1" className="text-secondary">Brand Name EN</label>
                              <input
                                type="text"
                                id="field1"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Enter Brand Name EN"
                                required
                                className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-0"
                              />
                          </div>

                          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <label htmlFor="field2" className="text-secondary">Brand Name AR </label>
                              <input
                                type="text"
                                id="field2"
                                value={companyNameArabic}
                                onChange={(e) => setCompanyNameArabic(e.target.value)}
                                placeholder="Enter Brand Name AR"
                                required
                                className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                              />
                          </div>
                        </div>

                        
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-2">
                          <label htmlFor="field3" className="text-secondary">Upload Documents </label>
                            <input
                              type="file"
                              id="field3"
                              onChange={handleFileChange}
                              required
                              className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                        </div>

                        <div className="w-full flex justify-center items-center gap-8 mt-5">
                          <button
                            type="button"
                            className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                            onClick={handleCloseCreatePopup}
                          >
                            Close
                          </button>
                               {/* <button
                                 type="button"
                                 onClick={handleAddCompany}
                                 className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                               >
                                 Add Brand
                               </button> */}
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                            type="submit"
                            disabled={loading}
                            className="w-[70%] ml-2"
                            endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                          >
                            SAVE
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            )}
                    
    </div>
  )
}

export default AddBrands