import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { AdminRolesColumn } from '../../../../utils/datatablesource';
import DataTable from '../../../../components/Datatable/Datatable';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../../utils/userRequest';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Roles = () => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

   const fetchAllRoles = async () => {
    setIsLoading(true);
    try {
        const response = await newRequest.get('/roles');
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
    }
    catch (error) {
        console.error('Error fetching on Search GPC Api:', error);
        setIsLoading(false);
    }
};

useEffect(() => {
    fetchAllRoles();
}, []);


  const handleEdit = (row) => {
    navigate("/admin/update-roles/" + row?.id)
  }

  const handleDelete = async (row) =>
  {
    Swal.fire({
      title: `${t('Are you sure to delete this record?')}!`,
      text: 'You will not be able to recover this',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `${t('Yes')} , ${t('Delete')}!`,
      cancelButtonText: `${t('No, keep it')}!`,
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) =>
    {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/roles/" + row?.id);
          if (isDeleted) {
            toast.success(`Roles ${t('has been deleted')} ${t('successfully')}!`);

            // filter out the deleted user from the data
            const filteredData = data.filter((item) => item?.id !== row?.id);
            setData(filteredData);

          } 
          else {
            // Handle any additional logic if the user was not deleted successfully
            toast.error('Failed to delete user');
          }
        } catch (error) {
          // Handle any error that occurred during the deletion
          console.error("Error deleting user:", error);
          toast.error('Something went wrong while deleting user');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };


  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setFilteredData(data)
      return
    }

   }


  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader title={`${t('Roles')}`} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-4 bg-white shadow-xl rounded-md">

              <div className={`flex px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                  <button
                  onClick={() => navigate('/admin/add-roles')}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  <i className="fas fa-plus mr-2"></i>  {t('Add Role')}
                </button>
              </div>
              
              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data}
                  title={`${t('Roles')}`}
                  columnsName={AdminRolesColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  checkboxSelection={'disabled'}
                  // actionColumnVisibility={false}
                  handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[     
                    {
                      label: `${t('Edit')}`,
                      icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      action: handleEdit
    
                    }, 
                    {
                      label:`${t('Delete')}`,
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

      </div>
    </div>
  )
}

export default Roles