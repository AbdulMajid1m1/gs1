import React, { useState } from 'react'
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';

const Addcrnumber = ({ isVisible, setVisibility, refreshBrandData }) => {
    const [cr, setcr] = useState('');
    const [activity, setactivity] = useState('');
    const [status, setstatus] = useState('');
    
    const handleCloseCreatePopup = () => {
        setVisibility(false);
      };
    

    const handleAddCompany = async () => {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post('/crs/', {
        cr: cr,
        activity: activity,
        status: 1,
      });

      toast.success(`cr ${cr} has been added successfully.`, {
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
                             <h2 className='text-secondary font-sans font-semibold text-2xl'>Add Cr number</h2>
                             <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                               <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                 <label htmlFor="field1" className="text-secondary">cr</label>
                                 <input
                                   type="text"
                                   id="cr"
                                   value={cr}
                                   onChange={(e) => setcr(e.target.value)}
                                   placeholder="Enter cr "
                                   className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                 />
                               </div>

                               <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                 <label htmlFor="field1" className="text-secondary">activity</label>
                                 <input
                                   type="text"
                                   id="activity"
                                   value={activity}
                                   onChange={(e) => setactivity(e.target.value)}
                                   placeholder="Enter activity "
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
                                 Add Cr number
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

export default Addcrnumber