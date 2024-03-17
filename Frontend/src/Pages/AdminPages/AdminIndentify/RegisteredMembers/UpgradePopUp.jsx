import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import "./MemberInvoicePopUp.css";
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../../Contexts/LanguageContext';

// const MemberInvoicePopUp = ({ isVisible, setVisibility, refreshMemberInoviceData, fetchAllUserData, MemberbankSlip }) => {
const UpgradePopUp = ({ isVisible, setVisibility, userData, subType, fetchMemberInvoiceData,
  fetchMemberHistoryData,
}) => {
  const { selectedLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [memberInoviceData, setMemberInvoiceData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gtinBarcodes, setGtinBarcodes] = React.useState([])
  const [selectedGtinBarcodes, setSelectedGtinBarcodes] = useState("");
  const [compareGtinBarcodes, setCompareGtinBarcodes] = React.useState([]);
  const [newSubscriptionDetails, setNewSubscriptionDetails] = useState([]);
  const { t } = useTranslation();
  const handleCloseUpgradePopup = () => {
    setVisibility(false);
  };

  const handleMemberInvoiceData = async () => {
    try {
      // const res = await newRequest.get(`/users/cart?transaction_id=${userData?.transaction_id}`);
      const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${userData?.id}&isDeleted=false`);
      // console.log(res.data);
      setMemberInvoiceData(res.data);

      let total = 0;







      res.data?.gtinSubscriptions.forEach((item) => {
        total += parseInt(item.price) + parseInt(item.gtin_subscription_total_price);
      });

      res.data?.otherProductSubscriptions.forEach((item) => {
        // add price and other_products_subscription_total_price
        total += parseInt(item?.price || 0) + parseInt(item.other_products_subscription_total_price);
      });
      // console.log(total);
      setTotalPrice(total);
    }
    catch (err) {
      // console.log(err);
    }


  }


  const handleCompareGtinBarcodes = async () => {
    try {
      if (subType === "UPGRADE" || subType === "DOWNGRADE") {
        const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${userData?.id}&isDeleted=false`);
        const res2 = await newRequest.get('/gtinProducts');
        // console.log(res.data);
        // console.log(res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes);
        const firstApiTotalBarcodes =
          res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes || 0;

        const filteredOptions = res2.data.filter(
          // if subType is UPGRADE then gtin_product.total_no_of_barcodes > firstApiTotalBarcodes else gtin_product.total_no_of_barcodes < firstApiTotalBarcodes
          (option) => subType === "UPGRADE" ? option.total_no_of_barcodes > firstApiTotalBarcodes : option.total_no_of_barcodes < firstApiTotalBarcodes
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
            console.log(item.yearly_fee);
          } else if (userData?.membership_category === "med_category") {
            item.price = item.med_registration_fee,
              item.yearly_fee = item.med_yearly_subscription_fee
            console.log(item.yearly_fee);
          }
        });
        // console.log(filteredOptions);


        setGtinBarcodes(filteredOptions);

      }
      if (subType === 'ADD GTIN') {
        try {
          const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${userData?.id}&isDeleted=false`);
          const res2 = await newRequest.get('/gtinUpgrade');
          // console.log(res.data);
          // console.log(res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes);
          const firstApiTotalBarcodes =
            res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes || 0;

          let filteredOptions = [];
          // console.log(firstApiTotalBarcodes)


          if (firstApiTotalBarcodes === 100) {
            filteredOptions = res2.data.filter(
              (option) => option.total_no_of_barcodes <= 1000
            );
          } else if (firstApiTotalBarcodes === 1000) {
            filteredOptions = res2.data.filter(
              (option) => option.total_no_of_barcodes <= 10000 && option.total_no_of_barcodes >= 500
            );
          } else if (firstApiTotalBarcodes <= 10000) {
            filteredOptions = res2.data.filter(
              (option) => option.total_no_of_barcodes >= 500 && option.total_no_of_barcodes <= 50000
            );
          } else if (firstApiTotalBarcodes <= 50000) {
            filteredOptions = res2.data.filter(
              (option) => option.total_no_of_barcodes >= 500 && option.total_no_of_barcodes <= 100000
            );
          } else if (firstApiTotalBarcodes === 100000) {
            filteredOptions = res2.data.filter(
              (option) => option.total_no_of_barcodes >= 500 && option.total_no_of_barcodes <= 100000
            );
          }

          // Set the filtered options in your state or use it directly
          setGtinBarcodes(filteredOptions);

          // console.log(res.data);
          // console.log(firstApiTotalBarcodes);
          // console.log(res2.data);
          // console.log(filteredOptions);

        }
        catch (err) {
          // console.log(err);
        }
      }
      if (subType === 'ADD GLN') {
        try {
          const res = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${userData?.id}&isDeleted=false`);
          const res2 = await newRequest.get('/gtinUpgrade/gln');
          // console.log(res.data);
          // console.log(res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes);
          const firstApiTotalBarcodes =
            res.data?.gtinSubscriptions[0]?.gtin_product?.total_no_of_barcodes || 0;

          // const filteredOptions = res2.data.filter(
          //   (option) => option.total_no_of_barcodes > firstApiTotalBarcodes
          // );

          // console.log(res.data);
          // console.log(firstApiTotalBarcodes);
          // console.log(res2.data);

          // Set the filtered options in your state or use it directly
          setGtinBarcodes(res2.data);
          // console.log(filteredOptions);
        }
        catch (err) {
          // console.log(err);
        }
      }
    }
    catch (err) {
      // console.log(err);
    }
  }


  useEffect(() => {
    handleMemberInvoiceData();
    handleCompareGtinBarcodes();
  }, []);


  const handleSelectedGtinBarcodes = async (event, value) => {
    // console.log(value);
    // console.log(userData?.id);
    // calll the api
    setSelectedGtinBarcodes(value)
    if (subType === "UPGRADE" || subType === "DOWNGRADE") {

      try {
        const res = await newRequest.post('/changeMembership/getInvoiceDetailsForUpgradeSubscription', {
          "userId": userData?.id,
          "newSubscriptionId": value?.id,
        });
        // console.log(res.data);
        setNewSubscriptionDetails(res.data);
      }
      catch (err) {
        // console.log(err);
        toast.error(err.response?.data?.error || "Failed to get invoice details!");
      }
    }

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (subType === "UPGRADE") {
        const res = await newRequest.put('/changeMembership/upgradeMembershipRequest', {
          "user_id": userData?.id,
          "new_subscription_product_Id": selectedGtinBarcodes?.id,
          subType: subType,
          selectedLanguage: selectedLanguage,

        });
        // console.log(res.data);
        toast.success(res?.data?.message || `${t('Upgrade request sent successfully!')}`);
        // }

        fetchMemberInvoiceData();
        fetchMemberHistoryData();

        // Close the popup
        handleCloseUpgradePopup();
      }
      if (subType === "DOWNGRADE") {
        const res = await newRequest.put('/changeMembership/downgradeMemberSubscriptionRequest', {
          "user_id": userData?.id,
          "new_subscription_product_Id": selectedGtinBarcodes?.id,
          selectedLanguage: selectedLanguage,


        });
        // console.log(res.data);
        toast.success(res?.data?.message || `${t('Upgrade request sent successfully!')}`);
        // }

        fetchMemberInvoiceData();
        // Close the popup
        handleCloseUpgradePopup();
      }

      if (subType === "ADD GTIN") {
        const res = await newRequest.post('/changeMembership/addAdditionalProductsRequest', {
          "user_id": userData?.id,
          "gtinUpgradeProductId": selectedGtinBarcodes?.id,
          selectedLanguage: selectedLanguage,
        });
        // console.log(res.data);
        toast.success(res?.data?.message || `${t('Upgrade request sent successfully!')}`);
        fetchMemberInvoiceData();
        handleCloseUpgradePopup();
      }

      if (subType === "ADD GLN") {
        // console.log(selectedGtinBarcodes?.id);
        // console.log(memberInoviceData?.otherProductSubscriptions);
        const selectGLnRow = JSON.parse(sessionStorage.getItem('selectedGlnRowData'));
        // console.log("selectGLnRow", selectGLnRow);
        const res = await newRequest.post('/changeMembership/addAdditionalGlnRequest', {
          "userId": userData?.id,
          "additionalGlnId": selectedGtinBarcodes?.id,
          otherProductSubscriptionId: selectGLnRow?.id,
          selectedLanguage: selectedLanguage,
        });
        // console.log(res.data);
        toast.success(res?.data?.message || `${t('Upgrade request sent successfully!')}`);
        fetchMemberInvoiceData();
        handleCloseUpgradePopup();
      }

    } catch (err) {
      // console.log(err);
      toast.error(err.response?.data?.error || "Upgrade request failed!");
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {isVisible && (
        <div className="member-popup-overlay overflow-x-auto">
          <div className="member-popup-container h-auto sm:w-[45%] w-full">
            <div className="member-popup-form w-full">
              {/* <form className='w-full'> */}
              <form onSubmit={handleSubmit} className='w-full'>
                <h2 className='text-secondary font-sans font-semibold text-2xl'>{subType}  {t('Subscription')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <label htmlFor="field1" className="text-secondary"> {t('Select new subscription')}</label>
                  <Autocomplete
                    id="field1"
                    options={gtinBarcodes}
                    value={selectedGtinBarcodes}
                    getOptionLabel={(option) => {
                      if (!option) {
                        return "";
                      } else if (subType === "ADD GTIN") {
                        return `GTIN: ${option?.total_no_of_barcodes || ""} - Price: ${option?.price}`;
                      } else if (subType === "ADD GLN") {
                        // Assuming you have appropriate fields for GLN
                        return `GLN: ${option?.total_no_of_gln || ""} - Price: ${option?.price}`;
                      } else {
                        console.log(option);
                        return `${option?.member_category_description} - Barcodes: ${option?.total_no_of_barcodes || ""} - Yearly_fee: ${option?.yearly_fee || ''} - Registration_Fee: ${option?.price || ""}`;
                      }
                    }}

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
                        placeholder={`${t('Select new subscription')}`}
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
                    <h1 className="text-secondary font-sans font-semibold text"> {t('Current Subscription')}</h1>
                    <h2 className="text-secondary font-sans text-sm"> {t('Transaction ID')}: {userData?.transaction_id}</h2>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>{t('PRODUCT')}</th>
                        <th> {t('REGISTRATION FEE')}</th>
                        <th> {t('YEARLY FEE')}</th>
                        <th> {t('EXPIRY DATE')}</th>
                        <th> {t('PRICE')}</th>

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
                        )
                      })}



                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-right font-bold"> {t('Total')}:</td>
                        <td>{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>


                {selectedGtinBarcodes !== "" && subType === "DOWNGRADE" && (
                  <div className="table-member-inoive px-4 pt-3">
                    {/* show the transaction_id in very small  */}
                    <div className="flex justify-between items-center">
                      <h1 className="text-secondary font-sans font-semibold text"> {t('New Subscription')}</h1>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>{t('PRODUCT')}</th>
                          <th> {t('REGISTRATION FEE')}</th>
                          <th> {t('YEARLY FEE')}</th>


                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td>{selectedGtinBarcodes?.member_category_description}</td>
                          <td>{selectedGtinBarcodes?.price}</td>
                          <td>{selectedGtinBarcodes?.yearly_fee}</td>
                        </tr>
                      </tbody>

                    </table>
                  </div>

                )}


                {selectedGtinBarcodes !== "" && subType === "UPGRADE" && (
                  <span>


                    <h1 className="text-secondary font-sans font-semibold text  px-4 pt-2"> {t('New Subscription Invoice Detail')}</h1>

                    <div className='mt-2'>
                      <div className='border border-secondary rounded-sm px-4 py-3'>
                        <p className='text-secondary text-xs font-sans font-medium py-1'
                        >
                          {t('REMAINING MONTHS FROM CURRENT SUBSCRITION')}: <span className='font-bold'>{newSubscriptionDetails?.remainingMonths}</span>
                        </p>
                        <p className='text-secondary text-xs font-sans font-medium py-1'
                        >
                          {t('REMAINING MONTHS FEE')} : <span className='font-bold'>{newSubscriptionDetails?.remainingMonthsFee}</span>
                        </p>
                        <p className='text-secondary text-xs font-sans font-medium py-1'
                        >
                          {t('NEW SUBSCRIPTION YEARLY FEE')} : <span className='font-bold'>{newSubscriptionDetails?.newSubscriptionYearlyFee}</span>
                        </p>
                        <p className='text-secondary text-xs font-sans font-medium py-1'
                        >
                          {t('REMAINING YEALY FEE')} : <span className='font-bold'>{newSubscriptionDetails?.remainingYearlyFee}</span>
                        </p>
                        <p className='text-secondary text-xs font-sans font-medium py-1'
                        >
                          {t('FINAL PRICE')} : <span className='font-bold'>{newSubscriptionDetails?.finalPrice}</span>
                        </p>
                      </div>
                    </div>
                    {/* <div className="table-member-inoive px-4 pt-1">
                      <div className="flex justify-between items-center">

                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>REMAINING MONTHS FROM CURRENT SUBSCRITION</th>
                            <th>REMAINING MONTHS FEE</th>
                            <th>NEW SUBSCRIPTION YEARLY FEE</th>
                            <th>REMAINING YEALY FEE</th>
                            <th>FINAL PRICE</th>

                          </tr>
                        </thead>
                        <tbody>


                          <tr>
                            <td>{newSubscriptionDetails?.remainingMonths}</td>
                            <td>{newSubscriptionDetails?.remainingMonthsFee}</td>
                            <td>{newSubscriptionDetails?.newSubscriptionYearlyFee}</td>
                            <td>{newSubscriptionDetails?.remainingYearlyFee}</td>
                            <td>{newSubscriptionDetails?.finalPrice}</td>
                          </tr>


                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="4" className="text-right font-bold">Total:</td>
                            <td>{newSubscriptionDetails?.finalPrice}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div> */}
                  </span>
                )}
                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpgradePopup}
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

export default UpgradePopUp;
