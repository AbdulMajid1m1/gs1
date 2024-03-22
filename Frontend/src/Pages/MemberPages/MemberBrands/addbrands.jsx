import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const AddBrands = ({ isVisible, setVisibility, refreshBrandData, allUserData }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyNameArabic, setCompanyNameArabic] = useState("");
  const [brandCertificate, setBrandCertificate] = useState("");
  // get the sesstion data
  // const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
  // console.log(gs1MemberData)
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  console.log(memberData);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');


  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleFileChange = (e) => {
    // setError('');
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 500 * 1024) {
        setBrandCertificate(file);
        setError(''); // Clear any previous error message
      } else {
        setError('File size should be 500KB or less');
        e.target.value = null;
      }
    }
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();

    // // Check if required fields are empty
    // if (!companyName || !companyNameArabic) {
    //   toast.error('Brand Name (EN and AR) are required.', {
    //     position: 'top-right',
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'light',
    //   });
    //   return;
    // }

    setLoading(true);

    // create the formData object
    const formData = new FormData();
    formData.append('name', companyName);
    formData.append('name_ar', companyNameArabic);
    formData.append('status', 'active');
    formData.append('user_id', allUserData?.id);
    formData.append('companyID', allUserData?.companyID);

    if (brandCertificate) {
      formData.append('brandCertificate', brandCertificate);
    }

    try {
      const response = await newRequest.post('/brands', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(`${t('Brands')} ${companyName} ${('with Arabic name')}"${companyNameArabic}" ${t('has been added successfully')}.`, {
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

      setLoading(false);
      console.log(error);
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
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"}`}>{t('Add')} {t('Brands')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"}`}> {t('Brands')} {t('Name[English]')}</label>
                    <input
                      type="text"
                      id="field1"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Brands')} ${t('Name[English]')}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      required
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"}`}> {t('Brands')} {t('Name[Arabic]')} </label>
                    <input
                      type="text"
                      id="field2"
                      value={companyNameArabic}
                      onChange={(e) => setCompanyNameArabic(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Brands')} ${t('Name[Arabic]')}`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      required
                    />
                  </div>
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="field3" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"}`}>{t('Upload Documents')}</label>
                  <input
                    type="file"
                    id="field3"
                    onChange={handleFileChange}
                    className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                  />
                  {error && <p className="text-red-500">{error}</p>}
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
                                 type="button"
                                 onClick={handleAddCompany}
                                 className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                               >
                                 Add Brand
                               </button> */}
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    type="submit"
                    // onClick={handleAddCompany}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Save')}
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

export default AddBrands