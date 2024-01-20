import React from 'react'
import { useTranslation } from 'react-i18next';

const VerifiedByGS1 = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`} >
            Verified By GS1
        </div>
    </div>
  )
}

export default VerifiedByGS1