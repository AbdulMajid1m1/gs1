import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import "./MemberInvoicePopUp.css";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../../Contexts/LanguageContext';

// const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, fetchAllUserData, MemberbankSlip }) => {
const PendingApprovedPopUp = ({ isVisible, setVisibility, fetchAllUserData, fetchMemberHistoryData, refreshMemberInoviceData, userData,
  fetchRegisteredProductsData
}) => {
  const { selectedLanguage } = useLanguage();
  //   const gs1MemberInvoiceData = JSON.parse(sessionStorage.getItem("memberInvoiceData"));
  //   console.log(gs1MemberInvoiceData);
  const gs1MemberData = userData;
  // console.log(gs1MemberData)
  const [rejected, setRejected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('approved'); // Default to "Approved"
  const [loading, setLoading] = useState(false);
  const [memberInoviceData, setMemberInvoiceData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const { t } = useTranslation();

  const handleClosePendingApprovedPopup = () => {
    setVisibility(false);
  };

  const handleMemberInvoiceData = async () => {
    try {
      // const res = await newRequest.get(`/users/cart?transaction_id=${gs1MemberData?.transaction_id}`);
      const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?&user_id=${gs1MemberData?.id}&isDeleted=false`);

      // console.log(res.data);
      setMemberInvoiceData(res.data);
      // let total = 0;
      // res.data?.gtinSubscriptions.forEach((item) => {
      //   total += parseInt(item.price) + parseInt(item.gtin_subscription_total_price);
      // });

      // res.data?.otherProductSubscriptions.forEach((item) => {
      //   // add price and other_products_subscription_total_price
      //   total += parseInt(item.price) + parseInt(item.other_products_subscription_total_price);
      // });
      // console.log(total);
      // setTotalPrice(total);

    }
    catch (err) {
      // console.log(err);
    }


  }

  // const [cartItemsProducts, setCartItemsProducts] = useState([]);

  const handleDeleteRow = async (index, item) => {
    // console.log(item);


    try {
      const res = await newRequest.delete(`/gtinProducts/deleteotherProductsSubscriptionsFromAdmin?id=${item.id}&transaction_id=${gs1MemberData?.transaction_id}&product_id=${item?.product_id}`);
      // console.log(res.data);
      toast.success(res?.data?.message ?? `${('Cart item deleted successfully!')}`);

      // Remove the deleted item from the cart based on id  
      const updatedCartItems = memberInoviceData?.otherProductSubscriptions?.filter((cartItem) => cartItem.id !== item.id);

      setMemberInvoiceData((prev) => {
        return {
          ...prev,
          otherProductSubscriptions: updatedCartItems,
        };
      });



      // Append the deleted item to the list
      let deletedItemIds = [];
      const deletedItem = memberInoviceData?.otherProductSubscriptions?.find((cartItem) => cartItem.id === item.id);
      // if (deletedItem) {
      //   deletedItemIds.push({
      //     productID: deletedItem?.product?.id,
      //     productType: "other_products",
      //   });
      // }

      // setCartItemsProducts((prev) => [...prev, ...deletedItemIds]);

      // console.log(deletedItemIds);
      // console.log(cartItemsProducts);

    } catch (err) {
      // console.log(err);
      toast.error(err.response?.data?.error || `${t('Something went wrong!')}`);
    }
  };
  // create a useEffect to calculate the total price of the cart items
  useEffect(() => {
    let total = 0;
    memberInoviceData?.gtinSubscriptions?.forEach((item) => {
      total += parseInt(item.price) + parseInt(item.gtin_subscription_total_price);
    });

    memberInoviceData?.otherProductSubscriptions?.forEach((item) => {
      // add price and other_products_subscription_total_price
      total += parseInt(item.price) + parseInt(item.other_products_subscription_total_price);
    });
    // console.log(total);
    setTotalPrice(total);
  }, [memberInoviceData]);



  // Default to today's date
  const handleTodayLoader = () => {
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
  };

  useEffect(() => {
    handleMemberInvoiceData();
    handleTodayLoader();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedStartDate = new Date(startDate);
    formattedStartDate.setHours(0, 0, 0, 0);

    const approvedBody = {
      "userId": gs1MemberData?.id,
      "status": selectedStatus, // or approved
      selectedLanguage: selectedLanguage,
      approved_date: formattedStartDate.toISOString(),
    };
    if (rejected) {
      approvedBody.reject_reason = rejected;
    }



    try {
      const res = await newRequest.post('/users/sendInvoice', approvedBody);

      setLoading(false);
      toast.success(res?.data?.message || `${('Invoice status updated successfully!')}`);
      fetchAllUserData();
      // Close the popup
      handleClosePendingApprovedPopup();
      refreshMemberInoviceData();
      fetchMemberHistoryData();
      fetchRegisteredProductsData();
      //   }
    } catch (err) {
      // console.log(err);
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('Pending For Approve')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <label htmlFor="approvedRadio" className="text-secondary">{t('Invoice Status')}</label>
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
                        <label htmlFor="approvedRadio" className="text-secondary -mt-[3px]">{t('Approve')}</label>
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
                        <label htmlFor="rejectedRadio" className="text-secondary -mt-[3px]">{t('Reject')}</label>
                      </div>
                    </div>
                  </div>

                  {selectedStatus === "rejected" && (
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label htmlFor="field2" className="text-secondary">{t('Reason for Rejection')}</label>
                      <input
                        type="text"
                        id="field2"
                        onChange={(e) => setRejected(e.target.value)}
                        placeholder={`${t('Enter')} ${t('Reason for Rejection')} `}
                        required
                        className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                      />
                    </div>
                  )}

                </div>

                <div className="table-member-inoive px-4">
                  {/* show the transaction_id in very small  */}
                  <div className="flex justify-between items-center">
                    {/* <h2 className="text-secondary font-sans text-sm">Transaction ID: {gs1MemberInvoiceData?.transaction_id}</h2> */}
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>{t('PRODUCT')}</th>
                        <th>{t('REGISTRATION FEE')}</th>
                        <th>{t('YEARLY FEE ')}</th>
                        <th> {t('EXPIRY DATE')}</th>
                        <th>{t('PRICE')}</th>
                        <th> {t('DELETE')}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* {memberInoviceData.map((item, index) => {
                        const cartItems = JSON.parse(item.cart_items);
                        return cartItems.map((cartItem, cartIndex) => (
                          <tr key={cartIndex}>
                            <td>{cartItem.productName}</td>
                            <td>{cartItem.registration_fee}</td>
                            <td>{cartItem.yearly_fee}</td>
                            <td>{cartItem.price}</td>
                            <td className='hover:text-red-500 cursor-pointer' onClick={() => handleDeleteRow(cartIndex, item)}>
                              <DeleteSweepIcon />
                            </td>
                          </tr>
                        ));
                      })} */}
                      {memberInoviceData?.gtinSubscriptions?.map((item, index) => {
                        const expiryDate = new Date(item?.expiry_date).toLocaleDateString();
                        return (
                          <tr key={'gtin_product' + index}>
                            <td>{item?.gtin_product?.member_category_description}</td>
                            <td>{item?.price}</td>
                            <td>{item?.gtin_subscription_total_price}</td>
                            <td>{expiryDate}</td>
                            <td>{item?.gtin_subscription_total_price + item?.price}</td>
                            <td className='hover:text-gray-500 cursor-pointer text-gray-500 cursor-not-allowed' >
                              <DeleteSweepIcon style={{ color: "gray-500" }} />
                            </td>
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
                            <td className='hover:text-red-500 cursor-pointer' onClick={() => handleDeleteRow(index, item)}>
                              <DeleteSweepIcon />
                            </td>
                          </tr>
                        );
                      })}

                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-right font-bold">{t('Total')}:</td>
                        <td colSpan="2">{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex justify-center items-center">
                  <label className="font-body text-sm text-red-500 font-semibold text-center">Enter the Actual Bank Receipt Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleClosePendingApprovedPopup}
                  >
                    {t('Close')}
                  </button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    type="submit"
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Submit')}
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

export default PendingApprovedPopUp;
