import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

const Updatestate = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
    console.log(updateBrandData)
    const [name, setname] = useState(updateBrandData?.name || '');
    const [country_id, setcountry_id] = useState(updateBrandData?.country_id || 0);
    const [loading, setLoading] = useState(false);


    const handleCloseUpdatePopup = () => {
        setVisibility(false);
      };
    



const handleUpdateBrand = async () => {
  // console.log(brandUserId);
  setLoading(true);
 
  try {
    const response = await newRequest.put(`/address/updateStates/${updateBrandData?.id}`, {
      name: name,
      country_id: Number(country_id),
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
                            <h2 className='text-secondary font-sans font-semibold text-2xl'>Update state</h2>
                            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">state name</label>
                                <input
                                  type="text"
                                  id="name"
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                //   readOnly
                                  placeholder="Enter state name"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                              </div>

                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">country id</label>
                                <input
                                  type="number"
                                  id="country_id"
                                  value={country_id}
                                  onChange={(e) => setcountry_id(e.target.value)}
                                //   readOnly
                                  placeholder="Enter country id"
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
                                Update state
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

export default Updatestate