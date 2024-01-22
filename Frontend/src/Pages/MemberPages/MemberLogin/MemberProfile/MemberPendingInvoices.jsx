import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MemberPendingInvoices = ({ isVisible, setVisibility }) => {
    const navigate = useNavigate();
    const handleCloseMemberPendingInvoives = () => {
        setVisibility(false);
  };
  const { t } = useTranslation();

    

  return (
    <div>
         {isVisible && (
                   <div className="popup-overlay">
                     <div className="popup-container h-auto sm:w-[45%] w-full">
                       <div className="popup-form w-full">         
                          <form className='w-full'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('You have pending unsettled Invoice...')}</h2>
                                <p className='text-secondary font-sans font-semibold'> {t("If You Already Paid, Click on 'OK' to Upload the Bank Slip")}</p> 
                            </div>

                            <div className="w-full flex justify-center items-center gap-8 mt-5">
                              <button
                                type="button"
                                className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                onClick={handleCloseMemberPendingInvoives}
                              >
                                {t('Close')}
                              </button>
                              {/* <button
                                type="button"
                                onClick={handleUpdateBrand}
                                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                              >
                                Update Brand
                              </button> */}
                               <Button
                                variant="contained"
                                style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                onClick={() => navigate('/member/bank-slip')}
                                className="w-[70%] ml-2"
                                >
                                 {t('OK')}
                            </Button>
                            </div>
                          </form>
                        </div>
                        </div>
                    </div>
                  )}

    </div>
  )
}

export default MemberPendingInvoices