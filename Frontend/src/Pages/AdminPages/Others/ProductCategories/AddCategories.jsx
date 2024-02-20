import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddCategories = ({ isVisible, setVisibility, refreshCategories }) =>
{
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [name_ar, setname_ar] = useState("");
  const [status, setstatus] = useState("");
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
      const response = await newRequest.post("/productCategories", {
        name: name,
        name_ar: name_ar,
        status: status,
      });

      toast.success(`Products Categories ${name} ${t('has been added successfully') }`);


      console.log(response.data);
      refreshCategories();
      handleCloseCreatePopup();
      setLoading(false);


    } catch (error) {
      toast.error(error?.response?.data?.error || 'Error');
      console.log(error);
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('Products Category')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                     
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field2" className="text-secondary">{t('Name English')}</label>
                    <input
                      type="text"
                      id="field2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Name English')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
            
                   <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary"> {t('Name Arabic')}</label>
                    <input
                      type="text"
                      id="name"
                      value={name_ar}
                      onChange={(e) => setname_ar(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Name Arabic')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <label htmlFor="field7" className="text-secondary">{t('Status')}</label>
                    <select
                      type="text"
                      id="field7"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                       <option value="">-{t('Status')}-</option>
                      <option value="1">{t('active')}</option>
                      <option value="0">{t('inactive')}</option>
                    </select>
               
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
                    {t('Add')} {t('Categories')}
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

export default AddCategories