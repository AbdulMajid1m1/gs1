import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

const Updatebrands = ({ isVisible, setVisibility, refreshBrandData }) => {
    // get this session data
    const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
    console.log(updateBrandData)
    const [companyName, setCompanyName] = useState(updateBrandData?.name || "");
    const [companyNameArabic, setCompanyNameArabic] = useState(updateBrandData?.name_ar || "");
    const [status, setStatus] = useState(updateBrandData?.status || "");
    const [brandCertificate, setBrandCertificate] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleCloseUpdatePopup = () => {
        setVisibility(false);
      };
    
    
    const handleFileChange = (e) => {
      // setError('');
      const file = e.target.files[0];
        if (file) {
          if (file.size <= 500 * 1024) {
            setBrandCertificate(file);
              setError(''); // Clear any previous error message
          } else {
            setError('File size should be 500KB or less');
            e.target.value = null;
          }
        }
      };


    const handleAddCompany = async (e) => {
        e.preventDefault();    
        setLoading(true);
  
      // create the formData object
      const formData = new FormData();
      formData.append('name', companyName);
      formData.append('name_ar', companyNameArabic);
      formData.append('status', status);
      formData.append('user_id', updateBrandData?.id);
      formData.append('companyID', updateBrandData?.companyID);
      formData.append('brandCertificate', brandCertificate);
  
      try {
        const response = await newRequest.put(`/brands/${updateBrandData?.id}`, formData , {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          });
  
        toast.success(`Brand ${companyName} with Arabic name "${companyNameArabic}" has been added successfully.`);
  
        console.log(response.data);
        refreshBrandData(updateBrandData);
        handleCloseUpdatePopup();
        setLoading(false);
  
  
      } catch (error) {
        toast.error(error?.response?.data?.error || 'Error');
  
        setLoading(false);
        console.log(error);
      }
  
  
    };
  
    

  return (
    <div>
         {isVisible && (
                   <div className="popup-overlay">
                     <div className="popup-container h-auto sm:w-[45%] w-full">
                       <div className="popup-form w-full">         
                        <form onSubmit={handleAddCompany} className='w-full'>
                         <h2 className='text-secondary font-sans font-semibold text-2xl'>Update Brands</h2>
                          <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                          
                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                              <label htmlFor="field1" className="text-secondary">Brand Name EN</label>
                                <input
                                  type="text"
                                  id="field1"
                                  value={companyName}
                                  onChange={(e) => setCompanyName(e.target.value)}
                                  placeholder="Enter Brand Name EN"
                                  required
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-0"
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                              <label htmlFor="field2" className="text-secondary">Brand Name AR </label>
                                <input
                                  type="text"
                                  id="field2"
                                  value={companyNameArabic}
                                  onChange={(e) => setCompanyNameArabic(e.target.value)}
                                  placeholder="Enter Brand Name AR"
                                  required
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                            </div>
                          </div>

                          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                              <label htmlFor="field2" className="text-secondary">Status</label>
                                <select
                                  type="text"
                                  id="field2"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                  required
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                >
                                  <option value="">-select-</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                          </div>

                          
                          <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-2">
                            <label htmlFor="field3" className="text-secondary">Upload Documents </label>
                              <input
                                type="file"
                                id="field3"
                                onChange={handleFileChange}
                                required
                                className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                              />
                              {error && <p className="text-red-500">{error}</p>}
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
                              SAVE
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

export default Updatebrands