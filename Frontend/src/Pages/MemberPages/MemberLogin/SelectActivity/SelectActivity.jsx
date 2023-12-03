import React from 'react'
import Footer from '../../../../components/Footer/Footer'
import Header from '../../../../components/Header/Header'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const SelectActivity = () => {
    const [activity, setActivity] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('activity', activity, 'password', password)

        Swal.fire({
            icon: 'success',
            iconColor: '#01A6BC',
            title: 'OTP',
            text: 'OTP send to your Registered Mobile and Email',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#021F69',
            
        })
        navigate('/verify-code');

    }

  return (
    <div>
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
                            <label className='sm:text-2xl text-secondary text-lg font-sans font-normal' htmlFor='activity'>Select Activity<span className='text-red-500'>*</span></label>
                                <select 
                                    id='activity' 
                                    onChange={(e) => setActivity(e.target.value)}
                                    className='w-full sm:h-12 h-10 border border-[#8E9CAB] rounded-sm p-3 sm:text-lg text-sm font-sans font-normal mt-2'
                                    placeholder='Enter Registered Email Address'
                                    required
                                >
                                    <option value="select">Select Activity</option>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
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