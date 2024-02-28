import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const BulkPopUp = ({ isVisible, setVisibility, refreshSsccData }) => {
  const [extensionDigit, setExtensionDigit] = useState('');
  const [quantity, setQuantity] = useState("");
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();


  const handleCloseBulkPopup = () => {
    setVisibility(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(extensionDigit, quantity)
    try {
      const requestBody = {
        preDigit: extensionDigit,
        quantity: quantity,
        user_id: memberData?.id // Replace with currentUser?.user?.id if needed
      };

      const response = await newRequest.post('/sscc/bulk', requestBody);
      console.log(response.data);

      //  display message
      const successMessage = response.data.message;
      toast.success(successMessage);
      setLoading(false);

      refreshSsccData();
      handleCloseBulkPopup();

      // reset form
      e.target.reset();

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || `${t('The Bulk Barcode is not generated')}`);
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
              <form onSubmit={handleSubmit} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Generate Bulk SSCC Barcodes')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">{t('Extension Digit')}<span className='text-red-600'>*</span></label>
                    <select
                      onChange={(e) => setExtensionDigit(e.target.value)}
                      type="text" id="field1"
                      required
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option>-select-</option>
                      <option value='0'>0</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className="text-secondary"> {t('Quantity')}<span className='text-red-600'>*</span> </label>
                    <input
                      type="number"
                      id="field2"
                      value={quantity}
                      required
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Quantity"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseBulkPopup}
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
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Generate')}
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

export default BulkPopUp