import React from 'react'
import firstEvents from "../../../Images/firstEvents.png"
import secondEvents from "../../../Images/secondEvents.png"
import thirdEvents from "../../../Images/thirdEvents.png"

const UpcomingEvents = () => {
  return (
    <div>
        {/* upcoming Events */}
        <div className='flex justify-center items-center pt-12'>
            <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'>Upcoming Events</h2>
        </div>
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 gap-4 lg:grid-cols-3 md:grid-cols-1 grid-cols-1 px-5 mb-4'>
            {/* first Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src={firstEvents}
                alt=""
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>More Details</button>
                  <p className='font-semibold text-secondary'>Retailers Perspective 2023</p>
                </div>
              </div>

            </div>


            {/* second Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src={secondEvents}
                alt=""
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>More Details</button>
                  <p className='font-semibold text-secondary'>GS1 MEMA Forum 2023</p>
                </div>
              </div>

            </div>


            {/* third Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src={thirdEvents}
                alt=""
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>More Details</button>
                  <p className='font-semibold text-secondary'>GS1 Saudi Arabia new Services Launching</p>
                </div>
              </div>

            </div>
        </div>

        {/* More events Button */}
        <div className='flex justify-center items-center mb-10'>
            <button className='bg-primary font-medium text-white text-lg rounded-md px-5 py-1'>More Events</button>
        </div>

    </div>
  )
}

export default UpcomingEvents