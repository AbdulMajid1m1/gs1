import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import "./MemberInvoicePopUp.css";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../Contexts/LanguageContext';


// const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, fetchAllUserData, MemberbankSlip }) => {
const MemberRenewPopUp = ({ isVisible, setVisibility,
}) => {
  const { selectedLanguage } = useLanguage();
  //   const gs1RegesteredMembersData = JSON.parse(sessionStorage.getItem("registeredMemberRowData"));
  //   console.log(gs1RegesteredMembersData);
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  console.log(memberData)

  const expiryDate = new Date(memberData.gcp_expiry);
  const newExpiryDate = new Date(expiryDate);
  newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
  const formattedExpiryDate = expiryDate.toLocaleDateString();
  const formattedNewExpiryDate = newExpiryDate.toLocaleDateString();
  const { t } = useTranslation();

  //   const [status, setStatus] = useState("");
  //   const [rejected, setRejected] = useState("");
  //   const [selectedStatus, setSelectedStatus] = useState('approved'); // Default to "Approved"
  const [loading, setLoading] = useState(false);
  const [memberInoviceData, setMemberInvoiceData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCloseRenewPopup = () => {
    setVisibility(false);
  };

  // const handleMemberInvoiceData = async () => {
  //   try {
  //     const res = await newRequest.get(`/users/cart?transaction_id=${memberData?.transaction_id}`);
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
    try {
      const res = await newRequest.get(
        `/gtinProducts/subcriptionsProducts?&user_id=${memberData?.id}&isDeleted=false`
      );

      
      // console.log(res.data);
      let data = res.data;
      data.gtinSubscriptions[0].price = 0;
      setMemberInvoiceData(data);
      console.log(data);
      let total = 0;
      res.data?.gtinSubscriptions.forEach((item) => {
        total +=
          parseInt(item.price) + parseInt(item.gtin_subscription_total_price);
      });

      res.data?.otherProductSubscriptions.forEach((item) => {
        // add price and other_products_subscription_total_price
        total +=
          parseInt(item.price) +
          parseInt(item.other_products_subscription_total_price);
      });
      // console.log(total);
      setTotalPrice(total);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    handleMemberInvoiceData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await newRequest.post('/changeMembership/renewRequest', {
        "user_id": memberData?.id,
        selectedLanguage: selectedLanguage,
      });
      console.log(res.data);
      {
        toast.success(res?.data?.message || `${t('Renew request sent successfully!')}`);
        setLoading(false);
        // Close the popup
        handleCloseRenewPopup();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response?.data?.error || `${t('Renew request failed!')}`);
    }
  };


  return (
    <div>
      {isVisible && (
        <div className="member-popup-overlay">
          <div className="member-popup-container h-auto sm:w-[45%] w-full">
            <div className="member-popup-form w-full">
              {/* <form className='w-full'> */}
              <form onSubmit={handleSubmit} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'> {t('Renew Invoice')}</h2>
                <div className="table-member-inoive px-4">
                  {/* show the transaction_id in very small  */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-secondary font-sans text-sm"> {t('Transaction ID')}: {memberData?.transaction_id}</h2>
                    <div>
                      <h2 className="text-secondary font-sans text-sm"> {t('GCP Expiry')}: {formattedExpiryDate}</h2>
                      <h2 className="text-secondary font-sans text-sm"> {t('New GCP')}: {formattedNewExpiryDate}</h2>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th> {t('PRODUCT')}</th>
                        <th> {t('REGISTRATION FEE')}</th>
                        <th> {t('YEARLY FEE')}</th>
                        <th> {t('PRICE')}</th>
                      </tr>
                    </thead>
                    <tbody>
                    {memberInoviceData?.gtinSubscriptions?.map(
                        (item, index) => {
                          // const expiryDate = new Date(item?.expiry_date).toLocaleDateString();
                          return (
                            <tr key={index}>
                              <td>{item?.gtin_product?.member_category_description}</td>
                              <td>{item?.price}</td>
                              <td>{item?.gtin_subscription_total_price}</td>
                              {/* <td>{expiryDate}</td> */}
                              <td>{item?.gtin_subscription_total_price + item?.price}</td>
                            </tr>
                          );
                        }
                      )}
                      {memberInoviceData?.otherProductSubscriptions?.map(
                        (item, index) => {
                          // const expiryDate = new Date(item?.expiry_date).toLocaleDateString();
                          return (
                            <tr key={"other_products" + index}>
                              <td>{item?.product?.product_name}</td>
                              <td>{item?.price}</td>
                              <td>{item?.other_products_subscription_total_price}</td>
                              {/* <td>{expiryDate}</td> */}
                              <td>{item?.other_products_subscription_total_price + item?.price}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-right font-bold"> {t('Total')}:</td>
                        <td>{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseRenewPopup}
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
                    {t('Send Request')}
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

export default MemberRenewPopUp;
