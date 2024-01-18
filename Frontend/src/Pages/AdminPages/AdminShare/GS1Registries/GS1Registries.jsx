import React from 'react'
import { useTranslation } from 'react-i18next';

const GS1Registries = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
        <div  className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
            GS1 Registries
        </div>
    </div>
  )
}

export default GS1Registries