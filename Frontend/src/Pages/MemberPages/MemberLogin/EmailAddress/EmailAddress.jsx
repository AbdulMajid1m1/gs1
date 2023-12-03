import React from 'react'
import Header from '../../../../components/Header/Header'
import Footer from '../../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const EmailAddress = () => {
    const [email, setEmail] = React.useState('')
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        navigate('/select-activity');
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
                <div className='flex justify-center items-center h-[80%]'>
                    <div className='w-full sm:w-[40%] sm:px-0 px-4'>
                        <form onSubmit={handleSubmit}>
                            <label className='sm:text-2xl text-secondary text-lg font-sans font-bold' htmlFor='email'>Email Address<span className='text-red-500'>*</span></label>
                        <div className='flex flex-col gap-3'>
                                <input 
                                    id='email'
                                    type='email' 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full sm:h-12 h-10 border border-[#8E9CAB] rounded-sm p-3 sm:text-lg text-sm font-sans font-normal mt-2'
                                    placeholder='Enter Registered Email Address'
                                    required
                                />
                                <button 
                                    type='submit' className='bg-secondary text-white font-medium w-full sm:h-12 h-10 sm:text-base text-sm rounded-sm mt-5 hover:bg-primary'>Login Now</button>
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

export default EmailAddress