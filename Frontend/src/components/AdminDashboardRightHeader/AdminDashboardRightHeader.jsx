import React from 'react'
import visitFrontend from "../../Images/visitFrontend.png"
import profileICon from "../../Images/profileICon.png"
import gs1logowhite from '../../Images/gs1logowhite.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import CachedIcon from '@mui/icons-material/Cached';

const AdminDashboardRightHeader = ({ title, member, gcp, showIcon, fetchData }) =>
{
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const storedData = sessionStorage.getItem('adminData');
  const adminData = JSON.parse(storedData);
  // console.log(adminData);

  return (
    <div>
      <div className={`h-32 w-full flex justify-between items-start p-3 bg-primary -mt-6 sm:gap-7 gap-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* <div className='flex justify-center items-center mt-2 cursor-pointer'>
                <img src={visitFrontend} 
                    alt='logo'
                      style={{ filter: 'invert(1)' }}
                         className='h-5 w-5 text-white mr-2 -mt-[2px]' />
                <p className='text-white font-sans font-normal sm:text-base text-sm transition hover:text-secondary' onClick={() => navigate('/')}>Vist Frontend</p>
            </div> */}
        <div className='h-auto w-auto sm:py-2 py-0 sm:px-6 px-2 rounded-md shadow-xl'>
          {i18n.language === 'ar' ? (
            <p className='text-white font-semibold'>{adminData?.email}: {t('You are currently logged on as')}</p>
          ) : (
            <p className='text-white font-semibold'>{t('You are currently logged on as')}: {adminData?.email}</p>
          )}
        </div>


        <div className='flex justify-center items-center'
        //   onClick={() => navigate("/member/member-profile")} 
        >
          <img src={gs1logowhite} alt='logo' className='h-9 w-9 bg-white rounded-full transition transform hover:scale-125 object-contain cursor-pointer text-white mr-5' />
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div className={`h-20 w-[97%] bg-white shadow-xl rounded-md -mt-10 flex justify-between items-center gap-1 px-10 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          <p className="sm:text-2xl text-secondary text-lg font-sans font-semibold">{title} 
          {showIcon && (
            <span className='px-2 cursor-pointer' onClick={() => fetchData()}>
              <CachedIcon />
            </span>
          )}
          </p>
          <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">{member}</p>
          <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">{gcp}</p>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboardRightHeader