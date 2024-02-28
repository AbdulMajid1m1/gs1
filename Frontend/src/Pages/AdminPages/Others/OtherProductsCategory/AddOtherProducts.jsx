import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddotherProducts = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  const { t, i18n } = useTranslation();
  const [product_name, setproduct_name] = useState("");
  const [total_no_of_barcodes, settotal_no_of_barcodes] = useState("");
  const [product_subscription_fee, setproduct_subscription_fee] = useState("");
  const [code, setcode] = useState("");
  const [med_subscription_fee, setmed_subscription_fee] = useState("");
  const [variant, setvariant] = useState("");
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
      const response = await newRequest.post('/createotherProduct/', {
        product_name: product_name,
        total_no_of_barcodes: total_no_of_barcodes,
        product_subscription_fee: product_subscription_fee,
        code: code,
        med_subscription_fee: med_subscription_fee,
        variant: variant,
        status: status,
      });

      toast.success(`${t('Other Products Category')} ${product_name} ${t('has been added successfully') }`);


      console.log(response.data);
      refreshBrandData();
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Add')}{t('Other Products Category')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                 
                 <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field1" className="text-secondary">{t('product name')}  </label>
                    <input
                      type="text"
                      id="field1"
                      value={product_name}
                      onChange={(e) => setproduct_name(e.target.value)}
                      placeholder={t('Enter product name')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field2" className="text-secondary">{t('total no of barcodes')}</label>
                    <input
                      type="number"
                      id="field2"
                      value={total_no_of_barcodes}
                      onChange={(e) => settotal_no_of_barcodes(e.target.value)}
                      placeholder={t('Enter total no of barcodes')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                 </div>

                 
                 <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field3" className="text-secondary">{t('product subscription fee')}</label>
                    <input
                      type="number"
                      id="field3"
                      value={product_subscription_fee}
                      onChange={(e) => setproduct_subscription_fee(e.target.value)}
                      placeholder={t('Enter product subscription fee')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field4" className="text-secondary">{t('med subscription fee')}</label>
                    <input
                      type="number"
                      id="field4"
                      value={med_subscription_fee}
                      onChange={(e) => setmed_subscription_fee(e.target.value)}
                      placeholder={t('Enter med subscription fee')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                 </div>

                 <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field5" className="text-secondary">{t('code')}</label>
                    <input
                      type="text"
                      id="field5"
                      value={code}
                      onChange={(e) => setcode(e.target.value)}
                      placeholder={t('Enter code')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field6" className="text-secondary">{t('variant')}</label>
                    <input
                      type="text"
                      id="field6"
                      value={variant}
                      onChange={(e) => setvariant(e.target.value)}
                      placeholder={t('Enter variant')}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                 </div>


                 <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
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
                    {t('Add Other Services Pricing')} 
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

export default AddotherProducts