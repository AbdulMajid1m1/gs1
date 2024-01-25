import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddProductsCategory = ({ isVisible, setVisibility, refreshProductsCategory }) =>
{
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
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
      const response = await newRequest.post('/productCategories', {
        name: name,
        status: status,
      });

      toast.success(`${t('Products Category')} ${name} ${t('has been added successfully')}.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setLoading(false);
      console.log(response.data);
      refreshProductsCategory();
      handleCloseCreatePopup();
      

    } catch (error) {
      toast.error(error?.response?.data?.error || 'Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setLoading(false);


      console.log(error);
    }


  };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form onSubmit={handleAddCompany} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Products Category')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('Name')}</label>
                    <input
                      type="text"
                      id="field1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                       placeholder={`${t('Enter')} ${t('Name')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>


                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className="text-secondary">{t('Status')}</label>
                    <select
                      type="text"
                      id="field2"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                        <option value="">-{t('Status')}-</option>
                        <option value="1">{t('Active')}</option>
                        <option value="2">{t('Inactive')}</option>
                    </select>
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
                  {/* <button
                    type="submit"
                    // onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t('Submit')}
                  </button> */}
                   <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    type='submit'
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Submit')} 
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

export default AddProductsCategory