import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import "./MemberInvoicePopUp.css";

// const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, fetchAllUserData, MemberbankSlip }) => {
const FinanceMemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, userData
}) => {
  const gs1MemberInvoiceData = JSON.parse(sessionStorage.getItem("memberInvoiceData"));
  console.log(gs1MemberInvoiceData);
  const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
  // console.log(gs1MemberData)
  const gtinId = sessionStorage.getItem("gtinId");
  console.log(gtinId);
  //   const [status, setStatus] = useState("");
  const [rejected, setRejected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('approved'); // Default to "Approved"
  const [loading, setLoading] = useState(false);
  const [memberInoviceData, setMemberInvoiceData] = useState([]);
  const [typeOfPayment, setTypeOfPayment] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCloseInvoicePopup = () => {
    setVisibility(false);
  };

  // const handleMemberInvoiceData = async () => {
  //   try {
  //     const res = await newRequest.get(`/users/cart?transaction_id=${gs1MemberData?.transaction_id}`);
  //     console.log(res.data);
  //     setMemberInvoiceData(res.data);

  //     let total = 0;
  //     const cartItems = JSON.parse(res.data[0].cart_items); // Parse the cart_items string
  //     cartItems.forEach((item) => {
  //       total += parseInt(item.price); // Make sure to parse the price as an integer
  //     });
  //     setTotalPrice(total);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }


  // }

  const handleMemberInvoiceData = async () => {
    if (gs1MemberInvoiceData?.type === "invoice" || gs1MemberInvoiceData?.type === "renewal_invoice") {
      try {

        // check invoice type
        // const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${userData?.id}&isDeleted=false`);
        const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?&user_id=${gs1MemberInvoiceData?.user_id}&isDeleted=false`);
        console.log(res.data);
        setMemberInvoiceData(res.data);

        let total = 0;
        res.data?.gtinSubscriptions.forEach((item) => {
          total += parseInt(item.price) + parseInt(item.gtin_subscription_total_price);
        });

        res.data?.otherProductSubscriptions.forEach((item) => {
          // add price and other_products_subscription_total_price
          total += parseInt(item.price) + parseInt(item.other_products_subscription_total_price);
        });
        console.log(total);
        setTotalPrice(total);
      }
      catch (err) {
        console.log(err);
      }
    }
    if (gs1MemberInvoiceData?.type === "upgrade_invoice" || gs1MemberInvoiceData?.type === "downgrade_invoice" || gs1MemberInvoiceData?.type === "additional_gtin_invoice") {
      try {
        const res = await newRequest.get(`/changeMembership/upgradeMembershipCarts?transaction_id=${gs1MemberInvoiceData?.transaction_id}`);
        console.log(res.data);
        let data = res.data[0];


        let cart = JSON.parse(data?.cart);
        console.log(cart);
        setTypeOfPayment(cart?.typeOfPayment);
        let total = 0;
        const cartItems = cart?.cart_items?.map((item) => ({
          productName: item?.productName,
          registrationFee: item?.registration_fee,
          yearlyFee: item?.yearly_fee,
          ...(gs1MemberInvoiceData?.type === "downgrade_invoice" && { newDowngradeYearlyFee: item?.newDowngradeYearlyFee })
        }));

        total = cartItems?.reduce((acc, item) => acc + item?.registrationFee + item?.yearlyFee, 0);
        console.log(total);
        setMemberInvoiceData(cartItems);
      setTotalPrice(total);
    }
      catch (err) {
      console.log(err);

    }
  }

  // if (gs1MemberInvoiceData?.type === "downgrade_invoice") {
  //   try {
  //     const res = await newRequest.get(`/changeMembership/upgradeMembershipCarts?transaction_id=${gs1MemberInvoiceData?.transaction_id}`);
  //     console.log(res.data);
  //     setMemberInvoiceData(res.data);

  //     let total = 0;
  //     res.data?.gtinSubscriptions.forEach((item) => {
  //       total += parseInt(item.price) + parseInt(item.gtin_subscription_total_price);
  //     });

  //     res.data?.otherProductSubscriptions.forEach((item) => {
  //       // add price and other_products_subscription_total_price
  //       total += parseInt(item.price) + parseInt(item.other_products_subscription_total_price);
  //     });
  //     console.log(total);
  //     setTotalPrice(total);
  //   }
  //   catch (err) {
  //     console.log(err);

  //   }
  // }

  if (gs1MemberInvoiceData?.type === "additional_gln_invoice") {
    try {
      const res = await newRequest.get(`/changeMembership/addGlnCarts?transaction_id=${gs1MemberInvoiceData?.transaction_id}`);
      console.log(res.data);
      let data = res.data[0];


      let cart = JSON.parse(data?.cart);
      console.log(cart);
      setTypeOfPayment(cart?.typeOfPayment)
      let total = 0;
      const cartItems = cart?.cart_items?.map((item) => ({
        productName: item?.productName,
        registrationFee: item?.registration_fee,
        yearlyFee: item?.yearly_fee
      }));

      total = cartItems?.reduce((acc, item) => acc + item?.registrationFee + item?.yearlyFee, 0);
      console.log(total)
      setMemberInvoiceData(cartItems)
      setTotalPrice(total);
    }
    catch (err) {
      console.log(err);

    }
  }


}


useEffect(() => {
  handleMemberInvoiceData();
}, []);


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log(gs1MemberInvoiceData);


  const approvedBody = {
    status: selectedStatus,
  };

  const rejectBody = {
    status: selectedStatus,
    reject_reason: rejected,
  };

  const changeGtinSub = {
    userId: gs1MemberInvoiceData?.user_id,
    transactionId: gs1MemberInvoiceData?.transaction_id,
    invoiceType: gs1MemberInvoiceData?.type
  }
  const downgradeInvoiceBody = {
    userId: gs1MemberInvoiceData?.user_id,
    transactionId: gs1MemberInvoiceData?.transaction_id,
  }

  const addGtin = {
    userId: gs1MemberInvoiceData?.user_id,
    // pass selected row transaction id
    transactionId: gs1MemberInvoiceData?.transaction_id,
  }
  const addGln = {
    userId: gs1MemberInvoiceData?.user_id,
    transactionId: gs1MemberInvoiceData?.transaction_id,
  }

  // console.log(upgrade_invoice);


  let apiEndpoint = "";
  let requestBody = {};

  if (gs1MemberInvoiceData?.type === "invoice") {
    apiEndpoint = `/memberDocuments/status/${gs1MemberInvoiceData?.id}`;
    requestBody = selectedStatus === "approved" ? approvedBody : rejectBody;
  }
  else if (gs1MemberInvoiceData?.type === "renewal_invoice") {
    apiEndpoint = `/changeMembership/changeRenewStatus/${gs1MemberInvoiceData?.id}`;
    requestBody = selectedStatus === "approved" ? approvedBody : rejectBody;
  }
  else if (gs1MemberInvoiceData?.type === "upgrade_invoice") {
    apiEndpoint = `/changeMembership/approveMembershipRequest`;
    requestBody = changeGtinSub;
  }
  else if (gs1MemberInvoiceData?.type === "downgrade_invoice") {
    apiEndpoint = `/changeMembership/approveDowngradeMembershipRequest`;
    requestBody = downgradeInvoiceBody;
  }
  else if (gs1MemberInvoiceData?.type === "additional_gtin_invoice") {
    apiEndpoint = `/changeMembership/approveAdditionalProductsRequest`;
    requestBody = addGtin;
  }

  else if (gs1MemberInvoiceData?.type === "additional_gln_invoice") {
    apiEndpoint = `/changeMembership/approveAdditionalGlnRequest`;
    requestBody = addGln;
  }




  try {
    const res = await newRequest.put(apiEndpoint, { ...requestBody });
    // console.log(res.data);
    if (res.status === 200) {
      if (selectedStatus === "rejected") {
        toast.info("Member Account Rejected Successfully");
      } else {
        toast.success(res?.data?.message || "User Activated Successfully!");
      }

      setLoading(false);
      refreshMemberInoviceData();
      // MemberbankSlip();
      // fetchAllUserData();
      // fetchMemberbankSlipData();
      // fetchRegisteredProductsData();

      // fetchMemberHistoryData();
      // Close the popup
      handleCloseInvoicePopup();
    }
  } catch (err) {
    console.log(err);

    toast.error(err.response?.data?.error || "Something went wrong!");
    setLoading(false);
  }
};
// console.log(err);
// setLoading(false);
// toast.error(err.response?.data?.error || "Something went wrong!");
// }
// };


return (
  <div>
    {isVisible && (
      <div className="member-popup-overlay">
        <div className="member-popup-container h-auto sm:w-[45%] w-full">
          <div className="member-popup-form w-full">
            <form onSubmit={handleSubmit} className='w-full'>
              <h2 className='text-secondary font-sans font-semibold text-2xl'>Pending Invoice for Approval</h2>
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
                      <label htmlFor="approvedRadio" className="text-secondary -mt-[3px]">Approve</label>
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
                      <label htmlFor="rejectedRadio" className="text-secondary -mt-[3px]">Reject</label>
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


                {gs1MemberInvoiceData?.type === "invoice" || gs1MemberInvoiceData?.type === "renewal_invoice" ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-secondary font-sans text-sm">Transaction ID: {gs1MemberInvoiceData?.transaction_id}</h2>
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th>PRODUCT</th>
                          <th>REGISTRATION FEE</th>
                          <th>YEARLY FEE</th>
                          <th>EXPIRY DATE</th>
                          <th>PRICE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberInoviceData?.gtinSubscriptions?.map((item, index) => {
                          const expiryDate = new Date(item?.expiry_date).toLocaleDateString();
                          return (
                            <tr key={'gtin_product' + index}>
                              <td>{item?.gtin_product?.member_category_description}</td>
                              <td>{item?.price}</td>
                              <td>{item?.gtin_subscription_total_price}</td>
                              <td>{expiryDate}</td>
                              <td>{item?.gtin_subscription_total_price + item?.price}</td>
                            </tr>
                          );
                        })}
                        {memberInoviceData?.otherProductSubscriptions?.map((item, index) => {
                          const expiryDate = new Date(item?.expiry_date).toLocaleDateString();
                          return (
                            <tr key={'other_products' + index}>
                              <td>{item?.product?.product_name}</td>
                              <td>{item?.price}</td>
                              <td>{item?.other_products_subscription_total_price}</td>
                              <td>{expiryDate}</td>
                              <td>{item?.other_products_subscription_total_price + item?.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="4" className="text-right font-bold">Total:</td>
                          <td>{totalPrice}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-secondary font-sans text-sm mb-2">TRANSACTION ID: <strong>{gs1MemberInvoiceData?.transaction_id}</strong></h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-secondary font-sans text-sm mb-2">TYPE OF PAYMENT: <strong>{typeOfPayment}</strong></h2>
                    </div>
                    {gs1MemberInvoiceData?.type === "downgrade_invoice" && (
                      <div className="flex justify-between items-center">
                        <h2 className="text-secondary font-sans text-sm mb-2">New Subscription Yearly Fee: <strong>{memberInoviceData?.[0]?.newDowngradeYearlyFee}</strong></h2>
                      </div>
                    )}
                    <table>
                      <thead>
                        <tr>
                          <th>PRODUCT</th>
                          <th>REGISTRATION FEE</th>
                          {gs1MemberInvoiceData?.type !== "downgrade_invoice" && <th>YEARLY FEE</th>}
                          <th>{gs1MemberInvoiceData?.type === "downgrade_invoice" ? "TOTAL" : "SUB TOTAL"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberInoviceData?.map((item, index) => {
                          return (
                            <tr key={'gtin_product' + index}>
                              <td>{item?.productName}</td>
                              <td>{item?.registrationFee}</td>
                              {gs1MemberInvoiceData?.type !== "downgrade_invoice" && <td>{item?.yearlyFee}</td>}
                              <td>{gs1MemberInvoiceData?.type === "downgrade_invoice" ? item?.registrationFee + item?.yearlyFee : item?.registrationFee + item?.yearlyFee}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      {gs1MemberInvoiceData?.type !== "downgrade_invoice" && (
                        <tfoot>
                          <tr>
                            <td colSpan="3" className="text-right font-bold">Total:</td>
                            <td>{totalPrice}</td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </>
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

export default FinanceMemberInvoicePopUp;
