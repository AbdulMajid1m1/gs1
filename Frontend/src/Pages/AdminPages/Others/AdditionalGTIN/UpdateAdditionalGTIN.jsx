import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { I18nextProvider, useTranslation } from "react-i18next";
const UpdateAdditionalGTIN = ({ isVisible, setVisibility, refreshAddtionalProducts }) =>
{
  const { t, i18n } = useTranslation();
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  console.log(updateBrandData)
  const [totalNumberOfBarcodes, setTotalNumberOfBarcodes] = useState(updateBrandData?.total_no_of_barcodes || '');
  const [price, setPrice] = useState(updateBrandData?.price || 0);
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
      const response = await newRequest.put(`/additionalProducts/gtin/${updateBrandData?.id}`, {
        "total_no_of_barcodes": Number(totalNumberOfBarcodes),
        "price": Number(price)
      });

      toast.success(response?.data?.message || 'Additional Products Updated Successfully');

      console.log(response.data);
      refreshAddtionalProducts();
      handleCloseUpdatePopup();

    } catch (error) {
      toast.error(error?.response?.data?.error || 'Something went wrong!');

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
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Update Additional GTIN Pricing')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">Total Number Of Barcodes</label>
                    <input
                      type="text"
                      id="name"
                      value={totalNumberOfBarcodes}
                      onChange={(e) => setTotalNumberOfBarcodes(e.target.value)}
                      //   readOnly
                      placeholder='Enter Total Number Of Barcodes'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className="text-secondary">
                      Price
                    </label>
                    <input
                      type="number"
                      id="status"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                    type='submit'
                    // onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Save Changes')} 
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

export default UpdateAdditionalGTIN