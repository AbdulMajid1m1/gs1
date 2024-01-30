import React from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';

const Users = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
            <AdminDashboardRightHeader title={'Users'}/>
        </div>
      </div>
    </div>
  )
} 

export default Users