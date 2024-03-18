import React, { useContext, useEffect, useState } from 'react'
import { Gs1AllMembers } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import newRequest from '../../../../utils/userRequest';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import FinancePopUp from './FinancePopUp';
import RenewPopUp from './RenewPopUp';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import UpgradePopUp from './UpgradePopUp';
import DowngradePopUp from './DowngradePopUp';
import { useTranslation } from 'react-i18next';
import AssignToPopUp from './AssignToPopUp';

const RegisteredMembers = () => {
  const { t, i18n } = useTranslation();
  const [IsLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState([]);
  // const [gridData, setGridData] = useState([]);
  const navigate = useNavigate();

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const { isLoading, error, data, refetch } = useQuery("fatchMembers", async () => {
    const response = await newRequest.get("/users/allUser?parent_memberID=0",);
    return response?.data || [];

  });
  const handleFetchData = () => {
    refetch();
  };

  // useEffect(() => {
  //   if (data) {
  //     setGridData(data)
  //     setFilteredData(data)
  //     setIsLoading(false)
  //   }
  // }, [data]);


  // const fetchData = async () => {
  //   setIsLoading(true)
  //   try {
  //     // /users/allUser
  //     // const response = await newRequest.get("/users?parent_memberID=0");
  //     const response = await newRequest.get("/users/allUser?parent_memberID=0");

  //     // console.log(response.data);
  //     setData(response?.data || []);
  //     setIsLoading(false)

  //   } catch (err) {
  //     // console.log(err);
  //     setIsLoading(false)
  //   }
  // };

  // useEffect(() => {
  //   fetchData(); // Calling the function within useEffect, not inside itself
  // }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleView = (row) => {
    // console.log(row);
    sessionStorage.setItem("gs1memberRecord", JSON.stringify(row));
    navigate("view-registered-member/" + row?.id);
  };


  const handleDelete = async (row) => {
    Swal.fire({
      title: `${t('Are you sure to delete this record?')}!`,
      text: `${t('You will not be able to recover this')} ${t('User')}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `${t('Yes')} , ${t('Delete')}!`,
      cancelButtonText: `${t('No, keep it')}!`,
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/users/" + row?.id);
          if (isDeleted) {

            await refetch();
          
            toast.success(`${t('User')} ${t('has been deleted')} ${t('successfully')}!`, {
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
            // const filteredData = data.filter((item) => item?.id !== row?.id);
            // setData(filteredData);
            // setGridData(filteredData);

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
          toast.error(`${t('User')} ${t('has been not deleted')} ${t('Delete')}!`, {
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


  const [isFinancePopupVisible, setFinancePopupVisibility] = useState(false);

  const handleShowFinancePopup = (row) => {
    setFinancePopupVisibility(true);
    // console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };

  const [isRenewPopupVisible, setIsRenewPopupVisible] = useState(false);

  const handleShowRenewPopup = (row) => {
    setIsRenewPopupVisible(true);
    // console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };


  const [isUpgradePopupVisible, setIsUpgradePopupVisible] = useState(false);

  const handleShowUpgradePopup = (row) => {
    setIsUpgradePopupVisible(true);
    // console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };


  const [isDowngradePopupVisible, setIsDowngradePopupVisible] = useState(false);

  const handleShowDowngradePopup = (row) => {
    setIsDowngradePopupVisible(true);
    // console.log(row);
    // set this data in session storage
    sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };


  const [isAssignToPopUpVisible, setIsAssignToPopUpVisible] = useState(false);
  const [assignUser, setAssignUser] = useState([]);

  const handleAssignToPopUp = (row) => {
    setIsAssignToPopUpVisible(true);
    // console.log(row);
    setAssignUser(row);
    // set this data in session storage
    // sessionStorage.setItem("registeredMemberRowData", JSON.stringify(row));

  };

  const fetchMemberInvoiceData = async (row) => {
    try {

      const response = await newRequest.get(`/memberDocuments/pendingInvoices?user_id=${row?.id}`);

      // console.log(response.data);

      if (response.data.length > 0) {
        handleShowFinancePopup(row);
      } else {
        // Show an error message
        toast.error(`${t('No invoice data available')}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // progress: undefined,
          theme: "light",
        });
      }
    }
    catch (err) {
      // console.log(err);
      // show the toast message
      toast.error(err?.response?.data?.message || `${t('Something went wrong')}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  // Now you can retrieve the data and parse it when needed
  const storedData = sessionStorage.getItem('adminData');
  const adminData = JSON.parse(storedData);
  //  console.log(adminData);


  const filterDropdownOptions = (row, dropDownOptions) => {
    // Check if the user is a super admin
    if (adminData?.is_super_admin === 1) {
      let filteredOptions = dropDownOptions;

      // Filter out 'Assign To' option if assign_to_admin is not null
      if (row.assign_to_admin && row.assign_to_admin.id) {
        filteredOptions = filteredOptions.filter(option => option.label !== 'Assign To');
      }

      // Filter out 'Renew' option if the status is not 'active'
      if (row.status !== 'active') {
        filteredOptions = filteredOptions.filter(option => option.label !== 'Renew');
      }

      return filteredOptions; // Return the filtered options for super admin
    }
    // Check if the user is a regular admin (not super admin)
    else if (adminData?.is_super_admin === 0) {
      const assignToAdminId = row?.assign_to_admin?.id;

      // Check if the current admin is assigned to the user
      if (assignToAdminId === adminData?.id) {
        // Filter out 'Renew' option if the status is not 'active'
        if (row.status !== 'active') {
          return dropDownOptions.filter(option => option.label !== 'Renew');
        }

        return dropDownOptions; // Enable all options for the admin who is assigned to the user
      }
    }

    return []; // Disable all options for other cases
  };


  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader
            title={`${t('Registered Members')}`}
            fetchData={handleFetchData}
            showIcon={true}
          />
        </div>

        <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

          <DataTable data={data}
            title={`${t('Registered Members')}`}
            columnsName={Gs1AllMembers(t)}
            loading={isLoading}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            globalSearch={true}
            handleRowClickInParent={handleRowClickInParent}
            getFilteredOptions={filterDropdownOptions}
            uniqueId="admin_registered_members"

            dropDownOptions={[
              {
                label: `${t('Profile')}`,
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
                label: `${t('Activation')}`,
                icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: fetchMemberInvoiceData,

              },
              {
                label: `${t('Renew')}`,
                icon: <PublishedWithChangesIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleShowRenewPopup,

              },
              {
                label: `${t('Assign To')}`,
                icon: <AssignmentTurnedInIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleAssignToPopUp,

              },
              // {
              //   label: "Upgrade",
              //   icon: <UpgradeIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
              //   ,
              //   action: handleShowUpgradePopup,

              //   },
              //   {
              //     label: "Downgrade",
              //     icon: <SwipeDownIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
              //     ,
              //     action: handleShowDowngradePopup,

              //   },
              {
                label: `${t('Delete')}`,
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                action: handleDelete,
              }

            ]}


          />
        </div>



        {/* AddBrands component with handleShowCreatePopup prop */}
        {isFinancePopupVisible && (
          <FinancePopUp isVisible={isFinancePopupVisible} setVisibility={setFinancePopupVisibility} />
        )}


        {/* Renew component with handleShowRenewPopup prop */}
        {isRenewPopupVisible && (
          <RenewPopUp isVisible={isRenewPopupVisible} setVisibility={setIsRenewPopupVisible} />
        )}


        {/* Upgrade component with handleShowUpgradePopup prop */}
        {isUpgradePopupVisible && (
          <UpgradePopUp isVisible={isUpgradePopupVisible} setVisibility={setIsUpgradePopupVisible} />
        )}


        {/* Downgrade component with handleShowDowngradePopup prop */}
        {isDowngradePopupVisible && (
          <DowngradePopUp isVisible={isDowngradePopupVisible} setVisibility={setIsDowngradePopupVisible} />
        )}


        {/* AssignTo component with handleShowDowngradePopup prop */}
        {isAssignToPopUpVisible && (
          <AssignToPopUp isVisible={isAssignToPopUpVisible} setVisibility={setIsAssignToPopUpVisible} assignUser={assignUser}
            fetchData={handleFetchData}
          />
        )}


      </div>
    </div>
  )
}

export default RegisteredMembers


