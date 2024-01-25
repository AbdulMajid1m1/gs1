import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { I18nextProvider, useTranslation } from "react-i18next";
const UpdateProductsCategory = ({ isVisible, setVisibility, refreshProductsCategory }) =>
{
  const { t, i18n } = useTranslation();
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  console.log(updateBrandData)
  const [name, setname] = useState(updateBrandData?.name || '');
  const [status, setstatus] = useState(updateBrandData?.status || 0);
  const [loading, setLoading] = useState(false);


  const handleCloseUpdatePopup = () =>
  {
    setVisibility(false);
  };




  const handleUpdateBrand = async (e) =>
  {
    e.preventDefault();
    // console.log(brandUserId);
    setLoading(true);

    try {
      const response = await newRequest.put(`/productCategories/${updateBrandData?.id}`, {
        name: name,
        status: Number(status),
      });

      toast.success(response?.data?.message || `${t('Products Category')} ${t('has been')} ${t('Updated Successfully')}.`);

      console.log(response.data);
      refreshProductsCategory();
      handleCloseUpdatePopup();

    } catch (error) {
      toast.error(error?.response?.data?.message || `${t('Something went wrong!')}`);

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
              <form onSubmit={handleUpdateBrand} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Edit')} {t('Products Category')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('Name')}</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      //   readOnly
                      placeholder={`${t('Enter')} ${t('Name')}`}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className="text-secondary">
                      {t('Status')} 
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option value="">-{t('Status')}-</option>
                      <option value="1">{t('active')}</option>
                      <option value="2">{t('inactive')}</option>
                    </select>
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
                    type='submit'
                    // onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Update')} {t('Products Category')} 
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

export default UpdateProductsCategory