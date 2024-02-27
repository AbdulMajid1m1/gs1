import React, { useEffect, useState } from 'react'
import DataTable from '../../../../../components/Datatable/Datatable'
import newRequest from '../../../../../utils/userRequest'
import { gtinReportsColumns } from '../../../../../utils/datatablesource'
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SendEmailPopUp from './SendEmailPopUp';

const AdminGtinReports = () => {
  const [gtinReports, setGtinReports] = useState([]);
  const [gtinReportsLoader, setGtinReportsLoader] = useState(false);
  const { t, i18n } = useTranslation();


  const fetchData = async () => {
    setGtinReportsLoader(true);
    try {
      const response = await newRequest.get('/gtinHelperReports');
      console.log(response.data);
      setGtinReports(response?.data || []);
      setGtinReportsLoader(false)

    } catch (err) {
      console.log(err);
      setGtinReportsLoader(false)
    }
  };


  useEffect(() => {
    fetchData()
  }
    , [])

    const handleDelete = async (row) => {
        try {
          const deleteResponse = await newRequest.delete(`/gtinHelperReports/${row?.id}`);
          console.log(deleteResponse.data);
          toast.success(`${t('The GTIN Report has been deleted successfully')}`);
    
          // Update the datagrid Table after deletion
          setGtinReports(prevData => prevData.filter(item => item.id !== row?.id));
    
    
        } catch (err) {
          console.log(err);
          toast.error(err?.response?.data?.error || 'Error');
        }
      };

    const [isAssignToPopUpVisible, setIsAssignToPopUpVisible] = useState(false);
    const [assignUser, setAssignUser] = useState([]);
    
    const handleAssignToPopUp = (row) => {
      setIsAssignToPopUpVisible(true);
      console.log(row);
      setAssignUser(row);  
    };
    

    const filterDropdownOptions = (row, dropDownOptions) => {
      let filteredOptions = dropDownOptions;
      
      // Check if the row's report_status is 0 or 1
      if (row.report_status === 0) {
        // If report_status is 0, keep only the "Mark as Completed" option
        filteredOptions = dropDownOptions.filter(option => option.label === 'Mark as Completed');
      } else {
        // If report_status is 1, keep only the "Mark as Pending" option
        filteredOptions = dropDownOptions.filter(option => option.label === 'Mark as Pending');
      }
      
      // Always include "Email To Brand Owner" and "Delete" options
      filteredOptions.push(
        {
          label: 'Email To Brand Owner',
          icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />,
          action: handleAssignToPopUp,
        },
        {
          label: `${t('Delete')}`,
          icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />,
          action: handleDelete,
        }
      );
    
      return filteredOptions;
    };
    
    
    // Mark As complete function
    const handleStatusChanged = async (row) => {
      console.log(row);
    
      // Determine the new status based on the current status
      const newStatus = row.report_status === 0 ? 1 : 0;
    
      const formData = new FormData();
      formData.append('report_barcode', row.report_barcode);
      formData.append('report_comment', row.report_comment);
      formData.append('report_action', row.report_action);
      formData.append('report_status', newStatus);
      formData.append('reporter_email', row.reporter_email);
      // formData.append('report_images', row.report_images);
    
      try {
        // Send the PUT request with the FormData
        const response = await newRequest.put(`/gtinHelperReports/${row?.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        });
        toast.success('GTIN Report status change successfully.')
        console.log(response.data);
        fetchData();
       
      } catch (err) {
        console.log(err);
        toast.error('Error on changing status');
      }
    }
    
 
    
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`} >
        <div>
          <AdminDashboardRightHeader
            title={'GTIN Reports'}
          />
        </div>

        <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

          <DataTable data={gtinReports} title={'GTIN Reports'} columnsName={gtinReportsColumns}
            loading={gtinReportsLoader}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            globalSearch={true}
            // handleRowClickInParent={handleRowClickInParent}
            uniqueId="members_gtin_reports"
            getFilteredOptions={filterDropdownOptions}

            dropDownOptions={[
              {
                label: 'Mark as Completed',
                icon: <CheckCircleIcon fontSize="small" color="action" style={{ color: "green" }} />,
                action: handleStatusChanged,
              },
              {
                label: 'Mark as Pending',
                icon: <PendingIcon fontSize="small" color="action" style={{ color: "orange" }} />,
                action: handleStatusChanged,
              },
              {
                label: 'Email To Brand Owner',
                icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleAssignToPopUp,

              },
              {
                label: `${t('Delete')}`,
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                action: handleDelete,
              }



            ]}


          />
        </div>


        {/* AssignTo component with handleShowDowngradePopup prop */}
        {isAssignToPopUpVisible && (
          <SendEmailPopUp isVisible={isAssignToPopUpVisible} setVisibility={setIsAssignToPopUpVisible} assignUser={assignUser}
            fetchData={fetchData}
          />
        )}

      </div>
    </div>
  )
}

export default AdminGtinReports