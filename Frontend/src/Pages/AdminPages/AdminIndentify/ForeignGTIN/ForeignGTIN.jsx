import React from 'react'
import { useTranslation } from 'react-i18next';

const ForeignGTIN = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={`p-0 h-full bg-slate-100 ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        Foreign GTIN
      </div>
    </div>
  )
}

export default ForeignGTIN