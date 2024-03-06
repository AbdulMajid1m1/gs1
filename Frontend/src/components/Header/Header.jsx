import React from 'react'
import gs1v2logo from "../../Images/logo.png"
import { useNavigate } from 'react-router-dom'
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../switer"
import i18n from '../../i18n';

const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate()

  return (
    <div>

      <div className='sticky top-0 z-50 bg-white p-2'>
        <div className={`h-auto w-full bg-gray-100 flex flex-col sm:flex-row justify-between items-center px-4 py-4  ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {/* Logo and Text */}
          <div className='flex items-center flex-wrap mb-4 sm:mb-0'>
            <img onClick={() => navigate('/')} src={gs1v2logo} className='h-14 w-auto cursor-pointer' alt='' />
            <div className='text-center px-2'>
              <p className='text-secondary font-semibold'>{t('GS1 Saudia Arabia')}</p>
              <p className='text-secondary'>{t('The Global Language of Business')}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-wrap justify-center'>
            <div className=''>
              <div className='flex justify-end items-end px-1 gap-3 font-sans font-semibold'>
                <p className='text-blue-500 transition-transform transform hover:scale-125 cursor-pointer'>{t('Verified By GS1')}</p>
                |
                <span onClick={() => navigate('/admin-login')} className='text-blue-500 transition-transform transform hover:scale-125 cursor-pointer'>{t('Staff Login')}</span>
              </div>
              <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                <button
                  // onClick={() => navigate('/get-barcode')}
                  onClick={() => navigate('/member-registration')}
                  className='bg-secondary text-white px-2 py-1 rounded-md transition-transform transform hover:scale-90'
                >
                  {t('Get a Barcode')}
                </button>

                <button
                  onClick={() => navigate('/email-address')}
                  className='bg-primary text-white px-2 py-1 rounded-md transition-transform transform hover:scale-90'
                >
                  {t('GS1 Member Login')}
                </button>

              </div>
            </div>

            <div className='w-full sm:w-auto'>
              <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
              </I18nextProvider>
            </div>



          </div>

        </div>
      </div>
      {/* End Nav */}
    </div>
  )
}

export default Header