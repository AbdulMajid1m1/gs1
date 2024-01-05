import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';

const AddotherProduct = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  const [product_name, setproduct_name] = useState("");
  const [total_no_of_barcodes, settotal_no_of_barcodes] = useState("");
  const [product_subscription_fee, setproduct_subscription_fee] = useState("");
  const [code, setcode] = useState("");
  const [med_subscription_fee, setmed_subscription_fee] = useState("");
  const [variant, setvariant] = useState("");
  const handleCloseCreatePopup = () =>
  {
    setVisibility(false);
  };


  const handleAddCompany = async () =>
  {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post('/createotherProduct/', {
        product_name: product_name,
        total_no_of_barcodes: total_no_of_barcodes,
        product_subscription_fee: product_subscription_fee,
        code: code,
        med_subscription_fee: med_subscription_fee,
        variant: variant,
        status: 1,
      });

      toast.success(`product_name ${product_name} has been added successfully.`, {
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Other Product</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary"> product name </label>
                    <input
                      type="text"
                      id="product_name"
                      value={product_name}
                      onChange={(e) => setproduct_name(e.target.value)}
                      placeholder="Enter product name"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">total no of barcodes</label>
                    <input
                      type="number"
                      id="total_no_of_barcodes"
                      value={total_no_of_barcodes}
                      onChange={(e) => settotal_no_of_barcodes(e.target.value)}
                      placeholder="Enter total no of barcodes"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">product subscription fee</label>
                    <input
                      type="number"
                      id="product_subscription_fee"
                      value={product_subscription_fee}
                      onChange={(e) => setproduct_subscription_fee(e.target.value)}
                      placeholder="Enter product subscription fee"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">med subscription fee</label>
                    <input
                      type="number"
                      id="med_subscription_fee"
                      value={med_subscription_fee}
                      onChange={(e) => setmed_subscription_fee(e.target.value)}
                      placeholder="Enter med subscription fee"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">code</label>
                    <input
                      type="text"
                      id="code"
                      value={code}
                      onChange={(e) => setcode(e.target.value)}
                      placeholder="Enter product subscription fee "
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">variant</label>
                    <input
                      type="text"
                      id="variant"
                      value={variant}
                      onChange={(e) => setvariant(e.target.value)}
                      placeholder="Enter variant"
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
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    Add other product
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

export default AddotherProduct