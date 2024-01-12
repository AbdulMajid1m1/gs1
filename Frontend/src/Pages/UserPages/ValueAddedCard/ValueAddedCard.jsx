import React, { useEffect, useState } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next';
import newRequest from '../../../utils/userRequest'
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl'
import { Link } from 'react-router-dom';

const ValueAddedCard = () =>
{
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const fetechAllCardData = async () => {
    try {
        const response = await newRequest.get("/getAllfeatured_services",);
        setData(response?.data || []);
        // setIsLoading(false)
        console.log(response.data);

    } catch (err) {
        console.log(err);
        // setIsLoading(false)
    }
  };

  useEffect(() => {
      fetechAllCardData() // Calling the function within useEffect, not inside itself
  }, []);

  return (
    <div>
        <div className='flex justify-center items-center p-8 mt-5'>
        <h2 className='sm:text-3xl text-lg font-medium text-secondary font-body'> {t('GS1 Value Added Services')}</h2>
        </div>
       
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 gap-7 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-5'>
            {data.map((item, index) => {
              return (
                <div 
                  className='flex justify-end items-end h-40 w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110'
                  key={index}
                >
                  <Link to={`/${item?.link}`}>
                    <img 
                      src={imageLiveUrl(item?.image)}
                      alt=""
                      className='w-[95%] h-40 p-1 object-contain'
                    />
                  </Link>
                </div>
              );
            })}
            

            {/* <div 
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
            </div> */}
        </div>


    </div>
  )
}

export default ValueAddedCard