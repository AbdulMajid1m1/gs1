import React, { useEffect, useState } from 'react'
import Footer from '../../../../components/Footer/Footer'
import Header from '../../../../components/Header/Header'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { DotLoader } from 'react-spinners'
import newRequest from '../../../../utils/userRequest'

const SelectActivity = () => {
    const [activity, setActivity] = React.useState([])
    const [password, setPassword] = React.useState('')
    const [selectedUserActivity, setSelectedUserActivity] = useState("");
    const [email, setEmail] = useState(''); 
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate();

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

        // Swal.fire({
        //     icon: 'success',
        //     iconColor: '#01A6BC',
        //     title: 'OTP',
        //     text: 'OTP send to your Registered Mobile and Email',
        //     confirmButtonText: 'Ok',
        //     confirmButtonColor: '#021F69',
            
        // })
        // navigate('/verify-code');

        newRequest.post('/users/memberLogin',
            {
                "email": email,
                "password": password,
                "activity": selectedUserActivity?.cr_activity
                 
            }
        )
         .then(response => {
                console.log(response.data)
                toast.success(response?.data?.message || 'Member Login Successfully', {
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

                navigate('/member/dashboard');


                // save the response in sesstion
                sessionStorage.setItem('memberData', JSON.stringify(response?.data?.memberData));


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
                            <h2 className='sm:text-2xl text-secondary text-lg font-sans font-bold py-5'>Select Activity<span className='text-red-500'>*</span></h2>
                        <div className='flex flex-col gap-1'>
                            <label className='sm:text-2xl text-secondary text-lg font-sans font-normal' htmlFor='test'>Select Activity<span className='text-red-500'>*</span></label>
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

                                <label className='sm:text-2xl text-secondary text-lg font-sans font-normal mt-2' htmlFor='password'>Password<span className='text-red-500'>*</span></label>
                                <input 
                                    id='password'
                                    type='password' 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full sm:h-12 h-10 border border-[#8E9CAB] bg-[#EFF2F6] rounded-sm p-3 sm:text-lg text-sm font-sans font-normal mt-2'
                                    placeholder='***************'
                                    required
                                />
                                {/* add that Forgot Password?  Click Here to Reset */}
                                <p className='text-secondary text-xl font-sans font-normal'>Forgot Password?  <span className='text-[#01A6BC] cursor-pointer'>Click Here to Reset</span></p>

                                <div className='flex justify-end items-end'>
                                    <button 
                                        type='submit' className='bg-primary text-white font-medium w-full sm:w-[35%] sm:h-12 h-10 sm:text-base text-sm rounded-sm mt-5 hover:bg-secondary'>
                                            Login
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