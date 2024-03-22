import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddAddtionalGTIN = ({ isVisible, setVisibility, refreshAddtionalProducts }) =>
{
  const { t, i18n } = useTranslation();
  const [totalNumberOfBarcodes, setTotalNumberOfBarcodes] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCloseCreatePopup = () =>
  {
    setVisibility(false);
  };


  const handleAddCompany = async (e) =>
  {
    e.preventDefault();
    setLoading(true);
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post('/additionalProducts/gtin', {
        "total_no_of_barcodes": Number(totalNumberOfBarcodes),
        "price": Number(price)
      });

      toast.success(response?.data?.message || `${t('Additional Products Added Successfully')} `);
      // console.log(response.data);
      refreshAddtionalProducts();
      handleCloseCreatePopup();
      setLoading(false);


    } catch (error) {
      toast.error(error?.response?.data?.error || 'Error');
      // console.log(error);
      setLoading(false);
    }


  };


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form onSubmit={handleAddCompany} className='w-full'>
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"}`}>{t('Add Additional GTIN Pricing')} </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}> {t('Total No Of Barcodes')} </label>
                    <input
                      type="text"
                      id="name"
                      value={totalNumberOfBarcodes}
                      onChange={(e) => setTotalNumberOfBarcodes(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Total No Of Barcodes')}`}
                       className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('Price')}</label>
                    <input
                      type="number"
                      id="field2"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Price')}`}
                       className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    {t('Close')}
                  </button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    type='submit'
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Add Additional GTIN Pricing')} 
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

export default AddAddtionalGTIN