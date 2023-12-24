import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import "./MemberInvoicePopUp.css";

const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, fetchAllUserData, fetchMemberHistoryData, fetchMemberbankSlipData
}) => {
  const gs1MemberInvoiceData = JSON.parse(sessionStorage.getItem("memberInvoiceData"));
  console.log(gs1MemberInvoiceData);
  //   const [status, setStatus] = useState("");
  const [rejected, setRejected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(gs1MemberInvoiceData?.status); // Default to "Approved"
  const [loading, setLoading] = useState(false);
  const [memberInoviceData, setMemberInvoiceData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCloseInvoicePopup = () => {
    setVisibility(false);
  };

  const handleMemberInvoiceData = async () => {
    try {
      const res = await newRequest.get(`/users/cart?transaction_id=${gs1MemberInvoiceData?.transaction_id}`);
      console.log(res.data);
      setMemberInvoiceData(res.data);

      let total = 0;
      const cartItems = JSON.parse(res.data[0].cart_items); // Parse the cart_items string
      cartItems.forEach((item) => {
        total += parseInt(item.price); // Make sure to parse the price as an integer
      });
      setTotalPrice(total);
    }
    catch (err) {
      console.log(err);
    }


  }

  useEffect(() => {
    handleMemberInvoiceData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const approvedBody = {
      status: selectedStatus,
    };

    const rejectBody = {
      status: selectedStatus,
      reject_reason: rejected,
    };

    // console.log(rejectBody);
    // console.log(approvedBody);
    try {
      // const res = await newRequest.put(`/memberDocuments/status/${gs1MemberInvoiceData?.id}`,
      //   { selectedStatus === "approved" ? approvedBody : rejectBody,
      // });

      const body = selectedStatus === "approved" ? approvedBody : rejectBody;
      console.log(status);
      const res = await newRequest.put(`/memberDocuments/status/${gs1MemberInvoiceData?.id}`, { ...body, status: selectedStatus });
      //   console.log(res.data);
      if (res.status === 200) {
        toast.success("Invoice Status Updated Successfully!");
        setLoading(false);
        refreshMemberInoviceData();
        fetchAllUserData();
        fetchMemberbankSlipData()

        fetchMemberHistoryData();
        // Close the popup
        handleCloseInvoicePopup();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response?.data?.error || "Something went wrong!");
    }
  };


  return (
    <div>
      {isVisible && (
        <div className="member-popup-overlay">
          <div className="member-popup-container h-auto sm:w-[45%] w-full">
            <div className="member-popup-form w-full">
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

                <div className="table-member-inoive px-4">
                  {/* show the transaction_id in very small  */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-secondary font-sans text-sm">Transaction ID: {gs1MemberInvoiceData?.transaction_id}</h2>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>REGISTRATION FEE</th>
                        <th>YEARLY FEE</th>
                        <th>PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberInoviceData.map((item, index) => {
                        const cartItems = JSON.parse(item.cart_items);
                        return cartItems.map((cartItem, cartIndex) => (
                          <tr key={cartIndex}>
                            <td>{cartItem.productName}</td>
                            <td>{cartItem.registration_fee}</td>
                            <td>{cartItem.yearly_fee}</td>
                            <td>{cartItem.price}</td>
                          </tr>
                        ));
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-right font-bold">Total:</td>
                        <td>{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
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
                    Submit
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
