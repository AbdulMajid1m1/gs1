import React, { useState } from 'react'
import { toast } from 'react-toastify';
// import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import './TicketPopUp.css'
import { useTranslation } from 'react-i18next';
import newRequest from '../../../utils/userRequest';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';

const UpdateTicketPopUp = ({ isVisible, setVisibility, refreshBrandData }) => {
  const { t } = useTranslation();
  // get the sesstion data
  const gs1MemberData = JSON.parse(sessionStorage.getItem("updateTicketRow"));
    const [Title, setTitle] = useState(gs1MemberData?.title || "");
    const [Description, setDescription] = useState(gs1MemberData?.description || '');
    // console.log(gs1MemberData)
    const [loading, setLoading] = useState(false);
  const [selecteddocument, setSelecteddocument] = useState(imageLiveUrl(gs1MemberData?.document) || null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelecteddocument(file);
  };
    
    const handleCloseUpdatePopup = () => {
        setVisibility(false);
      };
    
  const emailget = sessionStorage.getItem("email");
  const useriddata = sessionStorage.getItem("MemberUserId");
       const handleUpdateBrand = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", Title);
        formData.append("description", Description);
        formData.append("document", selecteddocument);
        // formData.append("assignedTo", 1);
        formData.append("status", 0);
        // formData.append('status', Number(status));
        try {
            const response = await newRequest.put(`/updatehelp_desks/${gs1MemberData?.id}`, formData);

            toast.success(response?.data?.message || `${t('Help Desk')} ${t('has been')} ${t('Updated Successfully')}.`, {
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
            toast.error(error?.response?.data?.error || `${t('Something went wrong')}`, {
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
          {/* create the post api popup */}
          {isVisible && (
                    <div className="popup-overlay z-50">
                      <div className="popup-container h-auto sm:w-[45%] w-full">
                        <div className="popup-form w-full">         
                           <form className='w-full'>
                             <h2 className='text-secondary font-sans font-semibold text-2xl'>{t('Update Ticket')}</h2>
                             <div className="flex flex-col sm:gap-3 gap-3 mt-1">
                               <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                 <label htmlFor="field1" className="text-secondary">{t('Title')}<span className='text-red-600'> *</span></label>
                                 <input
                                   type="text"
                                   id="field1"
                                   value={Title}
                                   onChange={(e) => setTitle(e.target.value)}
                                            placeholder={`${t('Enter')} ${t('Title')}`}
                                   className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                 />
                               </div>

                               <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 -mt-3">
                                 <label htmlFor="field2" className="text-secondary">{t('Description')}<span className='text-red-600'> *</span> </label>
                                 <textarea
                                   type="text"
                                   id="field2"
                                   value={Description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   placeholder={`${t('Enter')}${t('Description')}`}
                                   className="border-1 w-full h-28 rounded-sm border-[#8E9CAB] p-2 mb-3"
                                 />
                               </div>
                             </div>


                             <div className="flex flex-col sm:gap-3 gap-3">
                               <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                 <label htmlFor="field3" className="text-secondary">{t('Documents/Screenshot')}<span className='text-red-600'> *</span></label>
                                 <input
                                   type="file"
                                   id="field3"
                                  //  value={Title}
                                  //  onChange={(e) => setTitle(e.target.value)}
                                  //  placeholder="Enter Title"
                                   onChange={handleFileChange}
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
                                 onClick={handleAddCompany}
                                 className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                               >
                                 Add Brand
                               </button> */}
                               <Button
                                  variant="contained"
                                  style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                                onClick={handleUpdateBrand}
                                  disabled={loading}
                                  className="w-[70%] ml-2"
                                  endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                                >
                                 {t('Save')}
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

export default UpdateTicketPopUp