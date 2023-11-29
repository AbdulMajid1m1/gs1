import React from 'react'
import gs1v2logo from "../../Images/logo.png"
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()   
  
  return (
    <div>
       <div className='sticky top-0 z-50 bg-white p-2'>
          <div className='h-auto w-full bg-gray-100 flex flex-col sm:flex-row justify-between items-center px-4 py-4'>
            {/* Logo and Text */}
            <div className='flex items-center flex-wrap mb-4 sm:mb-0'>
              <img src={gs1v2logo} className='h-14 w-auto' alt='' />
              <div className='text-center px-2'>
                <p className='text-secondary font-semibold'>GS1 Saudia Arabia</p>
                <p className='text-secondary'>The Global Language of Business</p>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <div className='flex justify-end items-end px-1'>
                <p className='text-blue-500 transition-transform transform hover:scale-125 cursor-pointer'>Verified By GS1</p>
                 | 
                <span className='text-blue-500 transition-transform transform hover:scale-125 cursor-pointer'>Staff Login</span>
              </div>
            <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
              <button 
                onClick={() => navigate('/get-barcode')}
                className='bg-secondary text-white px-2 py-1 rounded-md'
                  >
                  Get a Barcode
              </button>
              
                <button 
                  className='bg-primary text-white px-2 py-1 rounded-md'
                >
                  GS1 Member Login
                </button>
            </div>
            </div>
          </div>
        </div>
        {/* End Nav */}
    </div>
  )
}

export default Header