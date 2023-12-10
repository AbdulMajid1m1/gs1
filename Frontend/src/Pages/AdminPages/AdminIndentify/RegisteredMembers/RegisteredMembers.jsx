import React, { useContext, useEffect, useState } from 'react'
import { Gs1AllMembers } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import newRequest from '../../../../utils/userRequest';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisteredMembers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const { rowSelectionModel, setRowSelectionModel,
      tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get("/users",);
          
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


    
  const refreshData = async () => {
    setIsLoading(true);
    try {
        const response = await newRequest.get("/users",);
        
        console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false)

    } catch (err) {
      console.log(err);
      Swal.fire(
        'Error!',
          err?.response?.data?.message || 'Something went wrong!.',
        'error'
      )

    }
  };

    const handleEdit = (row) => {
        console.log(row);
        // navigate("/upate-gtin-product/" + row?.id);
      };

    const handleOpen = (row) => {
        console.log(row);
        // navigate("/view-gtin-product/" + row?.id);
      };

    // const handleDelete = async (row) => {
    //     console.log(row);
    // };

    const handleView = (row) => {
        console.log(row);
        // save this data in session storage
        sessionStorage.setItem("gs1memberRecord", JSON.stringify(row));
        navigate("view-registered-member/" + row?.id);
      };

  
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
            const isDeleted = await newRequest.delete("/users/" + row?.id);
            if (isDeleted) {
              toast.success('User deleted successfully', {
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
              const filteredData = data.filter((item) => item?.id !== row?.id);
              setData(filteredData);
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


      const handleStatusChange = async (selectedUser) => {
        const statusOptions = ["active", "suspended", "inactive", "reject"];
        const initialStatus = selectedUser.status;
        console.log(initialStatus);
    
        const { value: selectedStatus } = await Swal.fire({
          title: `<strong>Update Status for (${selectedUser.company_name_eng})</strong>`,
          html: `
          <p><b>UserID:</b> ${selectedUser.id}</p>
          <p><b>Email:</b> ${selectedUser.email}</p>
        `,
          input: 'select',
          inputValue: initialStatus,
          inputOptions: statusOptions.reduce((options, status) => {
            options[status] = status;
            return options;
          }, {}),
          inputPlaceholder: 'Select Status',
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#1E3B8B',
          cancelButtonColor: '#FF0032',
        });
    
        if (selectedStatus === undefined) { // Cancel button was pressed
          return;
        }
    
        if (selectedStatus === 'reject') {
          handleReject(selectedUser); // Handle "reject" action
          return;
        }
    
    
        if (selectedStatus === initialStatus) {
           // No changes were made, show a Toastify info message
            toast.info('No changes were made', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          return;
        }
    
        try {
          const res = await newRequest.put(
            `/users/${selectedUser.id}`,
            {
              status: selectedStatus,
            }
          );
    
    
          refreshData();

          toast.success(res?.data?.message || 'Status updated successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

    
        } catch (err) {
          toast.error(err?.response?.data?.message || 'Something went wrong!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
    
      };

      
      
  return (
    <div>
      <div className="p-3 h-full sm:ml-72">

        <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-15px' }}>

            <DataTable data={data} title="Registered Members" columnsName={Gs1AllMembers}
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
                  label: "Change status",
                  icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                  ,
                  action: handleStatusChange,
  
                },
                // {
                // label: "Open",
                // icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                // ,
                // action: handleOpen,

                // },
                
                ,
                {
                label: "Delete",
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                  action: handleDelete,
                }

            ]}
            uniqueId="gtinMainTableId"

            />
            </div>

      </div>
    </div>
  )
}

export default RegisteredMembers