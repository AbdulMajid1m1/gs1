import React, { useEffect, useState } from 'react'
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { I18nextProvider, useTranslation } from "react-i18next";
import DataTable from '../../../../components/Datatable/Datatable';
import { productsCategoriesColumn } from '../../../../utils/datatablesource';
import { useNavigate } from 'react-router-dom'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest'
import AddCategories from './AddCategories';
import UpdateCategories from './UpdateCategories';

const ProductCategories = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const handleShowCreatePopup = () =>
  {
    setCreatePopupVisibility(true);
  };
 
  const fetchData = async () => {
    try {
      const response = await newRequest.get("/productCategories",);

      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const handleShowUpdatePopup = (row) =>
  {
    setUpdatePopupVisibility(true);
    // console.log(row)
    // save this row data in session storage 
    sessionStorage.setItem("updateBrandData", JSON.stringify(row));
  };
 

  const handleDelete = async (row) =>
  {
    Swal.fire({
      title: `${t('Are you sure to delete this record?')}!`,
      text: `${t('You will not be able to recover this')} ${t('Products Categories')}!`,
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
          const isDeleted = await newRequest.delete("/productCategories/" + row?.id);
          if (isDeleted) {
            toast.success(`${t('Products Categories')} ${t('Delete')} ${t('successfully')}!`);


            // filter out the deleted user from the data
            const filteredData = data.filter((item) => item?.id !== row?.id);
            setData(filteredData);
          } else {
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


  const handleRowClickInParent = (item) =>
  {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      return
    }

  }
 
  
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader
            title={t('Product Categories')}
          />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              <div className={`flex  sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  onClick={handleShowCreatePopup}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  <i className="fas fa-plus mr-2"></i>{t('Add')}
                </button>
              </div>

              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-15px' }}>

                <DataTable data={data}
                  title={t('Product Categories')}
                  columnsName={productsCategoriesColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  checkboxSelection={'disabled'}
                  handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[
                    // {
                    //   label: t("View"),
                    //   icon: (
                    //     <VisibilityIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleView,
                    // },
                    {
                      label: t("Edit"),
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
                      label: t("Delete"),
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

         {/* Addproduct component with handleShowCreatePopup prop */}
         {isCreatePopupVisible && (
          <AddCategories isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshCategories={fetchData} />
        )}
        {/* Updateproductpack component with handleShowUpdatePopup prop */}
        {isUpdatePopupVisible && (
          <UpdateCategories isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshCategories={fetchData} />
        )}
      </div>
    </div>
  )
}

export default ProductCategories