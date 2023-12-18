import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import first from "../../../Images/first.png"
import second from "../../../Images/second.png"
import gln from "../../../Images/gln.png"
import gdsn from "../../../Images/gdsn.png"
import firstEvents from "../../../Images/firstEvents.png"
import secondEvents from "../../../Images/secondEvents.png"
import thirdEvents from "../../../Images/thirdEvents.png"
import firstArticle from "../../../Images/firstArticle.png"
import secondArticle from "../../../Images/secondArticle.png"
import thirdArticle from "../../../Images/thirdArticle.png"
import firstslider from "../../../Images/firstslider.png"
import secondslider from "../../../Images/secondslider.png"
import thirdslider from "../../../Images/thirdslider.png"
import fourthslider from "../../../Images/fourthslider.png"
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const HomePage = () => {

  return (
    <div>

        {/* Nav */}
        <div className='sticky top-0 z-50 bg-white'>
          <Header />
        </div>


        {/* Slider */}
        <div className='h-auto w-full bg-white border-b mt-10'>
          <div className='h-auto w-full bg-secondary flex justify-center items-center'>
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
                    <div className='w-full flex flex-col lg:flex-row justify-between items-center px-5'>
                      <div className='w-full flex flex-col gap-2 sm:px-10 px-4 sm:pt-0 pt-5'>
                        <h2 className='sm:text-3xl text-xl text-white font-semibold'>Verified by GS1</h2>
                        <p className='text-lg text-white font-medium'>Discover how businesses around the world are implementing by Getting started with Verified by GS1</p>
                        <button className=' bg-primary sm:w-[50%] w-full text-white font-medium sm:text-xl text-xs px-4 py-1'>Read the Sucess Stories</button>
                      </div>

                      <div className='w-full sm:px-10 px-4'>
                          <img src={firstslider} className='sm:h-60 h-auto w-full py-5 object-contain' alt='' />
                      </div>
                    </div>
                  </SwiperSlide>
                  
                  <SwiperSlide>
                    <div className='w-full flex flex-col lg:flex-row justify-between items-center sm:px-5 px-2'>
                        <div className='w-full flex flex-col gap-2 sm:px-10 px-4 sm:pt-0 pt-5'>
                          <h2 className='sm:text-3xl text-xl text-white font-semibold'>2D Migration</h2>
                          <p className='text-lg text-white font-medium'>Paving the way for a global migration to 2D barcodes</p>
                          <button className=' bg-primary sm:w-[50%] w-full text-white font-medium sm:text-xl text-xs px-4 py-1'>Read the Sucess Stories</button>
                        </div>

                        <div className='w-full sm:px-10 px-4'>
                            <img src={secondslider} className='sm:h-60 h-auto w-full py-5 object-contain' alt='' />
                        </div>
                      </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className='w-full flex flex-col lg:flex-row justify-between items-center sm:px-5 px-2'>
                        <div className='w-full flex flex-col gap-2 sm:px-10 px-4 sm:pt-0 pt-5'>
                          <h2 className='sm:text-3xl text-xl text-white font-semibold'>50 years of transforming tomorrow</h2>
                          <p className='text-sm text-white font-medium'>The barcode has been transforming the way we work and live with the power of GS1 standards. Let's celebrate this amazing anniversary together!</p>
                          <button className=' bg-primary sm:w-[50%] w-full text-white font-medium sm:text-xl text-xs px-4 py-1'>Read the Sucess Stories</button>
                        </div>

                        <div className='w-full sm:px-10 px-4'>
                            <img src={thirdslider} className='sm:h-60 h-auto w-full py-5 object-contain' alt='' />
                        </div>
                      </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className='w-full flex flex-col lg:flex-row justify-between items-center px-5'>
                        <div className='w-full flex flex-col gap-2 sm:px-10 px-4 sm:pt-0 pt-5'>
                          <h2 className='sm:text-3xl text-xl text-white font-semibold'>GS1 Saudi Arabia Mobile App</h2>
                          <p className='text-lg text-white font-medium'>GS1 Saudi Arabia standards on the Go</p>
                          <button className=' bg-primary sm:w-[50%] w-full text-white font-medium sm:text-xl text-xs px-4 py-1'>Read the Sucess Stories</button>
                        </div>

                        <div className='w-full sm:px-10 px-4'>
                            <img src={fourthslider} className='sm:h-60 h-auto w-full py-5 object-contain' alt='' />
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
                src={first}
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>

            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src={second}
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>

            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src={gln}
                alt=""
                className='w-[95%] h-40 p-1 object-contain'
              />
            </div>

            <div 
              className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
            >
              <img 
                src={gdsn}
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
        <div className='flex justify-center items-center gap-4 mb-10'>
            <button className='bg-secondary font-medium text-white text-lg rounded-md px-3 py-1'>View More</button>
            <button className='bg-primary font-medium text-white text-lg rounded-md px-3 py-1'>Join Our Mailing List</button>
        </div>



        {/* Footer */}
          <Footer />
        {/* Footer End */}
        
    </div>
  )
}

export default HomePage