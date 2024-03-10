import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import "./MemberInvoicePopUp.css";
import { Autocomplete, TextField } from '@mui/material';
import { useLanguage } from '../../../../Contexts/LanguageContext';

// const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, fetchAllUserData, MemberbankSlip }) => {
const DowngradePopUp = ({ isVisible, setVisibility, userData
}) => {
  const { selectedLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [memberInoviceData, setMemberInvoiceData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gtinBarcodes, setGtinBarcodes] = React.useState([])
  const [selectedGtinBarcodes, setSelectedGtinBarcodes] = useState("");
  const [gtinId, setGtinId] = useState([]);
  const [compareGtinBarcodes, setCompareGtinBarcodes] = React.useState([]);

  const handleCloseDowngradePopup = () => {
    setVisibility(false);
  };

  const handleMemberInvoiceData = async () => {
    try {
      const res = await newRequest.get(`/users/cart?transaction_id=${userData?.transaction_id}`);
      // console.log(res.data);
      setMemberInvoiceData(res.data);

      let total = 0;
      const cartItems = JSON.parse(res.data[0].cart_items); // Parse the cart_items string
      cartItems.forEach((item) => {
        total += parseInt(item.price); // Make sure to parse the price as an integer
      });
      setTotalPrice(total);
    }
    catch (err) {
      // console.log(err);
    }


  }


  const handleCompareGtinBarcodes = async () => {
    try {
      const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${userData?.id}&isDeleted=false`);
      const res2 = await newRequest.get('/gtinProducts');
      // console.log(res.data);
      // console.log(res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes);
      const firstApiTotalBarcodes =
        res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes || 0;

      setGtinId(res.data?.gtinSubscriptions[0]?.gtin_product?.id);
      // console.log(res.data?.gtinSubscriptions[0]?.gtin_product?.id);


      const filteredOptions = res2.data.filter(
        (option) => option.total_no_of_barcodes < firstApiTotalBarcodes
      );

      // console.log(res.data);
      // console.log(firstApiTotalBarcodes);
      // console.log(res2.data);

      // Set the filtered options in your state or use it directly
      // mmeber has two categotyes non_med_category and med_category selelct price based on category and setGtinBarcodes
      // member_registration_fee med_yearly_subscription_fee member_registration_fee gtin_yearly_subscription_fee

      // set price based on member category
      // console.log(filteredOptions);
      filteredOptions.forEach((item) => {
        if (userData?.membership_category === "non_med_category") {
          item.price = item.member_registration_fee,
            item.yearly_fee = item.gtin_yearly_subscription_fee
        } else if (userData?.membership_category === "med_category") {
          item.price = item.med_registration_fee,
            item.yearly_fee = item.med_yearly_subscription_fee
        }
      });
      // console.log(filteredOptions);


      setGtinBarcodes(filteredOptions);
    }
    catch (err) {
      // console.log(err);
    }
  }


  useEffect(() => {
    handleMemberInvoiceData();
    handleCompareGtinBarcodes();
  }, []);


  const handleSelectedGtinBarcodes = (event, value) => {
    // console.log(value);
    setSelectedGtinBarcodes(value);
  };

  sessionStorage.setItem("gtinId", gtinId);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await newRequest.put('/changeMembership/downgradeMemberSubscriptionRequest', {
        "user_id": userData?.id,
        "gtin_product_id": selectedGtinBarcodes?.id,
        "current_gtin_subscription_id": gtinId,
        selectedLanguage: selectedLanguage,
      });
      // console.log(res.data);
      {
        toast.success(res?.data?.message || "Upgrade request sent successfully!");
        setLoading(false);
        // Close the popup
        handleCloseDowngradePopup();
      }
    } catch (err) {
      // console.log(err);
      setLoading(false);
      toast.error(err.response?.data?.error || "Upgrade request failed!");
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
                <h2 className='text-secondary font-sans font-semibold text-2xl'>Downgrade Invoice</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <label htmlFor="field1" className="text-secondary">Select Barcodes</label>
                  <Autocomplete
                    id="field1"
                    options={gtinBarcodes}
                    value={selectedGtinBarcodes}
                    // getOptionLabel={(option) => option ? `GTIN: ${option.total_no_of_barcodes} - Price: ${option.price}` : ""}
                    getOptionLabel={(option) => option?.total_no_of_barcodes ? `${option?.member_category_description} - Barcodes: ${option?.total_no_of_barcodes || ""} - Yealy_fee: ${option?.yearly_fee} - Registeration_Fee ${option?.price}` : ""}
                    onChange={handleSelectedGtinBarcodes}
                    onInputChange={(event, value) => {
                      if (!value) {
                        // perform operation when input is cleared
                        // console.log("Input cleared");
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        autoComplete="off"
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          className: "text-white",
                        }}
                        InputLabelProps={{
                          ...params.InputLabelProps,
                          style: { color: "white" },
                        }}
                        className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                        placeholder="Select Downgrade Barcodes"
                        required
                      />
                    )}
                    classes={{
                      endAdornment: "text-white",
                    }}
                    sx={{
                      "& .MuiAutocomplete-endAdornment": {
                        color: "white",
                      },
                    }}
                  />
                </div>

                <div className="table-member-inoive px-4 pt-3">
                  {/* show the transaction_id in very small  */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-secondary font-sans text-sm">Transaction ID: {userData?.transaction_id}</h2>
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
                    onClick={handleCloseDowngradePopup}
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
                    Send Request
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

export default DowngradePopUp;
