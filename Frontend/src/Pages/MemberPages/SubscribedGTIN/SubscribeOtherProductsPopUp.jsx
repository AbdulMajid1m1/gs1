import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from '../../../components/Datatable/Datatable';
import { subscribeOtherProductsColumn } from '../../../utils/datatablesource';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTranslation } from 'react-i18next';
import newRequest from '../../../utils/userRequest';
import { Autocomplete, TextField } from '@mui/material';

const SubscribeOtherProductsPopUp = ({ isVisible, setVisibility }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [otherProductsOptions, setOtherProductsOptions] = useState([]);
  const [selectedOtherProducts, setSelectedOtherProducts] = useState([]);
 

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await newRequest.get('/otherProducts');
      console.log(response.data);
      setData(response?.data || []);
      setOtherProductsOptions(response?.data);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleCloseFinacePopup = () => {
    setVisibility(false);
  }


  const handleOtherProductsChange = (event, value) => {
    console.log(value);
    setSelectedOtherProducts(value);
  };

  return (
    <div>
      {/* create the popup */}
      {isVisible && (
        <div className="popup-overlay z-50 overflow-x-auto">
          <div className="popup-container h-auto sm:w-[60%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>


                <div className='flex gap-5 justify-center items-center flex-wrap'>
                  <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='w-full'
                  >
                    <DataTable data={data}
                      title={'Subscribe Other Products'}
                      columnsName={subscribeOtherProductsColumn}
                      loading={isLoading}
                      secondaryColor="secondary"
                    //   handleRowClickInParent={handleRowClickInParent}
                      buttonVisibility={false}
                      checkboxSelection={"disabled"}
                      actionColumnVisibility={false}
                      dropDownOptions={[
                        {
                          label: `${t('Activation')}`,
                          icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                          ,
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
                        Add More Other Products
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
                    />
                    </div>
                </div>

                {/* </div> */}


                <div className="w-full flex justify-start items-center mt-5 px-5">
                  <button
                    type="button"
                    className="px-7 py-2 rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseFinacePopup}
                  >
                    {t('Close')}
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

export default SubscribeOtherProductsPopUp