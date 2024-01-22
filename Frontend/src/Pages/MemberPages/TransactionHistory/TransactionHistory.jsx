import React from 'react'
import { useTranslation } from 'react-i18next';

const TransactionHistory = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
            Transaction History
        </div>
    </div>
  )
}

export default TransactionHistory