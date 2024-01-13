import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import firstslider from "../../../Images/firstslider.png"
import secondslider from "../../../Images/secondslider.png"
import thirdslider from "../../../Images/thirdslider.png"
import fourthslider from "../../../Images/fourthslider.png"
import newRequest from '../../../utils/userRequest';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { Link } from 'react-router-dom';


const HeaderSlider = () => {

  const [data, setData] = useState([]); 
    const fetchHeaderSliderData = async () => {
      try {
          const response = await newRequest.get("/getAllsliders",);

          console.log(response.data);

        const filteredData = response.data.filter(item => item.status === 1);
        setData(filteredData || []);
          // setIsLoading(false)

      } catch (err) {
          console.log(err);
          // setIsLoading(false)
      }
  };
  
  useEffect(() => {

    fetchHeaderSliderData() // Calling the function within useEffect, not inside itself
  }, []);
  return (
    <div>
         <div className='h-auto w-full bg-white border-b mt-4'>
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
                  {/* <SwiperSlide>
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
                  </SwiperSlide> */}
                  
                  {data.map((item) => (
                    <SwiperSlide>
                        <div className='w-full flex flex-col lg:flex-row justify-between items-center px-5'>
                          <div className='w-full flex flex-col gap-2 sm:px-10 px-4 sm:pt-0 pt-5'>
                            <h2 className='sm:text-3xl text-xl text-white font-semibold'>{item?.title}</h2>
                            <p className='text-lg text-white font-medium'>{item?.description}</p>
                            <Link to={`/${item?.link}`}>
                              <button className=' bg-primary sm:w-[50%] w-full text-white font-medium sm:text-xl text-xs px-4 py-1'>Read the Sucess Stories</button>
                            </Link>
                          </div>

                          <div className='w-full sm:px-10 px-4'>
                              <img src={imageLiveUrl(item?.image)} className='sm:h-60 h-auto w-full py-5 object-contain' alt='' />
                          </div>
                        </div>
                    </SwiperSlide>
                  ))}

                  {/* <SwiperSlide>
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
                  </SwiperSlide> */}

                  {/* <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide> */}
                  </Swiper>

          </div>
        </div>

    </div>
  )
}

export default HeaderSlider