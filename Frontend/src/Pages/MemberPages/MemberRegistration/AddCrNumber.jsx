import React, { useState } from 'react'
import { toast } from 'react-toastify';
// import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import './AddCrNumber.css'

const AddCrNumber = ({ isVisible, setVisibility }) => {
    const [addCrNumber, setAddCrNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleCloseCreatePopup = () => {
        setVisibility(false);
      };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 10) {
          setError("Cr Number should be 10 digits or less");
        } else {
          setError("");
        }
        setAddCrNumber(inputValue.slice(0, 10));  // Limit input to 10 characters
    };
    
    
      
  return (
    <div>
          {/* create the post api popup */}
          {isVisible && (
                    <div className="popup-overlay">
                      <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full">         
                           <form className='w-full'>
                             <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Cr Number</h2>
                             <div className="flex flex-col sm:gap-3 gap-3 mt-1">
                               <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                 <label htmlFor="field1" className="text-secondary">Cr Number<span className='text-red-600'> *</span></label>
                                 <input
                                   type="number"
                                   id="field1"
                                   value={addCrNumber}
                                   onChange={handleInputChange}
                                //    onChange={(e) => setAddCrNumber(e.target.value)}
                                   placeholder="Enter Cr Number"
                                   className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                 />
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                               </div>
                             </div>


                             <div className="w-full flex justify-center items-center gap-8 mt-5">
                               <Button
                                 variant="contained"
                                 style={{ backgroundColor: '#FF693A', color: '#ffffff' }}
                                 className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                 onClick={handleCloseCreatePopup}
                               >
                                 Close
                               </Button>
                               <Button
                                  variant="contained"
                                  style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                //   onClick={handleAddCompany}
                                  disabled={loading}
                                  className="w-[70%] ml-2"
                                  endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                >
                                  Add Cr
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

export default AddCrNumber