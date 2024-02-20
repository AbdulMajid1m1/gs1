import React, { useEffect, useState } from 'react'
import Footer from '../../../../components/Footer/Footer'
import Header from '../../../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { DotLoader } from 'react-spinners'
import newRequest from '../../../../utils/userRequest'
import { useTranslation } from 'react-i18next';
import TwoFactorAuthPopup from './TwoFactorAuthPopup';

const SelectActivity = () => {
    const { t, i18n } = useTranslation();
    const [activity, setActivity] = React.useState([])
    const [password, setPassword] = React.useState('')
    const [selectedUserActivity, setSelectedUserActivity] = useState("");
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsvisible] = useState(false)
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({})
    // get the session data
    useEffect(() => {
        const userActivity = JSON.parse(sessionStorage.getItem('userActivity'))
        const email = sessionStorage.getItem('email')
        setActivity(userActivity)
        setEmail(email);

    }, [])


    const handleActivity = (event, value) => {
        setSelectedUserActivity(value);
        console.log(value?.cr_activity);
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        console.log('activity', selectedUserActivity?.cr_activity, 'password', password)


        newRequest.post('/users/memberLogin',
            {
                "email": email,
                "password": password,
                "activity": selectedUserActivity?.cr_activity

            }
        )
            .then(response => {
                console.log(response.data)
                setIsLoading(false)
                setMemberData(response?.data?.memberData)
                // save userId in session
                let userId = response?.data?.memberData?.id
                console.log('userId', userId)
                sessionStorage.setItem('MemberUserId', userId);
                setIsvisible(true)

                // commnet below two line for for 2 auth TODO:
                // sessionStorage.setItem('memberData', JSON.stringify(response.data.memberData));
                // navigate('/member/dashboard');

                
                // save the response in sesstion
                // sessionStorage.setItem('memberData', JSON.stringify(response?.data?.memberData));


            })
            .catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.error || 'Error', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setIsLoading(false)
            })
    }

    return (
        <div>
            <TwoFactorAuthPopup setIsvisible={setIsvisible} isVisible={isVisible}  />
            {isLoading &&
                <div className='loading-spinner-background'
                    style={{
                        zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


                    }}
                >
                    <DotLoader
                        size={45}
                        color={"#FF693A"}
                        // height={4}
                        loading={isLoading}
                    />
                </div>
            }
            <div className='sticky top-0 z-50 bg-white'>
                <Header />
            </div>

            <div className='flex justify-center items-center mt-5 mb-10'>
                <div className='sm:h-[480px] h-auto w-[85%] border-l border-r border-b border-primary rounded-md shadow-xl'>
                    <div className='h-5 w-full bg-primary rounded-t-md'></div>

                    {/* show this in center */}
                    <div className='flex justify-center items-center h-[90%]'>
                        <div className='w-full sm:w-[50%] sm:px-4 px-4 h-auto border-[1px] border-[#021F69] rounded-md shadow-xl py-5'>
                            <form onSubmit={handleSubmit}>
                                <h2 className={`sm:text-2xl text-secondary text-lg font-sans font-bold py-5 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}>{t('Select Activity')}<span className='text-red-500'>*</span></h2>
                                <div className='flex flex-col gap-1'>
                                    <label className={`sm:text-2xl text-secondary text-lg font-sans font-normal ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`} htmlFor='test'>{t('Select Activity')}<span className='text-red-500'>*</span></label>
                                    <Autocomplete
                                        id="test"
                                        options={activity}
                                        value={selectedUserActivity}
                                        getOptionLabel={(option) => option?.cr_activity || ""}
                                        onChange={handleActivity}
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
                                                className={`bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  ${i18n.language === 'ar' ? ' text-right' : 'text-left'
                                                    }`}
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

                                    <label className={`sm:text-2xl text-secondary text-lg font-sans font-normal mt-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`} htmlFor='password'>{t('Password')}<span className='text-red-500'>*</span></label>
                                    <input
                                        id='password'
                                        type='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full sm:h-12 h-10 border border-[#8E9CAB] bg-[#EFF2F6] rounded-sm p-3 sm:text-lg text-sm font-sans font-normal mt-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'
                                            }`}
                                        placeholder='***************'
                                        required
                                    />
                                    {/* add that Forgot Password?  Click Here to Reset */}
                                    <p className={`text-secondary text-xl font-sans font-normal ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}> {t('Forgot Password?')} <span className='text-[#01A6BC] cursor-pointer'>{t('Click Here to Reset')}</span></p>

                                    <div className={`flex  items-end ${i18n.language === 'ar' ? ' justify-start' : 'justify-end'}`}>
                                        <button
                                            type='submit' className='bg-primary text-white font-medium w-full sm:w-[35%] sm:h-12 h-10 sm:text-base text-sm rounded-sm mt-5 hover:bg-secondary'>
                                            {t('Login')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default SelectActivity