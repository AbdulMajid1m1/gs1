import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import newRequest from '../../../utils/userRequest'
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

const OurSolutionPartner = () => {
  const { t } = useTranslation();
  // const [data, setData] = useState([]);
  // const fetchHeaderSliderData = async () => {
  //   try {
  //     const response = await newRequest.get("/getAllpartners");
  //     const filteredData = response.data.filter(item => item.status === 1);
  //     setData(filteredData || []);
  //     console.log('------------', response);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };


  const { isLoading, error, data: partnersData } = useQuery("fetchAllPartnersSolutions", fetchPartnerSolutionsData);

  async function fetchPartnerSolutionsData() {
    const response = await newRequest.get("/getAllpartners");
    return response?.data.filter(item => item.status === 1) || [];
  }

  // useEffect(() => {
  //   fetchHeaderSliderData() // Calling the function within useEffect, not inside itself
  // }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div>
          {/* Our Solution Partners */}
          <div className='flex justify-center items-center pt-5'>
        <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'> {t('Our Solution Partners')}</h2>
        </div>
     
        <div className='mt-10 mb-10 px-10'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
         autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
            centeredSlides: true,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
      <div className='grid 2xl:grid-cols-4 xl:grid-cols-5 gap-0 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-5'>
            {/* {data.map((item, index) => {
              return ( */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          ""
        ) : (
          partnersData.map((item) => (
        <SwiperSlide>
            <div
              className='flex justify-center items-center h-32 w-full border rounded-sm shadow-lg transition-transform transform hover:border-blue-500 hover:border-2'
            >
              <img 
                src={imageLiveUrl(item?.image)}
                alt="partner"
                className='w-[90%] h-auto p-1 object-contain'
              />
            </div>
        </SwiperSlide>
           ))
          )}
            {/* //   );
            // })} */}
       
      </div>
      </Swiper>

      <div className='flex justify-center items-center mt-10'>
        <button className='bg-primary font-medium text-white text-lg rounded-md px-5 py-1 hover:scale-105 transition-transform duration-300 ease-in-out' onClick={scrollToTop}> {t('Back To Top')}</button>
      </div>
    </div>

    </div>
  )
}

export default OurSolutionPartner