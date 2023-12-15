import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

const Updatecountryofsale = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
    console.log(updateBrandData)
    const [Alpha2, setAlpha2] = useState(updateBrandData?.Alpha2 || '');
    const [Alpha3, setAlpha3] = useState(updateBrandData?.Alpha3 || '');
    const [country_code_numeric3, setcountry_code_numeric3] = useState(updateBrandData?.country_code_numeric3 || '');
    const [country_name, setcountry_name] = useState(updateBrandData?.country_name || '');
    
    const [loading, setLoading] = useState(false);


    const handleCloseUpdatePopup = () => {
        setVisibility(false);
      };
    



const handleUpdateBrand = async () => {
  // console.log(brandUserId);
  setLoading(true);
 
  try {
    const response = await newRequest.put(`/updatecountryofsale/${updateBrandData?.id}`, {
        Alpha2: Alpha2,
        Alpha3: Alpha3,
        country_code_numeric3: country_code_numeric3,
        country_name: country_name,
      
    });

    toast.success(response?.data?.message || 'Status updated successfully', {
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
                            <h2 className='text-secondary font-sans font-semibold text-2xl'>Update country</h2>
                            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">country name</label>
                                <input
                                  type="text"
                                  id="Alpha2"
                                  value={Alpha2}
                                  onChange={(e) => setAlpha2(e.target.value)}
                                //   readOnly
                                  placeholder="Enter country name english"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                              </div>

                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">Alpha3</label>
                                <input
                                  type="text"
                                  id="Alpha3"
                                  value={Alpha3}
                                  onChange={(e) => setAlpha3(e.target.value)}
                                //   readOnly
                                  placeholder="Enter Alpha3"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                                  </div>
                                  
                                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">country code</label>
                                <input
                                  type="text"
                                  id="country_code_numeric3"
                                  value={country_code_numeric3}
                                  onChange={(e) => setcountry_code_numeric3(e.target.value)}
                                //   readOnly
                                  placeholder="Enter country code"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                                  </div>
                                  
                                   <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">country Name</label>
                                <input
                                  type="text"
                                  id="country_name"
                                  value={country_name}
                                  onChange={(e) => setcountry_name(e.target.value)}
                                //   readOnly
                                  placeholder="Enter country Name"
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
                                Update country
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

export default Updatecountryofsale