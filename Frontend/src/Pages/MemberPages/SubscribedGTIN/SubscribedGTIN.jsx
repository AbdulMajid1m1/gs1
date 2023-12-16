import React, { useContext, useEffect, useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../components/Datatable/Datatable'
import { subscribedGtinColumn } from '../../../utils/datatablesource'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../Contexts/DataTableContext'
import { useNavigate } from 'react-router-dom'

const SubscribedGTIN = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      Product: "GTIN",
      Description: "Category A -( 10 Barcodes )",
      Registered_Date: "25-11-2023",
      Expiry_date: "25-11-2024",
    },

    
  ]);
  const navigate = useNavigate();
  
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  //   useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await newRequest.get("/bankslip",);
        
  //       console.log(response.data);
  //       setData(response?.data || []);
  //       setIsLoading(false)

  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false)
  //     }
  //   };

  //   fetchData(); // Calling the function within useEffect, not inside itself
  // }, []); // Empty array dependency ensures this useEffect runs once on component mount

  // const { isLoading, error, data, isFetching } = useQuery("fetchPaymentSlip", async () => {
  //   const response = await newRequest.get("/bankslip",);
  //   return response?.data || [];
  //   console.log(response.data);
    
  // });


  const refreshHelpDeskData = async () => {
  }

  const handleView = (row) => {
      console.log(row);
  }

  const handleDelete = (row) => {
    console.log(row);
  };


  const handleRowClickInParent = (item) => {
      if (!item || item?.length === 0) {
        setTableSelectedRows(data)
        setFilteredData(data)
        return
      }
  
    }

  
//   const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

//   const handleShowCreatePopup = () => {
//       setCreatePopupVisibility(true);
//     };


//   const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

//   const handleShowUpdatePopup = (row) => {
//       setUpdatePopupVisibility(true);
//       // console.log(row)
//       // save this row data in session storage 
//       // sessionStorage.setItem("updateTicketRow", JSON.stringify(row));
//   };



  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
          <div>
            <DashboardRightHeader title={"Subscribed GTIN"}/>
          </div>


          <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                    {/* Buttons */}
                    {/* <div className='h-auto w-full shadow-xl'> */}
                        {/* <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3'>
                            <button
                              onClick={handleShowCreatePopup}
                                className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700">
                                 <i className="fas fa-plus mr-1"></i>Create Ticket
                            </button>
                         </div> */}
                        {/* </div> */}

                    {/* DataGrid */}
                    <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                    <DataTable data={data} 
                      title="Subscribed GTIN"
                       columnsName={subscribedGtinColumn}
                        loading={isLoading}
                         secondaryColor="secondary"
                          handleRowClickInParent={handleRowClickInParent}

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
                          handleRowClickInParent={handleRowClickInParent}
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
      
            
           {/* AddBrands component with handleShowCreatePopup prop */}
           {/* {isCreatePopupVisible && (
              <CreateTicketPopUp isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshHelpDeskData}/>
            )} */}

            {/* UpdateBrands component with handleShowUpdatePopup prop */}
            {/* {isUpdatePopupVisible && (
              <UpdateTicketPopUp isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshHelpDeskData}/>
            )} */}

      </div>
    </div>
  )
}

export default SubscribedGTIN