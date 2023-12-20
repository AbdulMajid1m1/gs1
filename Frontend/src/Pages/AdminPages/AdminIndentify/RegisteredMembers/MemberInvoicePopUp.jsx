import React, { useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshBrandData }) => {
  const gs1MemberInvoiceData = JSON.parse(sessionStorage.getItem("memberInvoiceData"));
//   console.log(gs1MemberInvoiceData);
//   const [status, setStatus] = useState("");
  const [rejected, setRejected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(gs1MemberInvoiceData?.status); // Default to "Approved"
  const [loading, setLoading] = useState(false);

  const handleCloseInvoicePopup = () => {
    setVisibility(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      status: selectedStatus,
      reject_reason: selectedStatus === "approved" ? "approved" : rejected,
    };
    console.log(data);
    try {
      const res = await newRequest.put(`/memberDocuments/status/${gs1MemberInvoiceData?.id}`, data);
    //   console.log(res.data);
      if (res.status === 200) {
        toast.success("Invoice Status Updated Successfully!");
        setLoading(false);
        refreshBrandData();

        // Close the popup
        setVisibility(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response?.data?.message);
    }
  };


  return (
    <div>
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form onSubmit={handleSubmit} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>Update Member Invoice Details</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <label htmlFor="approvedRadio" className="text-secondary">Invoice Status </label>
                      <div className="flex flex-row gap-2">
                        <input
                          type="radio"
                          id="approvedRadio"
                          name="invoiceStatus"
                          value="approved"
                          className="border-1 w-4 h-4 border-[#8E9CAB] p-2 mb-3"
                          checked={selectedStatus === "approved"}
                          onChange={() => setSelectedStatus("approved")}
                        />
                        <label htmlFor="approvedRadio" className="text-secondary -mt-[3px]">Approved</label>
                      </div>
                      <div className="flex flex-row gap-2">
                        <input
                          type="radio"
                          id="rejectedRadio"
                          name="invoiceStatus"
                          value="rejected"
                          className="border-1 w-4 h-4 border-[#8E9CAB] p-2 mb-3"
                          checked={selectedStatus === "rejected"}
                          onChange={() => setSelectedStatus("rejected")}
                        />
                        <label htmlFor="rejectedRadio" className="text-secondary -mt-[3px]">Rejected</label>
                      </div>
                    </div>
                  </div>

                  {selectedStatus === "rejected" && (
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label htmlFor="field2" className="text-secondary">Reason for Rejection</label>
                      <input
                        type="text"
                        id="field2"
                        onChange={(e) => setRejected(e.target.value)}
                        placeholder="Enter reason for rejection"
                        required
                        className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                      />
                    </div>
                  )}

                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseInvoicePopup}
                  >
                    Close
                  </button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    type="submit"
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    Update Status
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberInvoicePopUp;
