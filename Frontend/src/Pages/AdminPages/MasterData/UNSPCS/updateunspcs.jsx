import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import LanguageSwitcher from "../../../../switer";
const Updateunspcs = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  const { t, i18n } = useTranslation();
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  console.log(updateBrandData)
  const [commodity, setcommodity] = useState(updateBrandData?.commodity || '');
  const [title, settitle] = useState(updateBrandData?.title || '');
  const [definition, setdefinition] = useState(updateBrandData?.definition || '');
  const [addedBy, setaddedBy] = useState(updateBrandData?.addedBy || '');
  const [status, setstatus] = useState(updateBrandData?.status || 0);
  const [loading, setLoading] = useState(false);


  const handleCloseUpdatePopup = () =>
  {
    setVisibility(false);
  };




  const handleUpdateBrand = async () =>
  {
    // console.log(brandUserId);
    setLoading(true);

    try {
      const response = await newRequest.put(`/updateUNSPSC/${updateBrandData?.id}`, {
        commodity: Number(commodity),
        title: title,
        definition: definition,
        addedBy: Number(addedBy),

      });

      toast.success(response?.data?.message || 'unspcs updated successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(response.data);
      refreshBrandData();
      handleCloseUpdatePopup();

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error);
    }
    finally {
      setLoading(false);
    }




  };


  return (
    <div>
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Update unspcs')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('commodity')}</label>
                    <input
                      type="number"
                      id="commodity"
                      value={commodity}
                      onChange={(e) => setcommodity(e.target.value)}
                      //   readOnly
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
                      //   readOnly
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
                      //   readOnly
                      placeholder={t('Enter definition')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('addedBy')}</label>
                    <input
                      type="number"
                      id="addedBy"
                      value={addedBy}
                      onChange={(e) => setaddedBy(e.target.value)}
                      //   readOnly
                      placeholder={t('Enter addedBy')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>



                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
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
                    onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Update unspcs')} 
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

export default Updateunspcs