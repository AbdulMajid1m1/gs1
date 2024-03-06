import React, { useContext, useEffect, useState } from 'react'
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../components/Datatable/Datatable'
import { helpDeskColumn, paymentSlipColumn } from '../../../utils/datatablesource'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../Contexts/DataTableContext'
import { useNavigate } from 'react-router-dom'
import CreateTicketPopUp from './CreateTicketPopUp';
import UpdateTicketPopUp from './UpdateTicketPopUp';
import { useTranslation } from 'react-i18next';
import newRequest from '../../../utils/userRequest';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const HelpDesk = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);
  
  const useriddata = sessionStorage.getItem("MemberUserId");

  const refreshHelpDeskData = async () => {
    try {
      const response = await newRequest.get(
        `/gethelpdeskByuserid/${useriddata}`
      );
      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    refreshHelpDeskData(); // Calling the function within useEffect, not inside itself
  }, []); 

  // const { isLoading, error, data, isFetching } = useQuery("fetchPaymentSlip", async () => {
  //   const response = await newRequest.get("/bankslip",);
  //   return response?.data || [];
  //   console.log(response.data);

  // });


  const handleDelete = async (row) => {
    Swal.fire({
      title: `${t('Are you sure to delete this record?')}!`,
      text: `${t('You will not be able to recover this')} ${t('Help Desk')}!`,
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
          const isDeleted = await newRequest.delete(
            "/deletehelpdesk/" + row?.id
          );
          if (isDeleted) {
            toast.success(
              `${t("Help Desk")} ${t("Delete")} ${t("successfully")}!`,
              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            // setData(filteredData);
            // refreshcitiesData();
            refreshHelpDeskData();
          } else {
            toast.error("Failed to delete user", {
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
          console.error("Error deleting user:", error);
          toast.error(`${t("Help Desk")} ${t("has been not deleted")}!`, {
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


  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };


  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    // console.log(row)
    // save this row data in session storage 
    sessionStorage.setItem("updateTicketRow", JSON.stringify(row));
  };



  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <DashboardRightHeader title={`${t('Help Desk')}`} />
        </div>


        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              {/* Buttons */}
              {/* <div className='h-auto w-full shadow-xl'> */}
              <div className={`flex  sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  onClick={handleShowCreatePopup}
                  className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary active:bg-blue-700">
                  <i className="fas fa-plus mr-1"></i>{t('Create Ticket')}
                </button>
              </div>
              {/* </div> */}

              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data}
                  title={`${t('Help Desk')}`}
                  columnsName={helpDeskColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[
                    // {
                    // label: "View",
                    // icon: (
                    //     <VisibilityIcon
                    //     fontSize="small"
                    //     color="action"
                    //     style={{ color: "rgb(37 99 235)" }}
                    //     />
                    // ),
                    // action: handleView,
                    // },
                    {
                      label: `${t('Edit')}`,
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
                      label: `${t('Delete')}`,
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


        {/* AddBrands component with handleShowCreatePopup prop */}
        {isCreatePopupVisible && (
          <CreateTicketPopUp isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshHelpDeskData} />
        )}

        {/* UpdateBrands component with handleShowUpdatePopup prop */}
        {isUpdatePopupVisible && (
          <UpdateTicketPopUp isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshHelpDeskData} />
        )}

      </div>
    </div>
  )
}

export default HelpDesk