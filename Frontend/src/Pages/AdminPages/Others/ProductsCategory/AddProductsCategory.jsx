import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './AddCategories.css'

const AddProductsCategory = ({ isVisible, setVisibility, refreshProductsCategory }) =>
{
  const { t, i18n } = useTranslation();
  const [memberCategoryDescriptionE, setMemberCategoryDescriptionE] = useState("");
  const [memberCategoryDescriptionAr, setMemberCategoryDescriptionAr] = useState("");
  const [total_no_of_barcodes, settotal_no_of_barcodes] = useState("");
  const [memberRegistrationFee, setMemberRegistrationFee] = useState("");
  const [gtinYearlySubscriptionFee, setGtinYearlySubscription] = useState("");
  const [type, setType] = useState("");
  const [status, setstatus] = useState("");
  const [gcpStartRange, setGcpStartRange] = useState("");
  const [quotation, setQuotation] = useState("");
  const [allowOtherProducts, setAllowOtherProducts] = useState("");
  const [gcpType, setGcpType] = useState("");
  const [gcpOrder, setGcpOrder] = useState("");
  const [med_subscription_fee, setmed_subscription_fee] = useState("");
  const [memberYearlySubscriptionFee, setMemberYearlySubscriptionFee] = useState("");
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
      const response = await newRequest.post('/gtinProductCategories', {
        "member_category_description": memberCategoryDescriptionE,
        "total_no_of_barcodes": Number(total_no_of_barcodes),
        "member_registration_fee": Number(memberRegistrationFee),
        "gtin_yearly_subscription_fee": Number(gtinYearlySubscriptionFee),
        "type": type,
        "status": Number(status),
        "gcp_start_range": gcpStartRange,
        "quotation": quotation, 
        "allow_otherProducts": allowOtherProducts,
        "gcp_type": gcpType,
        "gtin_order": gcpOrder,
        "member_category_description_ar": memberCategoryDescriptionAr,
        "med_registration_fee": Number(memberRegistrationFee),
        "med_yearly_subscription_fee": Number(memberYearlySubscriptionFee)
    });

      toast.success(`product_name has been added successfully.`);

<<<<<<< HEAD
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
=======
>>>>>>> 2137e3915e33ae956fca3c21d32e9b1a0d916cb7

      console.log(response.data);
      refreshProductsCategory();
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
        <div className="popup-overlay overflow-x-auto">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form onSubmit={handleAddCompany} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Products Categories</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
            
                 <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field1" className="text-secondary">Category Description English</label>
                    <input
                      type="text"
                      id="field1"
<<<<<<< HEAD
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                       placeholder={`${t('Enter')} ${t('Name')}`}
=======
                      value={memberCategoryDescriptionE}
                      onChange={(e) => setMemberCategoryDescriptionE(e.target.value)}
                      placeholder='Category Description English'
>>>>>>> 2137e3915e33ae956fca3c21d32e9b1a0d916cb7
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field1" className="text-secondary">Category Description Arabic</label>
                    <input
                      type="text"
                      id="field1"
                      value={memberCategoryDescriptionAr}
                      onChange={(e) => setMemberCategoryDescriptionAr(e.target.value)}
                      placeholder='Category Description Arabic'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                 </div>

<<<<<<< HEAD
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className="text-secondary">{t('Status')}</label>
=======
                 
                 <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field2" className="text-secondary">total no of barcodes</label>
                    <input
                      type="number"
                      id="field2"
                      value={total_no_of_barcodes}
                      onChange={(e) => settotal_no_of_barcodes(e.target.value)}
                      placeholder='Enter total no of barcodes'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field3" className="text-secondary">Member Registration Fee</label>
                    <input
                      type="number"
                      id="field3"
                      value={memberRegistrationFee}
                      onChange={(e) => setMemberRegistrationFee(e.target.value)}
                      placeholder='Member Registration fee'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                 </div>

                 <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field4" className="text-secondary">Gtin Yearly Subscription Fee</label>
                    <input
                      type="number"
                      id="field4"
                      value={gtinYearlySubscriptionFee}
                      onChange={(e) => setGtinYearlySubscription(e.target.value)}
                      placeholder='Gtin Yearly Subscription Fee'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field9" className="text-secondary">Allow Other Products</label>
                    <input
                      type="text"
                      id="field9"
                      value={allowOtherProducts}
                      onChange={(e) => setAllowOtherProducts(e.target.value)}
                      placeholder='Allow Other Products'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                 </div>


                <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field5" className="text-secondary">type</label>
                    <input
                      type="text"
                      id="field5"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder='Enter Type'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                   <label htmlFor="field6" className="text-secondary">Gcp Start Range</label>
                    <input
                      type="text"
                      id="field6"
                      value={gcpStartRange}
                      onChange={(e) => setGcpStartRange(e.target.value)}
                      placeholder='Gcp Start Range'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                 </div>

                 <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field7" className="text-secondary">{t('Status')}</label>
>>>>>>> 2137e3915e33ae956fca3c21d32e9b1a0d916cb7
                    <select
                      type="text"
                      id="field7"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
<<<<<<< HEAD
                        <option value="">-{t('Status')}-</option>
                        <option value="1">{t('Active')}</option>
                        <option value="2">{t('Inactive')}</option>
=======
                      <option value="">-Select Status-</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
>>>>>>> 2137e3915e33ae956fca3c21d32e9b1a0d916cb7
                    </select>
                  </div>
                </div>


                <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  

                 
                  </div>


                <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field8" className="text-secondary">Quotation</label>
                    <input
                      type="text"
                      id="field8"
                      value={quotation}
                      onChange={(e) => setQuotation(e.target.value)}
                      placeholder='Quotation'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field10" className="text-secondary">Gcp Type</label>
                    <input
                      type="text"
                      id="field10"
                      value={gcpType}
                      onChange={(e) => setGcpType(e.target.value)}
                      placeholder='Gcp Type'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field11" className="text-secondary">Gcp Order</label>
                    <input
                      type="text"
                      id="field11"
                      value={gcpOrder}
                      onChange={(e) => setGcpOrder(e.target.value)}
                      placeholder='Gcp Order'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                </div>


                <div className="flex flex-col sm:gap-3 gap-3 sm:flex-row sm:justify-between">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field12" className="text-secondary">Med Subscription Fee</label>
                    <input
                      type="text"
                      id="field12"
                      value={med_subscription_fee}
                      onChange={(e) => setmed_subscription_fee(e.target.value)}
                      placeholder='Med Subscription Fee'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    <label htmlFor="field13" className="text-secondary">Member Yearly Subscription Fee</label>
                    <input
                      type="text"
                      id="field13"
                      value={memberYearlySubscriptionFee}
                      onChange={(e) => setMemberYearlySubscriptionFee(e.target.value)}
                      placeholder='Member Yearly Subscription Fee'
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
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
                    {t('Add Categories')} 
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