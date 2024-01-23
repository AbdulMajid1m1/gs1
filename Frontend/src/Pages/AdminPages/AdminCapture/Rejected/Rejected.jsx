import React, { useEffect, useState } from 'react'
import { cardsRejectedColumn, usersRejectedColumn } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import DataTable3 from '../../../../components/Datatable/Datatable3'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import { I18nextProvider, useTranslation } from "react-i18next";
import newRequest from '../../../../utils/userRequest'
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const Rejected = () => {
    const { t, i18n } = useTranslation();
    const [cardsRejected, setCardsRejected] = useState([])
    const [cardsRejectedLoader, setCardsRejectedLoader] = useState(false)
    const [usersRejectedLoader, setUsersRejectedLoader] = useState(false)
    const [filteredUsersDetails, setFilteredUsersDetails] = useState([])

    const fetchCardRejectedData = async () => {
        setCardsRejectedLoader(true);
        try {
          const response = await newRequest.get(`/users/rejected`);
    
          console.log(response.data);
          setCardsRejected(response?.data || []);
          setCardsRejectedLoader(false);
    
        } catch (err) {
          console.log(err);
          setCardsRejectedLoader(false);
        }
      };

    //   const fetchFilteredMemberDetails = async (row) => {
    //     console.log(row);
    //     setUsersRejectedLoader(true);
    //     try {
    //       const response = await newRequest.get(`/users/rejectedCarts?transaction_id=${row[0]?.transaction_id}`);
    
    //       console.log(response.data);
    //     //   const cartItems = JSON.parse(response?.data[0]?.cart_items);
    //     //   console.log(cartItems);

    //       setFilteredUsersDetails(response?.data || []);
    //       setUsersRejectedLoader(false);
        
    //     } 
    //     catch (err) {
    //       console.log(err);
    //         setUsersRejectedLoader(false);
    //     }
    
    //   }
    

    useEffect(() => {
      fetchCardRejectedData();
    //   fetchUserRejectedData();
    }, []);

    
//   const handleRowClickInParent = (item) => {
//     console.log(item);
//     if (!item || item?.length === 0) {
//       // setTableSelectedRows(data)
//       // setFilteredData(data)
//       setFilteredUsersDetails(usersRejected)
//       return
//     }
//     fetchFilteredMemberDetails(item);
    
//     }
    
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
            <DashboardRightHeader title={t('Rejected')}/>
        </div>
       {/* Rejected Datagrid */}
        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

                <div style={{ marginLeft: '-25px', marginRight: '-25px' }}
                >
                  <DataTable data={cardsRejected}
                    title="Rejected User"d
                    columnsName={cardsRejectedColumn}
                    loading={cardsRejectedLoader}
                    secondaryColor="secondary"
                    // handleRowClickInParent={handleRowClickInParent}
                    checkboxSelection={"disabled"}
                    buttonVisibility={false}
                    actionColumnVisibility={false}
                    dropDownOptions={[
                      {
                        label: "Activation",
                        icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                        ,
                        // action: handleShowMemberInvoicePopup,
                      },

                    ]}
                    uniqueId="memberInvoiceId"

                  />
                </div>

                {/* <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable3 data={filteredUsersDetails}
                    title="Users Rejected"
                    columnsName={usersRejectedColumn}
                    loading={usersRejectedLoader}
                    secondaryColor="secondary"
                    buttonVisibility={false}
                    checkboxSelection={"disabled"}
                    actionColumnVisibility={false}
                    dropDownOptions={[
                      {
                        label: "View",
                        icon: (
                          <VisibilityIcon
                            fontSize="small"
                            color="action"
                            style={{ color: "rgb(37 99 235)" }}
                          />
                        ),
                        // action: handleView,
                      },
                    ]}
                    uniqueId="memberBankSlipId"

                  />
                </div> */}
              </div>

            {/* </div> */}
          </div>
        </div>

        </div>
    </div>
  )
}

export default Rejected