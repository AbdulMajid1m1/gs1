import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, CircularProgress, TextField, debounce } from '@mui/material';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../../Contexts/LanguageContext';


const AssignToPopUp = ({ isVisible, setVisibility, assignUser, fetchData }) => {
    const { selectedLanguage } = useLanguage();
    const { t, i18n } = useTranslation();
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [optionalMessage, setOptionalMessage] = useState('');
    const abortControllerRef = React.useRef(null);
    const [loading, setIsLoading] = useState(false);

    // Now you can retrieve the data and parse it when needed
    const storedData = sessionStorage.getItem('adminData');
    const adminData = JSON.parse(storedData);
    console.log(adminData);
    // console.log(assignUser);

    const handleGPCAutoCompleteChange = (event, value) => {
        setSelectedAdmin(value);


        // Update the state variable when Autocomplete field is filled
        setIsAutocompleteFilled(value !== null && value !== '');

        // if (value) {
        //   fetchData(value);
        // }
    }

    const [details, setDetails] = useState([])

    // Use debounce to wrap the handleAutoCompleteInputChange function
    const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
        console.log(reason);
        console.log(newInputValue);
        setIsSubmitClicked(false);
        if (reason === 'reset' || reason === 'clear') {
            console.log('clear');
            // console.log(newInputValue);
            setAdminList([]); // Clear the data list if there is no input
            // setSelectedCr(null);
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return; // Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setAdminList([]);
            // setSelectedCr(null);
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

            const res = await newRequest.get(`/admin/searchAdmins?keyword=${newInputValue}`, {
                signal: abortControllerRef.current.signal
            });
            console.log(res);

            const crs = res?.data?.map(item => {
                return {
                    id: item.id,
                    username: item.username,
                    email: item.email,
                    // UserID: item.UserID,
                };
            });

            setAdminList(crs);
            setDetails(res?.data[0]);

            setOpen(true);
            setAutocompleteLoading(false);

            // fetchData();

        } catch (error) {
            console.log(error);
            setAdminList([]); // Clear the data list if an error occurs
            setOpen(false);
            setAutocompleteLoading(false);
        }
    }, 400);


    const closePopUp = () => {
        setVisibility(false)
    }



    const handleAssignToData = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await newRequest.post('/admin/assignAdmin', {
                userId: assignUser?.id,
                adminId: selectedAdmin?.id,
                message: optionalMessage ? optionalMessage : "",
                assigningAdminName: adminData?.username,
                selectedLanguage: selectedLanguage,
            });

            console.log(res?.data);
            toast.success(res?.data?.message || 'Assigned Successfully');
            setIsLoading(false);
            closePopUp();
            fetchData();

        } catch (err) {
            setIsLoading(false);
            console.log(err);
            toast.error(err?.response?.data?.error || 'Error in data');
        }
    }



    return (
        <div>
            {/* create the post api popup */}
            {isVisible && (
                <div className="popup-overlay z-50">
                    <div className="popup-container h-auto sm:w-[40%] w-full">
                        <div onSubmit={handleAssignToData} className="popup-form w-full">
                            <div className="flex justify-end w-full">
                                <button
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={closePopUp}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <form className='w-full'>
                                <div>
                                    <label className="font-body text-sm text-secondary"> {t('GS1 Staff')} <span className='text-red-500'>*</span></label>
                                    <Autocomplete
                                        id="companyName"
                                        required
                                        options={adminList}
                                        // id: item.id,
                                        // username: item.username,
                                        // email: item.email,
                                        // getOptionLabel={(option) => (option && option.IntID) ? `${option?.Phone1} - ${option?.MemberNameE} - ${option?.MemberNameA} - ${option?.Email} - ${option?.GLNID}` : 'no'}
                                        getOptionLabel={(option) => (option && option.id) ? `${option?.id} - ${option?.username} - ${option?.email} ` : ''}
                                        onChange={handleGPCAutoCompleteChange}
                                        value={selectedAdmin}
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
                                            <li key={option.id} {...props}>
                                                {option ? `${option.id} - ${option.username} - ${option.email} ` : 'No options'}
                                            </li>
                                        )}


                                        renderInput={(params) => (
                                            <TextField
                                                // required
                                                error={isSubmitClicked && !selectedAdmin}
                                                helperText={isSubmitClicked && !selectedAdmin ? "Products is required" : ""}
                                                {...params}
                                                label={`${t('Search Admins')}`}
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

                                <div className='mt-6'>
                                    <label className="font-body text-sm text-secondary"> {t('Note')}</label>
                                    <textarea
                                        onChange={(e) => setOptionalMessage(e.target.value)}
                                        className="w-full h-20 mt-1 border border-gray-300 rounded outline-none px-3 py-2"
                                        placeholder={`${t('Enter your message here...')}`}
                                    // required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end mt-6">
                                    {/* <button
                                    className="px-6 py-3 font-semibold text-white rounded bg-secondary hover:bg-secondarydark focus:outline-none"
                                    type="submit"
                                    // onClick={closePopUp}
                                >
                                    Assign
                                </button> */}
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3"
                                        endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                                    >
                                        {t('Assign')}
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

export default AssignToPopUp