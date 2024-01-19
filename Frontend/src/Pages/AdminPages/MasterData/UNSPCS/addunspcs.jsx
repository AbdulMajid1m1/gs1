import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import LanguageSwitcher from "../../../../switer";
const Addunspcs = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  const { t } = useTranslation();
  const [commodity, setcommodity] = useState("");
  const [title, settitle] = useState("");
  const [definition, setdefinition] = useState("");
  const [addedBy, setaddedBy] = useState("");

  const handleCloseCreatePopup = () =>
  {
    setVisibility(false);
  };


  const handleAddCompany = async () =>
  {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post('/createUNSPSC/', {
        commodity: commodity,
        title: title,
        definition: definition,
        addedBy: addedBy,

      });

      toast.success(`commodity ${commodity} has been added successfully.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


      console.log(response.data);
      refreshBrandData();
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
              <form className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Add UNSPCS')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('commodity')} </label>
                    <input
                      type="number"
                      id="commodity"
                      value={commodity}
                      onChange={(e) => setcommodity(e.target.value)}
                      placeholder={t('Enter commodity')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('title')}</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      placeholder={t('Enter title')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('definition')}</label>
                    <input
                      type="text"
                      id="definition"
                      value={definition}
                      onChange={(e) => setdefinition(e.target.value)}
                      placeholder={t('Enter definition')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('addedBy')}</label>
                    <input
                      type="text"
                      id="addedBy"
                      value={addedBy}
                      onChange={(e) => setaddedBy(e.target.value)}
                      placeholder={t('Enter addedBy')}
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
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t('Add UNSPCS')}    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Addunspcs