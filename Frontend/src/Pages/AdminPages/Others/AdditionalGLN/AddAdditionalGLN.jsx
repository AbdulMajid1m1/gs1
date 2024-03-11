import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddAddtionalGLN = ({ isVisible, setVisibility, refreshAddtionalProducts }) => {
  const { t, i18n } = useTranslation();
  const [totalNumberOfGln, setTotalNumberOfGln] = useState("");
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
      const response = await newRequest.post('/additionalProducts/gln', {
        "total_no_of_gln": Number(totalNumberOfGln),
        "price": Number(price)
      });

      toast.success(response?.data?.message || `${t('Additional Gln Added Successfully')}`);
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('Add Additional GLN')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary"> {t('Total No Of GLN')}</label>
                    <input
                      type="text"
                      id="name"
                      value={totalNumberOfGln}
                      onChange={(e) => setTotalNumberOfGln(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Total No Of GLN')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className="text-secondary"> {t('Price')}</label>
                    <input
                      type="number"
                      id="field2"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Price')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
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
                    {t('Add Additional Gln')} 
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

export default AddAddtionalGLN