import React, { useContext, useEffect, useState } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdminBrandsColumn } from '../../../../utils/datatablesource';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import { useNavigate } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import newRequest from '../../../../utils/userRequest';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Addbrands from './addbrands';
import Updatebrands from './updatebrands';
const Brands = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
    console.log(gs1MemberData)
   const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

    const handleShowCreatePopup = () => {
      setCreatePopupVisibility(true);
    };
    const navigate = useNavigate();
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
          const response = await newRequest.get(`/brands`,);
          
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

    // refreshData
     const refreshcitiesData = async () => {
      try {
        const response = await newRequest.get("/brands",);
        
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
          text: 'You will not be able to recover this cr number!',
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
              const isDeleted = await newRequest.delete("/brands/" + row?.id);
              if (isDeleted) {
                toast.success('Cr number deleted successfully', {
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
    const handleEdit = (row) => {
      console.log(row);
    }

   

  const handleRowClickInParent = (item) => {
      if (!item || item?.length === 0) {
        setTableSelectedRows(data)
        setFilteredData(data)
        return
      }
  
    }

    
    const handleAddCompany = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Create Brand',
        html:
          '<input id="companyName" class="swal2-input" placeholder="Company Name">' +
          '<input id="companyNameArabic" class="swal2-input" placeholder="Company Arabic Name">',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Create Brand',
          confirmButtonAriaLabel: 'Create',
          cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
          cancelButtonAriaLabel: 'Cancel',  
          confirmButtonColor: '#021F69',

        preConfirm: () => {
          return {
            companyName: document.getElementById('companyName').value,
            companyNameArabic: document.getElementById('companyNameArabic').value,
          };
        },
        inputValidator: (form) => {
          if (!form.companyName || !form.companyNameArabic) {
            return 'Both Company Name and Company Arabic Name are required';
          }
        },
      });
  
      if (!formValues) {
        return; // Cancelled or invalid input
      }
  
      const { companyName, companyNameArabic } = formValues;
  
      try {
        // Send a request to your API to add the company
        const response = await newRequest.post('/brands/', {
          name: companyName,
          name_ar: companyNameArabic,
          status: 'active', // You may want to modify this based on your requirements
          user_id: gs1MemberData?.id, // Replace with the actual user ID
        });
  
        toast.success(`Company ${companyName} with Arabic name "${companyNameArabic}" has been added successfully.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });

        refreshData();
        console.log(response.data);
  
      } catch (error) {
        toast.error(error?.response?.data?.error || 'Error', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        console.log(error);
      }
    };
  

  return (
    <div>
        <div className="p-0 h-full sm:ml-72">
            <div>
              <DashboardRightHeader 
                title={'Brands'}
              />
            </div>

            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

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
                        title="Brands"
                        columnsName={AdminBrandsColumn}
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
        {/* Addbrands component with handleShowCreatePopup prop */}
             {isCreatePopupVisible && (
                    <Addbrands isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshcitiesData}/>
        )}
        {/* Updatebrands component with handleShowUpdatePopup prop */}
                  {isUpdatePopupVisible && (
                    <Updatebrands isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshcitiesData}/>
                  )}
        </div>
    </div>
  )
}

export default Brands