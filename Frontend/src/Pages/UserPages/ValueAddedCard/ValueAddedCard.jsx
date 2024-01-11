import React from 'react'
import first from "../../../Images/first.png"
import second from "../../../Images/second.png"
import gln from "../../../Images/gln.png"
import gdsn from "../../../Images/gdsn.png"
import { I18nextProvider, useTranslation } from 'react-i18next';

const ValueAddedCard = () =>
{
  const { t } = useTranslation();
  return (
    <div>
        <div className='flex justify-center items-center p-8 mt-5'>
        <h2 className='sm:text-4xl text-lg font-medium text-secondary font-body'> {t('GS1 Value Added Services')}</h2>
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


    </div>
  )
}

export default ValueAddedCard