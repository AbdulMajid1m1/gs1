import React from 'react'
import visitFrontend from "../../Images/visitFrontend.png"
import profileICon from "../../Images/profileICon.png"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const AdminDashboardRightHeader = ({ title, member, gcp }) =>
{
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className='h-32 w-full flex justify-end items-start p-3 bg-primary -mt-6 sm:gap-7 gap-4'>
        {/* <div className='flex justify-center items-center mt-2 cursor-pointer'>
                <img src={visitFrontend} 
                    alt='logo'
                      style={{ filter: 'invert(1)' }}
                         className='h-5 w-5 text-white mr-2 -mt-[2px]' />
                <p className='text-white font-sans font-normal sm:text-base text-sm transition hover:text-secondary' onClick={() => navigate('/')}>Vist Frontend</p>
            </div> */}

        <div className='flex justify-center items-center'
        //   onClick={() => navigate("/member/member-profile")} 
        >
          <img src={profileICon} alt='logo' className='h-9 w-9 transition transform hover:scale-125 object-contain cursor-pointer text-white mr-5' />
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div className={`h-20 w-[97%] bg-white shadow-xl rounded-md -mt-10 flex justify-between items-center gap-1 px-10 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          <p className="sm:text-2xl text-secondary text-lg font-sans font-semibold">{title}</p>
          <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">{member}</p>
          <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">{gcp}</p>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboardRightHeader