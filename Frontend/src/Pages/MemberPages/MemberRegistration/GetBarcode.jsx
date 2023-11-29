import React, { useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import { useNavigate } from 'react-router-dom'

const GetBarcode = () => {
  const [hasCR, setHasCR] = useState(true); // Default to 'Yes'

  const handleRadioChange = (value) => {
    setHasCR(value === 'yes');
  };

  const navigate = useNavigate();

  return (
    <div>
        {/* Nav */}
          <div className='sticky top-0 z-50 bg-white p-2'>
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
                        <label htmlFor="companyName" className='text-xl font-bold font-sans text-secondary'>CR Number <span className='text-[#FF3E01]'>* </span><span className='text-secondary font-normal'>(About CR Number)</span></label>
                        <input 
                            type="text" 
                                name="companyName" id="companyName" 
                                className='h-12 w-full border border-[#8E9CAB] font-sans rounded-md px-2'
                                placeholder='Search CR Number'
                                />
                            <p className='font-normal text-secondary font-sans'>Click here if you want to add your CR!</p>
                       
                        </>
                        ) : (
                        <>
                        <div className=''>
                          <label htmlFor="companyName" className='text-xl font-bold font-sans text-secondary'>Documents <span className='text-[#FF3E01]'>* </span></label>
                            <select 
                                type="text" 
                                    name="companyName" id="companyName" 
                                    className='h-12 w-full border border-[#8E9CAB] font-sans rounded-md px-2'
                                    placeholder='Search CR Number'
                                    >
                                <option value="Select CR Number">Select CR Number</option>
                            </select>
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