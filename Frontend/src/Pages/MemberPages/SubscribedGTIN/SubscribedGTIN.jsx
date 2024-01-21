import React, { useContext, useEffect, useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../components/Datatable/Datatable'
import { registeredmemberColumn, subscribedGtinColumn } from '../../../utils/datatablesource'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../Contexts/DataTableContext'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../../utils/userRequest';
import Gs1GtinPopUp from './Gs1GtinPopUp';

const SubscribedGTIN = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registeredProductsData, setRegisteredProductsData] = useState([]);
  const [registeredProductsLoader, setRegisteredProductsLoader] = useState(false);
  const [data, setData] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [isUpgradePopupVisible, setIsUpgradePopupVisible] = useState(false); 
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  const [subType, setSubType] = useState("");
  const navigate = useNavigate();

  
  const fetchAllUserData = async () => {
    try {
      const response = await newRequest.get(`/users?id=${memberData?.id}`);
      console.log(response.data[0]);
      const data = response?.data[0] || [];
      setAllUserData(data);
      
      setIsLoading(false)

    }
    catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };


  const handleShowUpgradePopup = (row) => {
    setSubType("UPGRADE")
    setIsUpgradePopupVisible(true);
    console.log(row);
    // set this data in session storage
    // sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };
  const handleAddGtinClick = (row) => {
    setSubType("ADD GTIN")
    setIsUpgradePopupVisible(true);
    console.log(row);

  };
  const handleAddGlnClick = (row) => {
    setSubType("ADD GLN")
    sessionStorage.setItem("selectedGlnRowData", JSON.stringify(row));
    setIsUpgradePopupVisible(true);
    console.log(row);
  };
  // const filterDropdownOptions = (row, dropDownOptions) => {
  //   if (row.product_identity === 'gtin') {
  //     return dropDownOptions.filter(option => option.label === 'Upgrade' || option.label === 'Add GTIN' || option.label === 'Downgrade');
  //   } else if (row.product_identity === 'gln') {
  //     return dropDownOptions.filter(option => option.label === 'Add GLN');
  //   }
  //   return []; // No options available
  // };
  const filterDropdownOptions = (row, dropDownOptions) => {
    console.log(memberData);
    if (memberData?.status !== 'active') {
      // If product is not approved, disable all options
      return [];
    }

    if (row.product_identity === 'gtin') {
      return dropDownOptions.filter(option => option.label === 'Upgrade' || option.label === 'Add GTIN' || option.label === 'Downgrade');
    } else if (row.product_identity === 'gln') {
      return dropDownOptions.filter(option => option.label === 'Add GLN');
    }

    return []; // No options available
  };


  const handleShowDowngradePopup = (row) => {
    setSubType("DOWNGRADE")
    setIsUpgradePopupVisible(true);
    console.log(row);
    // set this data in session storage
    // sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };


  
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

    }
    catch (err) {
      console.log(err);
      setRegisteredProductsLoader(false)
    }
  };
  


  useEffect(() => {
    fetchAllUserData();
    fetchRegisteredProductsData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount
 
  const handleView = (row) => {
      console.log(row);
  }

  const handleDelete = (row) => {
    console.log(row);
  };


  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
          <div>
            <DashboardRightHeader title={"My GS1"}/>
          </div>


          <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              
              {/* Registered Products */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '24px' }}
              >
                <DataTable data={registeredProductsData}
                  title="Registered Products"
                  columnsName={registeredmemberColumn}
                  loading={registeredProductsLoader}
                  secondaryColor="secondary"
                  // actionColumnVisibility={false}
                  checkboxSelection={"disabled"}
                  getFilteredOptions={filterDropdownOptions}
                  dropDownOptions={[

                    {
                      label: "Upgrade",
                      icon: <UpgradeIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      action: handleShowUpgradePopup,

                    },
                    {
                      label: "Downgrade",
                      icon: <SwipeDownIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      action: handleShowDowngradePopup,

                    },
                    {
                      label: "Add GLN",
                      icon: <SwipeDownIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      action: handleAddGlnClick,

                    },
                    {
                      label: "Add GTIN",
                      icon: <SwipeDownIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      action: handleAddGtinClick,

                    },

                  ]}
                  uniqueId="registeredProductsTableId"

                />

                <div className='w-full flex justify-start px-6 pt-0 py-6 gap-2'>
                  <button
                    className={`font-sans font-normal text-sm px-4 py-1 rounded-full hover:bg-blue-600 ${allUserData?.isproductApproved == 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    disabled={allUserData.isproductApproved == 1}
                    // show disable cursor if status is not approved
                    style={{ cursor: allUserData.isproductApproved == 1 ? 'not-allowed' : 'pointer' }}
                  >
                    {allUserData?.isproductApproved == 1 ? 'Approved' : allUserData?.isproductApproved == 2 ? "Rejected" : "Pending For Approval"}
                  </button>
                  {/* <button
                      className='bg-green-500 font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'
                    >
                      Approved
                    </button> */}
                </div>

              </div>

                </div>
              </div>
            </div>




            {/* Subscribed Other Products */}
            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                    {/* Buttons */}
                    {/* <div className='h-auto w-full shadow-xl'> */}
                        <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3 pt-5'>
                            <button
                            //   onClick={handleShowCreatePopup}
                                className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700">
                                 Subscribe Other Product
                            </button>
                         </div>
                        {/* </div> */}

                    {/* DataGrid */}
                    <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-11px' }}>

                    <DataTable data={data} 
                      title="Subscribe Other Product"
                       columnsName={subscribedGtinColumn}
                        loading={isLoading}
                         secondaryColor="secondary"
                          // handleRowClickInParent={handleRowClickInParent}
                          actionColumnVisibility={false}

                    dropDownOptions={[
                        {
                        label: "Renew Membership",
                        icon: (
                            <VisibilityIcon
                            fontSize="small"
                            color="action"
                            style={{ color: "rgb(37 99 235)" }}
                            />
                        ),
                        action: handleView,
                        },
                        {
                          label: "Upgrade/Downgrade",
                          icon: (
                              <EditIcon
                              fontSize="small"
                              color="action"
                              style={{ color: "rgb(37 99 235)" }}
                              />
                          ),
                          action: handleDelete,
                        },
                        // {
                        //   label: "Delete",
                        //   icon: (
                        //       <DeleteIcon
                        //       fontSize="small"
                        //       color="action"
                        //       style={{ color: "rgb(37 99 235)" }}
                        //       />
                        //   ),
                        //   action: handleDelete,
                        // },

                    ]}
                    uniqueId="gtinMainTableId"

                    />
                    </div>

                </div>
              </div>
            </div>
      
            
          {/* Upgrade component with handle prop */}
         {isUpgradePopupVisible && (
          <Gs1GtinPopUp isVisible={isUpgradePopupVisible} setVisibility={setIsUpgradePopupVisible} userData={allUserData} subType={subType}/>
        )}

      </div>
    </div>
  )
}

export default SubscribedGTIN