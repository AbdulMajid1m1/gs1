import React, { useState } from 'react'
import Header from '../../../../components/Header/Header'
import Footer from '../../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../../../utils/userRequest'
import { toast } from 'react-toastify'
import { DotLoader } from 'react-spinners'
import DropDownSelection from '../../../UserPages/DropDownSelection/DropDownSelection'
import { useTranslation } from 'react-i18next';


const EmailAddress = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = React.useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    
    // abdulmajid1m2@gmail.com
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(email)

        newRequest.get(`/users/getCrInfoByEmail?email=${email}`)
         .then(response => {
                console.log(response.data)
                // toast.success(response?.data?.message);
                setIsLoading(false)

                navigate('/select-activity');

                // save the response of this api in session storage
                sessionStorage.setItem('userActivity', JSON.stringify(response?.data))

                // save the email in session storage
                sessionStorage.setItem('email', email)
            })
            .catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.message || 'Something When Wrong!');
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

        <div>
            <DropDownSelection />
        </div>

        <div className='flex justify-center items-center mt-5 mb-10'>
            <div className='sm:h-[460px] h-72 w-[85%] border-l border-r border-b border-primary rounded-md shadow-xl'>
                <div className='h-5 w-full bg-primary rounded-t-md'></div>

                {/* show this in center */}
                <div className='flex justify-center items-center h-[80%]'>
                    <div className='w-full sm:w-[40%] sm:px-0 px-4'>
                        <form onSubmit={handleSubmit}>
                              <label className='sm:text-2xl text-secondary text-lg font-sans font-bold' htmlFor='email'>{t('Email Address')}<span className='text-red-500'>*</span></label>
                        <div className='flex flex-col gap-3'>
                                <input 
                                    id='email'
                                    type='email' 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full sm:h-12 h-10 border border-[#8E9CAB] rounded-sm p-3 sm:text-lg text-sm font-sans font-normal mt-2'
                                    placeholder={`${t('Enter')} ${t('Email Address')}`}
                                    required
                                />
                                <button 
                                      type='submit' className='bg-secondary text-white font-medium w-full sm:h-12 h-10 sm:text-base text-sm rounded-sm mt-5 hover:bg-primary'> {t('Login Now')}</button>
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