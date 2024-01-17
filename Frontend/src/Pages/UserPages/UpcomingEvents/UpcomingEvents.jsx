import React, { useEffect, useState } from 'react'
import newRequest from '../../../utils/userRequest'
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const UpcomingEvents = () => {

  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);

  const fetchUpcomingEventsData = async () => {
    try {
      const response = await newRequest.get("/getAllupcoming_events",);

      const filteredData = response.data.filter(item => item.status === 1);
      console.log('Event section', response.data);
      setData(filteredData || []);
      // setIsLoading(false)

    } catch (err) {
      console.log(err);
      // setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchUpcomingEventsData() // Calling the function within useEffect, not inside itself
  }, []);

  return (
    <div>
      {/* upcoming Events */}
      <div className='flex justify-center items-center pt-12'>
        <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'>  {t('Upcoming Events')}</h2>
      </div>
      <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-5 mb-4'>
        {data.map((item) => (
          <div
            className='h-96 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 bg-white'
          >
            <Link to={`/${item?.link}`}>
              <img
                src={imageLiveUrl(item?.image)}
                alt=""
                className='h-[75%] w-full p-2 object-cover'
              />
            </Link>
            <div className='h-[25%] w-full pt-5'>
              <div className='px-5'>
                <button className='h-auto w-auto px-5 bg-primary font-medium text-white'>{t('More Details')}</button>
                <p className='font-semibold text-secondary'>
                  {i18n.language === 'ar' ? item?.title_ar : item?.title}
                </p>
              </div>
            </div>
          </div>
        ))}


      </div>

      {/* More events Button */}
      <div className='flex justify-center items-center mb-10'>
        <button className='bg-primary font-medium text-white text-lg rounded-md px-5 py-1'>{t('More Events')}</button>
      </div>

    </div>
  )
}

export default UpcomingEvents