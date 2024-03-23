import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import newRequest from '../../../utils/userRequest';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useQuery } from 'react-query';


const HeaderSlider = () => {

  const { t, i18n } = useTranslation();

  const { isLoading, error, data: slidersData } = useQuery("fetchAllSliders", fetchFeaturesData);

  async function fetchFeaturesData() {
    const response = await newRequest.get("/getAllsliders");
    return response?.data.filter(item => item.status === 1) || [];
  }
  
  return (
    <div>
         <div className='h-auto w-full bg-white border-b mt-4'>
          <div className='relative h-auto w-full bg-secondary flex justify-center items-center'>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: "#swiper-button-next",
                    prevEl: "#swiper-button-prev",
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  // navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >

                  {/* {data.map((item) => ( */}
                  {isLoading ? (
                      <div>Loading...</div>
                    ) : error ? (
                      ""
                    ) : (
                      slidersData.map((item) => (
                    <SwiperSlide>
                      <div className={`w-full flex flex-col  justify-between items-center px-5 ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`} >
                          <div className='w-full flex flex-col gap-2 sm:px-10 px-4 sm:pt-0 pt-5'>
                            <h2 className='sm:text-3xl text-xl text-white font-semibold'>{item?.title} </h2>
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
                      ))
                    )}
                  {/* // ))} */}

                  </Swiper>
                  <div
                    id="swiper-button-prev"
                    className="absolute left-0 top-1/2 z-20 -translate-y-1/2 transform md:left-1 "
                  >
                    <IoIosArrowDropleftCircle className="cursor-pointer rounded-full border-white text-4xl text-white opacity-40 hover:border hover:opacity-80" />
                  </div>
                  <div
                    id="swiper-button-next"
                    className="absolute right-0 top-1/2 z-20 -translate-y-1/2 transform md:right-1 "
                  >
                    <IoIosArrowDroprightCircle className="cursor-pointer rounded-full border-white text-4xl text-white opacity-40 hover:border hover:opacity-80" />
                  </div>

          </div>
        </div>

    </div>
  )
}

export default HeaderSlider