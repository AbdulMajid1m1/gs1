import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const UpdateBrands = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
    console.log(updateBrandData)
    const [brandName, setBrandName] = useState(updateBrandData?.name || '');
    const [brandNameArabic, setBrandNameArabic] = useState(updateBrandData?.name_ar || '');
    const [brandStatus, setBrandStatus] = useState(updateBrandData?.status || '');
    // const [brandUserId, setBrandUserId] = useState(updateBrandData?.user_id || '');
    const [updateBrandCertificate, setUpdateBrandCertificate] = useState('');
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t,i18n } = useTranslation();


    const handleCloseUpdatePopup = () => {
        setVisibility(false);
      };

    
    const handleFileChange = (e) => {
      // setError('');
      const file = e.target.files[0];
        if (file) {
          if (file.size <= 500 * 1024) {
            setUpdateBrandCertificate(file);
              setError(''); // Clear any previous error message
          } else {
            setError('File size should be 500KB or less');
            e.target.value = null;
          }
        }
      };



const handleUpdateBrand = async () => {
  // console.log(brandUserId);
  setLoading(true);

  const formData = new FormData();
  formData.append('name', brandName);
  formData.append('name_ar', brandNameArabic);
  formData.append('status', 'active');
  formData.append('user_id', updateBrandData?.id);
  formData.append('companyID', updateBrandData?.companyID);
  formData.append('brandCertificate', updateBrandCertificate);

 
  try {
    const response = await newRequest.put(`/brands/${updateBrandData?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success(response?.data?.message || `${t('Brands')} ${companyName} ${('with Arabic name')}" ${companyNameArabic}" ${t('has been')} ${t('Updated Successfully')}`, {
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
    toast.error(error?.response?.data?.message || `${t('Something went wrong!')}`, {
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
                            <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"}`}>{t('Update')} {t('Brands')}</h2>
                            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('Brands')} {t('Name[English]')}</label>
                                <input
                                  type="text"
                                  id="field1"
                                  value={brandName}
                                  onChange={(e) => setBrandName(e.target.value)}
                                //   readOnly
                                  placeholder={`${t('Enter')} ${t('Brands')} ${t('Name[English]')}`}
                                 className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                                />
                              </div>

                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field2" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('Brands')} {t('Name[Arabic]')}</label>
                                <input
                                  type="text"
                                  id="field2"
                                  value={brandNameArabic}
                                  onChange={(e) => setBrandNameArabic(e.target.value)}
                                //   readOnly
                                 placeholder={`${t('Enter')} ${t('Brands')} ${t('Name[Arabic]')}`}
                                 className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field3" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('Status')}</label>
                                <select
                                  type="text"
                                  id="field3"
                                  value={brandStatus}
                                  onChange={(e) => setBrandStatus(e.target.value)}
                                //   readOnly
                                  placeholder="Enter Brand Name EN"
                                 className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                                >
                                  <option value="active">{t('Active')}</option>
                                  <option value="inactive">{t('Inactive')}</option>
                                </select>
                              </div>

                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field4" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('Upload Documents')} </label>
                                  <input
                                  type="file"
                                  id="field4"
                                  onChange={handleFileChange}
                                 className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start" }`}
                                />
                                {error && <p className="text-red-500">{error}</p>}
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
                                {t('SAVE CHANGES')}
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

export default UpdateBrands