import React, { useContext, useEffect, useState } from 'react'
// import visitFrontend from "../../../Images/visitFrontend.png"
// import profileICon from "../../../Images/profileICon.png"
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { Gcp_types, paymentSlipColumn } from '../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../utils/userRequest'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AdddcpType from './addgcpType';
import UpdategcpType from './updategcpType';
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";
import FileUploadIcon from '@mui/icons-material/FileUpload';
const Gcp_type = () =>
{

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [brandsData, setBrandsData] = useState([]);
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

  const handleShowCreatePopup = () =>
  {
    setCreatePopupVisibility(true);
  };


  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const handleShowUpdatePopup = (row) =>
  {
    setUpdatePopupVisibility(true);
    // console.log(row)
    // save this row data in session storage 
    sessionStorage.setItem("updateBrandData", JSON.stringify(row));
  };
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try {
        const response = await newRequest.get("/getAllgpctype",);

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

  // const { isLoading, error, data, isFetching } = useQuery("fetchPaymentSlip", async () => {
  //   const response = await newRequest.get("/bankslip",);
  //   return response?.data || [];
  //   console.log(response.data);

  // });
  const refreshcitiesData = async () =>
  {
    try {
      const response = await newRequest.get("/getAllgpctype",);

      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };
  const handleDelete = async (row) =>
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this GCP type!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) =>
    {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/deletegpctype/" + row?.id);
          if (isDeleted) {
            toast.success('gpc type deleted successfully', {
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
            refreshcitiesData()
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
  const handleView = (row) =>
  {
    console.log(row);
  }
  const handleRowClickInParent = (item) =>
  {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data)
      setFilteredData(data)
      return
    }

  }
  const handleFileUpload = (e) =>
  {
    const file = e.target.files[0];
    if (file) {
      console.log(file.type);
      const reader = new FileReader();
      reader.onload = (e) =>
      {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming you have data in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        json.forEach((item) =>
        {
          newRequest.post(`/creategpctype`, {
            gcp_description: item.gcp_description, // Adjust property names as needed
            gcp_code: item.gcp_code,
          })
            .then((res) =>
            {
              console.log('Add', res.data);

              Swal.fire(
                'Add!',
                `Other Product has been created`,
                'success'
              )
              refreshcitiesData()
            })
            .catch((err) =>
            {
              console.log(err);
              Swal.fire(
                'Error!',
                `Some Other Product already exist`,
                'error'
              )
              // Handle errors
            });
        });
      };
      reader.readAsArrayBuffer(file);

    }
  };
  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div>
          <DashboardRightHeader
            title={'Gcp_type'}
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
                <div className="relative">
                  <button
                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary cursor-pointer"
                  >
                    <i className="fas fa-file-import mr-1"></i> Import
                  </button>
                  <input
                    type="file"
                    accept=".xlsx"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </div>


                <CSVLink data={data}

                  type="button"
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary" >  Export  <FileUploadIcon />
                </CSVLink>
              </div>
              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data}
                  title="Gcp_type"
                  columnsName={Gcp_types}
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


        {/* AdddcpType component with handleShowCreatePopup prop */}
        {isCreatePopupVisible && (
          <AdddcpType isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshcitiesData} />
        )}

        {/* UpdategcpType component with handleShowUpdatePopup prop */}
        {isUpdatePopupVisible && (
          <UpdategcpType isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshcitiesData} />
        )}
      </div>
    </div>
  )
}

export default Gcp_type