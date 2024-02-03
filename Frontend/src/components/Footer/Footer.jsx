import React from 'react'
import whatsApp from "../../Images/whatsapp.png"
import facebook from "../../Images/facebook.png"
import twitter from "../../Images/twitter.png"
import instagram from "../../Images/instagram.png"
import youtube from "../../Images/youtube.png"
import linkedIn from "../../Images/linkedin.png"
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'

const Footer = () => {

  const { t } = useTranslation();
  return (
    <div>
        <div className='py-4 gap-2 sm:px-16 px-8 sm:h-[351px] h-auto w-full bg-secondary relative'>
         
         <div className='w-full grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-1'>
          <div className={`h-auto w-full flex flex-col gap-8 relative ${i18n.language === 'ar' ? 'order-last' : 'order-first'}`}>
               <h2 className='text-white text-xl font-semibold text-center relative'>
              {t('Standards')}
               </h2>
               <div className='text-gray-300 flex flex-col gap-1 pt-10'>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('Need a GS1 barcode')}</p>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('GS1 General Specifications')}</p>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('GS1 Standards')}</p>
               </div>
               <div className='absolute top-14 left-0 w-full sm:w-[90%] h-[0.5px] bg-primary'></div>
             </div>

             <div className='h-auto w-full flex flex-col gap-8 relative'>
               <h2 className='text-white text-xl font-semibold text-center relative'>
                 {t('News & Events')}
               </h2>
               <div className='text-gray-300 flex flex-col gap-1 pt-10'>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('News')}</p>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'>{t('Events')}</p>
               </div>
               <div className='absolute top-14 left-0 w-full sm:w-[90%] h-[0.5px] bg-primary'></div>
             </div>  

          <div className={`h-auto w-full flex flex-col gap-8 relative ${i18n.language === 'ar' ? 'order-first' : 'order-last'}`}>
               <h2 className='text-white text-xl font-semibold text-center relative'>
              {t('About GS1')}
               </h2>
               <div className='text-gray-300 flex flex-col gap-1 pt-10'>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('What we do')}</p>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('Our story')}</p>
                 <p className='transition-colors duration-300 hover:text-primary cursor-pointer'> {t('Careers')}</p>
               </div>
               <div className='absolute top-14 left-0 w-full sm:w-[90%] h-[0.5px] bg-primary'></div>
             </div>

         </div>

        <div className={`flex ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-col justify-center items-center sm:mt-16 mt-6 sm:flex-row sm:justify-between sm:items-center `}>
          <h2 className='text-white mb-2 sm:mb-0'> {t('Copyright @GS1 Saudi Arabia - 2023 All rights reserved.')}</h2>
             <div className='flex flex-wrap gap-4'>
               <img
                 src={whatsApp}
                 alt=""
                 className='h-12 w-12 p-2 object-contain'
               />
               <img
                 src={linkedIn}
                 alt=""
                 className='h-12 w-12 p-2 object-contain'
               />
               <img
                 src={facebook}
                 alt=""
                 className='h-12 w-12 p-2 object-contain'
               />
               <img
                 src={twitter}
                 alt=""
                 className='h-12 w-12 p-2 object-contain'
               />
                <img
                 src={instagram}
                 alt=""
                 className='h-12 w-12 p-2 object-contain'
               />
                <img
                 src={youtube}
                 alt=""
                 className='h-12 w-12 p-2 object-contain'
               />
             </div>
           </div>
          </div>
    </div>
  )
}

export default Footer