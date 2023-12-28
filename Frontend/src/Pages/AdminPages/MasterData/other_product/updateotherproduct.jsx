import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

const Updateotherproduct = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  console.log(updateBrandData)
  const [product_name, setproduct_name] = useState(updateBrandData?.product_name || '');
  const [total_no_of_barcodes, settotal_no_of_barcodes] = useState(updateBrandData?.total_no_of_barcodes || '');
  const [product_subscription_fee, setproduct_subscription_fee] = useState(updateBrandData?.product_subscription_fee || '');
  const [code, setcode] = useState(updateBrandData?.code || '');
  const [med_subscription_fee, setmed_subscription_fee] = useState(updateBrandData?.med_subscription_fee || '');
  const [variant, setvariant] = useState(updateBrandData?.variant || '');
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
      const response = await newRequest.put(`/updateotherproduct/${updateBrandData?.id}`, {
        product_name: product_name,
        total_no_of_barcodes: Number(total_no_of_barcodes),
        product_subscription_fee: Number(product_subscription_fee),
        code: code,
        med_subscription_fee: Number(med_subscription_fee),
        variant: variant,
        status: Number(status),
      });

      toast.success(response?.data?.message || 'other product updated successfully', {
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'>Update otherproduct</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className="text-secondary">product name</label>
                    <input
                      type="text"
                      id="product_name"
                      value={product_name}
                      onChange={(e) => setproduct_name(e.target.value)}
                      //   readOnly
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
                      //   readOnly
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
                      //   readOnly
                      placeholder="Enter product subscription fee"
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
                      //   readOnly
                      placeholder="Enter code"
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
                      //   readOnly
                      placeholder="Enter med subscription fee"
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
                      //   readOnly
                      placeholder="Enter variant"
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className="text-secondary">
                      Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                    >
                      <option value="0">inactive</option>
                      <option value="1">active</option>
                    </select>
                  </div>
                </div>



                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    Close
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
                    Update otherproduct
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

export default Updateotherproduct