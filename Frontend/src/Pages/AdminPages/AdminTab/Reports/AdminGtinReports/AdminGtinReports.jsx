import React, { useEffect, useState } from 'react'
import DataTable from '../../../../../components/Datatable/Datatable'
import newRequest from '../../../../../utils/userRequest'
import { gtinReportsColumns } from '../../../../../utils/datatablesource'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AdminGtinReports = () => {
  const [gtinReports, setGtinReports] = useState([]);
  const [gtinReportsLoader, setGtinReportsLoader] = useState(false);
  const { t, i18n } = useTranslation();


  const fetchData = async () => {
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

            dropDownOptions={[
              {
                label: 'Edit',
                icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                // action: handleOpen,

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

      </div>
    </div>
  )
}

export default AdminGtinReports