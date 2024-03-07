import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from '../../../components/Datatable/Datatable';
import { registeredmemberColumn, subscribeOtherProductsColumn } from '../../../utils/datatablesource';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTranslation } from 'react-i18next';
import newRequest from '../../../utils/userRequest';
import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import { selectedLanguage } from '../../../utils/config';

const SubscribeOtherProductsPopUp = ({ isVisible, setVisibility, refreshSubscriptionData }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [registeredProductsData, setRegisteredProductsData] = useState([]);
  const [registeredProductsLoader, setRegisteredProductsLoader] = useState(false);
  const [otherProductsOptions, setOtherProductsOptions] = useState([]);
  const [selectedOtherProducts, setSelectedOtherProducts] = useState([]);
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);


  const fetchRegisteredProductsData = async () => {
    setRegisteredProductsLoader(true);
    try {
      const response = await newRequest.get(`/gtinProducts/subcriptionsProducts?user_id=${memberData?.id}&isDeleted=false`);

      console.log(response.data);
      // Extract gtinSubscriptions data and flatten the nested gtin_product
      const gtinSubscriptionsData = response?.data?.gtinSubscriptions?.map(item => ({
        ...item,
        combined_description: item?.gtin_product?.member_category_description,
        subscription_limit: item.gtin_subscription_limit,
        Yearly_fee: item.gtin_subscription_total_price,
        product_identity: "gtin"
      }));

      const otherProductSubscriptionsData = response?.data?.otherProductSubscriptions?.map(item => ({
        ...item,
        combined_description: item?.product?.product_name,
        subscription_limit: item.other_products_subscription_limit,
        Yearly_fee: item.other_products_subscription_total_price,
        // product_identity: "gln"
        product_identity: item?.product?.product_name?.toLowerCase().includes('gln') ? 'gln' : 'otherProduct'
      }));

      // Combine gtinSubscriptions and otherProductSubscriptions
      const combinedData = [...gtinSubscriptionsData, ...otherProductSubscriptionsData];
      console.log(combinedData);
      setRegisteredProductsData(combinedData);
      setRegisteredProductsLoader(false)
      fetchData(combinedData);

    }
    catch (err) {
      console.log(err);
      setRegisteredProductsLoader(false)
    }
  };


  const fetchData = async (combinedData) => {
    try {
      const response = await newRequest.get('/otherProducts');
      console.log(response.data);

      // Filter out options that are already subscribed to
      const filteredOptions = response.data.filter(option => {
        // Check if the option's product_name matches any combined_description in registeredProductsData
        return !combinedData.some(item => item.combined_description === option.product_name);
      });
      console.log(filteredOptions);
      setOtherProductsOptions(filteredOptions);
    } catch (err) {
      console.log(err);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        userId: memberData?.id,
        selectedLanguage: selectedLanguage,
        subscriptions: selectedOtherProducts.map(product => ({
          productId: product?.id,
          productIdentifierName: product?.product_name
        }))
      };

      const response = await newRequest.post('/changeMembership/addMultipleOtherProductSubscriptionsAndGenerateInvoice', body);
      console.log(response.data);
      toast.success(response?.data?.message || 'Subscription Added')
      setLoading(false);
      handleCloseFinacePopup();
      refreshSubscriptionData();
    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || 'Something Went Wrong')
      setLoading(false);
    }
  }




  useEffect(() => {
    fetchRegisteredProductsData();

  }, [])


  const handleOtherProductsChange = (event, value) => {
    console.log(value);
    setSelectedOtherProducts(value);
  };




  const handleCloseFinacePopup = () => {
    setVisibility(false);
  }

  return (
    <div>
      {/* create the popup */}
      {isVisible && (
        <div className="popup-overlay z-50 overflow-x-auto">
          <div className="popup-container h-auto sm:w-[60%] w-full">
            <div className="popup-form w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex gap-5 justify-center items-center flex-wrap">
                  <div
                    style={{ marginLeft: "-11px", marginRight: "-11px" }}
                    className="w-full"
                  >
                    <DataTable
                      data={registeredProductsData}
                      title={`${t("Subscribe Other Products")}`}
                      columnsName={registeredmemberColumn(t)}
                      loading={registeredProductsLoader}
                      secondaryColor="secondary"
                      buttonVisibility={false}
                      checkboxSelection={"disabled"}
                      actionColumnVisibility={false}
                      dropDownOptions={[
                        {
                          label: `${t("Activation")}`,
                          icon: (
                            <SwapHorizIcon
                              fontSize="small"
                              color="action"
                              style={{ color: "rgb(37 99 235)" }}
                            />
                          ),
                          //   action: handleShowMemberInvoicePopup,
                        },
                      ]}
                      uniqueId="journalMovementClId"
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-1">
                    <label
                      className="text-secondary font-semibold"
                      htmlFor="other"
                    >
                      {" "}
                      {t("Add More Other Products")}
                    </label>
                    <Autocomplete
                      multiple
                      id="other"
                      options={otherProductsOptions}
                      required
                      getOptionLabel={(option) => {
                        if (i18n.language === "ar") {
                          return option?.name_ar || "";
                        } else {
                          return option?.product_name || "";
                        }
                      }}
                      value={selectedOtherProducts}
                      onChange={handleOtherProductsChange}
                      renderInput={(params) => (
                        <TextField
                          autoComplete="off"
                          {...params}
                          label={`${t("Other Products")}`}
                          placeholder={`${t("Enter")} ${t("Other Products")}`}
                          variant="outlined"
                        />
                      )}
                      // getOptionDisabled={getOptionDisabled}
                      getOptionDisabled={(option) => {
                        // Disable GLN options if any GLN product is present in registeredProductsData
                        const isGLNSubscribed = registeredProductsData.some(
                          (item) => item.product_identity === "gln"
                        );
                        return (
                          isGLNSubscribed &&
                          option.product_name.toLowerCase().includes("gln")
                        );
                      }}
                    />
                  </div>
                </div>

                {/* </div> */}

                <div className="w-full flex justify-between items-center mt-5 px-5">
                  <button
                    type="button"
                    className="px-7 py-2 rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseFinacePopup}
                  >
                    {t("Close")}
                  </button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                    type="submit"
                    disabled={loading}
                    className="ml-2"
                    endIcon={
                      loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : null
                    }
                  >
                    {t("Submit")}
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

export default SubscribeOtherProductsPopUp