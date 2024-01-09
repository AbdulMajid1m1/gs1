import React from 'react'
import firstArticle from "../../../Images/firstArticle.png"
import secondArticle from "../../../Images/secondArticle.png"
import thirdArticle from "../../../Images/thirdArticle.png"

const FeatureArticle = () => {
  return (
    <div>
        {/* Featured Articles */}
        <div className='flex justify-center items-center pt-5'>
            <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'>Featured Articles</h2>
        </div>
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-5 mb-4'>
            {/* first Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src={firstArticle}
                alt=""
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>More Details</button>
                  <p className='font-semibold text-secondary'>GS1 Industry and Standards Services</p>
                </div>
              </div>

            </div>


            {/* second Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src={secondArticle}
                alt=""
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>More Details</button>
                  <p className='font-semibold text-secondary'>GSIN in Depth Details</p>
                </div>
              </div>

            </div>


            {/* third Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src={thirdArticle}
                alt=""
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>More Details</button>
                  <p className='font-semibold text-secondary'>Supply Chain Standards by GS1</p>
                </div>
              </div>

            </div>
        </div>

        {/* More events Button */}
        <div className='flex justify-center items-center gap-4 mb-10 sm:px-0 px-5'>
            <button className='bg-secondary font-medium text-white sm:text-lg text-sm rounded-md px-3 py-1'>View More</button>
            <button className='bg-primary font-medium text-white sm:text-lg text-sm rounded-md px-3 py-1'>Join Our Mailing List</button>
        </div>

    </div>
  )
}

export default FeatureArticle