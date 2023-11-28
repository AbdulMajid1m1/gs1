'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HomePage = () => {
  return (
    <div>

        {/* Nav */}
        <div className='p-2'>
          <div className='h-auto w-full bg-gray-100 flex flex-col sm:flex-row justify-between items-center px-4 py-4'>
            {/* Logo and Text */}
            <div className='flex items-center flex-wrap mb-4 sm:mb-0'>
              <img src='/images/logo.png' className='h-14 w-auto' alt='' />
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
              <button className='bg-secondary text-white px-2 py-1 rounded-md'>Get a Barcode</button>
              <button className='bg-primary text-white px-2 py-1 rounded-md'>GS1 Member Login</button>
            </div>
            </div>
          </div>
        </div>


        {/* Slider */}
        <div className='h-72 w-full bg-white border-b mt-10'>
          <div className='h-60 w-full bg-secondary flex justify-center items-center'>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className='w-full flex justify-center items-center px-5'>
                      <div className='w-full flex flex-col gap-2 px-10'>
                        <h2 className='text-3xl text-white font-semibold'>Verified by GS1</h2>
                        <p className='text-lg text-white font-medium'>Discover how businesses around the world are implementing by Getting started with Verified by GS1</p>
                        <button className=' bg-primary text-white font-medium text-xl px-4 py-1'>Read the Sucess Stories</button>
                      </div>

                      <div className='w-full'>
                          <img src='/images/firstslider.png' className='h-60 w-[90%] object-contain' alt='' />
                      </div>
                    </div>
                  </SwiperSlide>
                  
                  <SwiperSlide>
                    <div className='w-full flex justify-center items-center px-5'>
                        <div className='w-full flex flex-col gap-2 px-10'>
                          <h2 className='text-3xl text-white font-semibold'>2D Migration</h2>
                          <p className='text-lg text-white font-medium'>Paving the way for a global migration to 2D barcodes</p>
                          <button className=' bg-primary text-white font-medium text-xl px-4 py-1'>Read the Sucess Stories</button>
                        </div>

                        <div className='w-full'>
                            <img src='/images/secondslider.png' className='h-60 w-[90%] object-contain' alt='' />
                        </div>
                      </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className='w-full flex justify-center items-center px-5'>
                        <div className='w-full flex flex-col gap-2 px-10'>
                          <h2 className='text-3xl text-white font-semibold'>50 years of transforming tomorrow</h2>
                          <p className='text-sm text-white font-medium'>The barcode has been transforming the way we work and live with the power of GS1 standards. Let's celebrate this amazing anniversary together!</p>
                          <button className=' bg-primary text-white font-medium text-xl px-4 py-1'>Read the Sucess Stories</button>
                        </div>

                        <div className='w-full'>
                            <img src='/images/thirdslider.png' className='h-60 w-[90%] object-contain' alt='' />
                        </div>
                      </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className='w-full flex justify-center items-center px-5'>
                        <div className='w-full flex flex-col gap-2 px-10'>
                          <h2 className='text-3xl text-white font-semibold'>GS1 Saudi Arabia Mobile App</h2>
                          <p className='text-lg text-white font-medium'>GS1 Saudi Arabia standards on the Go</p>
                          <button className=' bg-primary text-white font-medium text-xl px-4 py-1'>Read the Sucess Stories</button>
                        </div>

                        <div className='w-full'>
                            <img src='/images/seventhslider.png' className='h-60 w-[90%] object-contain' alt='' />
                        </div>
                      </div>
                  </SwiperSlide>

                  {/* <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide> */}
                  </Swiper>

          </div>
        </div>

        <div className='flex justify-center items-center p-8'>
            <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'>GS1 Value Added Services</h2>
        </div>
       
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 gap-7 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-5'>
            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src="/images/first.png"
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>

            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src="/images/second.png"
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>

            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src="/images/gln.png"
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>

            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src="/images/gdsn.png"
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>
        </div>


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
                src="/images/firstEvents.png"
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
                src="/images/secondEvents.png"
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
                src="/images/thirdEvents.png"
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



        {/* Featured Articles */}
        <div className='flex justify-center items-center pt-5'>
            <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'>Featured Articles</h2>
        </div>
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 gap-4 lg:grid-cols-3 md:grid-cols-1 grid-cols-1 px-5 mb-4'>
            {/* first Card */}
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
            >
              <img 
                src="/images/firstArticle.png"
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
                src="/images/secondArticle.png"
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
                src="/images/thirdArticle.png"
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
        <div className='flex justify-center items-center gap-4 mb-10'>
            <button className='bg-secondary font-medium text-white text-lg rounded-md px-3 py-1'>View More</button>
            <button className='bg-primary font-medium text-white text-lg rounded-md px-3 py-1'>Join Our Mailing List</button>
        </div>



        {/* Footer */}
        <div className='py-4 gap-2 sm:px-16 px-8 sm:h-[351px] h-auto w-full bg-secondary relative'>
         
          <div className='w-full grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-1'>
             <div className='h-auto w-full flex flex-col gap-8 relative'>
                <h2 className='text-white text-xl font-semibold text-center relative'>
                  Standards
                </h2>
                <div className='text-gray-300 flex flex-col gap-1 pt-10'>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>Need a GS1 barcode</p>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>GS1 General Specifications</p>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>GS1 Standards</p>
                </div>
                <div className='absolute top-14 left-0 w-full sm:w-[90%] h-[0.5px] bg-primary'></div>
              </div>

              <div className='h-auto w-full flex flex-col gap-8 relative'>
                <h2 className='text-white text-xl font-semibold text-center relative'>
                   News & Events
                </h2>
                <div className='text-gray-300 flex flex-col gap-1 pt-10'>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>News</p>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>Events</p>
                  {/* <p>GS1 Standards</p> */}
                </div>
                <div className='absolute top-14 left-0 w-full sm:w-[90%] h-[0.5px] bg-primary'></div>
              </div>  

              <div className='h-auto w-full flex flex-col gap-8 relative'>
                <h2 className='text-white text-xl font-semibold text-center relative'>
                  About GS1
                </h2>
                <div className='text-gray-300 flex flex-col gap-1 pt-10'>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>What we do</p>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>Our story</p>
                  <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>Careers</p>
                </div>
                <div className='absolute top-14 left-0 w-full sm:w-[90%] h-[0.5px] bg-primary'></div>
              </div>

          </div>

          {/* last portion */}
            <div className='flex flex-col justify-center items-center sm:mt-16 mt-6 sm:flex-row sm:justify-between sm:items-center'>
              <h2 className='text-white mb-2 sm:mb-0'>Copyright ©GS1 Saudi Arabia - 2023 All rights reserved.</h2>
              {/* Social Media Icons */}
              <div className='flex flex-wrap gap-4'>
                <img
                  src="/images/whatsapp.png"
                  alt=""
                  className='h-12 w-12 p-2 object-contain'
                />
                <img
                  src="/images/facebook.png"
                  alt=""
                  className='h-12 w-12 p-2 object-contain'
                />
                <img
                  src="/images/facebook.png"
                  alt=""
                  className='h-12 w-12 p-2 object-contain'
                />
                <img
                  src="/images/twitter.png"
                  alt=""
                  className='h-12 w-12 p-2 object-contain'
                />
                 <img
                  src="/images/instagram.png"
                  alt=""
                  className='h-12 w-12 p-2 object-contain'
                />
                 <img
                  src="/images/youtube.png"
                  alt=""
                  className='h-12 w-12 p-2 object-contain'
                />
              </div>
            </div>
        </div> 
    </div>
  )
}

export default HomePage