import React, { useEffect, useState } from 'react'
import newRequest from '../../../utils/userRequest'
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeatureArticle = () => {

  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const fetchHeaderSliderData = async () => {
    try {
      const response = await newRequest.get("/getAllfeatured_articales");
      const filteredData = response.data.filter(item => item.status === 1);
      setData(filteredData || []);
      console.log('------------',response);
    } catch (err) {
      console.log('err',err);
    }
  };

  useEffect(() => {
    fetchHeaderSliderData() // Calling the function within useEffect, not inside itself
  }, []);
  return (
    <div>
        {/* Featured Articles */}
        <div className='flex justify-center items-center pt-5'>
        <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'>{t('Featured Articles')}</h2>
        </div>
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-5 mb-4'>
            {/* first Card */}
        {data.map((item, index) => {
          return (
            <div 
              className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white' key={index} 
            >
              <img 
                src={imageLiveUrl(item?.image)}
                alt="image"
                className='h-[75%] w-full p-2'
              />

              <div className='h-[25%] w-full pt-5'>
                <div className='px-5'>
                  <Link className='h-auto w-auto px-5 bg-primary font-medium text-white' to={`/${item.link}`}>{t('More Details')}</Link>
                  <p className='font-semibold text-secondary'> {i18n.language === 'ar' ? item?.title_ar : item?.title}</p>
                </div>
              </div>

            </div>
          );
        })}

        </div>

        {/* More events Button */}
        <div className='flex justify-center items-center gap-4 mb-10 sm:px-0 px-5'>
        <button className='bg-secondary font-medium text-white sm:text-lg text-sm rounded-md px-3 py-1'> {t('View More')}</button>
        <button className='bg-primary font-medium text-white sm:text-lg text-sm rounded-md px-3 py-1'>{t('Join Our Mailing List')}</button>
        </div>

    </div>
  )
}

export default FeatureArticle