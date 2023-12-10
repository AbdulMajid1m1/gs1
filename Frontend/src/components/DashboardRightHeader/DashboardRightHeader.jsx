import React from 'react'
import visitFrontend from "../../Images/visitFrontend.png"
import profileICon from "../../Images/profileICon.png"

const DashboardRightHeader = ({ title }) => {
  return (
    <div>
        <div className='h-32 w-full flex justify-end items-start p-3 bg-primary -mt-6 sm:gap-7 gap-4'>
            <div className='flex justify-center items-center mt-2 cursor-pointer'>
                <img src={visitFrontend} 
                    alt='logo'
                      style={{ filter: 'invert(1)' }}
                         className='h-5 w-5 text-white mr-2 -mt-[2px]' />
                <p className='text-white font-sans font-normal sm:text-base text-sm'>Vist Frontend</p>
            </div>

            <div className='flex justify-center items-center'>
                <img src={profileICon} alt='logo' className='h-9 w-9 object-contain text-white mr-5' />
            </div>
          </div>
          
            <div className='flex justify-center items-center'>
                <div className="h-20 w-[97%] bg-white shadow-xl rounded-md -mt-10 flex justify-start items-center px-10">
                    <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">{title}</p>
                </div>
            </div>

    </div>
  )
}

export default DashboardRightHeader