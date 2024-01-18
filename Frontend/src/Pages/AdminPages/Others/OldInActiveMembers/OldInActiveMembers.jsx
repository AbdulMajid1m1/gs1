import React from 'react'
import { useTranslation } from 'react-i18next';

const OldInActiveMembers = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
            Old Inactive Members
        </div>
    </div>
  )
}

export default OldInActiveMembers