import React, { useContext, useEffect, useState } from 'react'
// import visitFrontend from "../../../Images/visitFrontend.png"
// import profileICon from "../../../Images/profileICon.png"
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { counrty_sales, paymentSlipColumn } from '../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../utils/userRequest'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from 'react-toastify';
import Addcountryofsale from './addcounrtyofsale';
import Updatecountryofsale from './updatecountryofsale';
const CountryofSales = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

    const handleShowCreatePopup = () => {
      setCreatePopupVisibility(true);
    };
   const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

      const handleShowUpdatePopup = (row) => {
        setUpdatePopupVisibility(true);
        // console.log(row)
        // save this row data in session storage 
        sessionStorage.setItem("updateBrandData", JSON.stringify(row));
      };
    const { rowSelectionModel, setRowSelectionModel,
      tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

  
  
      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get("/getAllcountryofsale",);
          
          console.log(response.data);
          setData(response?.data || []);
          setIsLoading(false)

        } catch (err) {
          console.log(err);
          setIsLoading(false)
        }
      };

      fetchData(); // Calling the function within useEffect, not inside itself
    }, []); // Empty array dependency ensures this useEffect runs once on component mount

     const refreshcitiesData = async () => {
      try {
        const response = await newRequest.get("/getAllcountryofsale",);
        
        console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false)

      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    };
    const handleView = (row) => {
        console.log(row);
    }
const handleDelete = async (row) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this User Account!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
          // changes the color of the confirm button to red
          confirmButtonColor: '#1E3B8B',
          cancelButtonColor: '#FF0032',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const isDeleted = await newRequest.delete("/deletecountryofsale/" + row?.id);
              if (isDeleted) {
                toast.success('country of sale deleted successfully', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
  
                
                // filter out the deleted user from the data
                const filteredData = brandsData.filter((item) => item?.id !== row?.id);
                setBrandsData(filteredData);
                
              } else {
                // Handle any additional logic if the user was not deleted successfully
                toast.error('Failed to delete user', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
  
              }
            } catch (error) {
              // Handle any error that occurred during the deletion
              console.error("Error deleting user:", error);
              toast.error('Something went wrong while deleting user', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            return;
          }
        });
    };
    const handleRowClickInParent = (item) => {
        if (!item || item?.length === 0) {
          setTableSelectedRows(data)
          setFilteredData(data)
          return
        }
    
      }

  return (
    <div>
        <div className="p-0 h-full sm:ml-72">
            <div>
                <DashboardRightHeader 
                    title={'Country of Sales'}
                />
            </div>

            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                    {/* Buttons */}
                    {/* <div className='h-auto w-full shadow-xl'> */}
                        {/* <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3'>
                            <button
                              onClick={() => navigate('/member/bank-slip')}
                                className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700">
                                 <i className="fas fa-plus mr-1"></i>Update Documents
                            </button>

                            <button
                            className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                                 Pendings <i className="fas fa-caret-down ml-1"></i>
                            </button>

                            <button
                            className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary active:bg-blue-700"
                            // onClick={handleExportProducts}
                            >
                                 Rejected <i className="fas fa-caret-down ml-1"></i>
                            </button>
                          </div> */}
                        {/* </div> */}
<div className='flex justify-start sm:justify-start items-center flex-wrap gap-2 py-7 px-3'>
                        <button
                          onClick={handleShowCreatePopup}
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                              <i className="fas fa-plus mr-2"></i>Add
                        </button>
                    </div>
                    {/* DataGrid */}
                    <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                    <DataTable data={data} 
                      title="Country of Sales"
                       columnsName={counrty_sales}
                        loading={isLoading}
                         secondaryColor="secondary"
                          handleRowClickInParent={handleRowClickInParent}

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
                        action: handleView,
                        },
{
                                    label: "Edit",
                                    icon: (
                                        <EditIcon
                                        fontSize="small"
                                        color="action"
                                        style={{ color: "rgb(37 99 235)" }}
                                        />
                                    ),
                                    action: handleShowUpdatePopup,
                                },
                                {
                                    label: "Delete",
                                    icon: (
                                        <DeleteIcon
                                        fontSize="small"
                                        color="action"
                                        style={{ color: "rgb(37 99 235)" }}
                                        />
                                    ),
                                    action: handleDelete,
                                },

                    ]}
                    uniqueId="gtinMainTableId"

                    />
                    </div>

                </div>
              </div>
            </div>
      
{/* Addcountryofsale component with handleShowCreatePopup prop */}
             {isCreatePopupVisible && (
                    <Addcountryofsale isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshcitiesData}/>
                  )}

        {/* Updatecountryofsale component with handleShowUpdatePopup prop */}
                  {isUpdatePopupVisible && (
                    <Updatecountryofsale isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshcitiesData}/>
                  )}
        </div>
    </div>
  )
}

export default CountryofSales