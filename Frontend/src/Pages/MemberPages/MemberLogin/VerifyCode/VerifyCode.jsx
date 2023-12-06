import React from 'react'
import Header from '../../../../components/Header/Header'
import Footer from '../../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const VerifyCode = () => {
    const [codeVerification, setCodeVerification] = React.useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => { 
        e.preventDefault()
        console.log(codeVerification)

        Swal.fire({
            icon: 'success',
            iconColor: '#01A6BC',
            title: 'GS1 Member Dashboard',
            text: 'Welcome to GS1 Member Dashboard',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#021F69',
            
        })
        navigate('/member-profile');

    }

  return (
    <div>
        <div className='sticky top-0 z-50 bg-white'>
             <Header />
        </div>

        <div className='flex justify-center items-center mt-5 mb-10'>
            <div className='sm:h-[460px] h-72 w-[85%] border-l border-r border-b border-primary rounded-md shadow-xl'>
                <div className='h-5 w-full bg-primary rounded-t-md'></div>

                {/* show this in center */}
                <div className='text-center sm:text-2xl text-secondary px-3 text-lg font-sans font-semibold mt-4'>
                    <h2>Please Enter Verification Code</h2>
                </div>
                <div className='flex flex-col justify-center items-center h-[80%] -mt-6'>
                    <div className='w-full sm:w-[35%] sm:px-0 px-4'>
                        <form onSubmit={handleSubmit}>
                            <label className='sm:text-2xl text-secondary text-lg font-sans font-normal' htmlFor='code'>Verify Code</label>
                            <div className='flex flex-col gap-3'>
                                <input 
                                    id='code'
                                    type='text' 
                                    onChange={(e) => setCodeVerification(e.target.value)}
                                    className='w-full sm:h-12 h-10 border border-[#8E9CAB] rounded-sm p-3 sm:text-lg text-sm font-sans font-normal mt-2'
                                    placeholder='*****'
                                    required
                                />
                                <button 
                                    type='submit' className='bg-secondary text-white font-medium w-full sm:h-12 h-10 sm:text-base text-sm rounded-sm mt-5 shadow-2xl hover:bg-primary'>Verify Now</button>
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

export default VerifyCode