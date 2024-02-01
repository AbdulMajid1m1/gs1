import React from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import { I18nextProvider, useTranslation } from "react-i18next";

const ProductCategories = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <DashboardRightHeader
            title={t('Product Categories')}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCategories