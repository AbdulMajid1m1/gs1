import React, { useContext, useEffect, useState } from 'react'
// import visitFrontend from "../../../Images/visitFrontend.png"
// import profileICon from "../../../Images/profileICon.png"
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { country__, paymentSlipColumn } from '../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../utils/userRequest'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

const Country = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const { rowSelectionModel, setRowSelectionModel,
      tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get("/address/getAllCountries",);
          
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

    const handleView = (row) => {
        console.log(row);
    }
const handleAddCompany = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Create Country',
        html:
          '<input id="name_en" class="swal2-input" placeholder="name english">' +
              '<input id="name_ar" class="swal2-input" placeholder="name arabic">' +
          '<input id="country_code" class="swal2-input" placeholder="country code">' +
          '<input id="country_shortName" class="swal2-input" placeholder="country short Name">',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Create Country',
          confirmButtonAriaLabel: 'Create',
          cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
          cancelButtonAriaLabel: 'Cancel',  
          confirmButtonColor: '#021F69',

        preConfirm: () => {
          return {
            name_en: document.getElementById('name_en').value,
              name_ar: document.getElementById('name_ar').value,
            country_code: document.getElementById('country_code').value,
            country_shortName: document.getElementById('country_shortName').value,
          };
        },
        inputValidator: (form) => {
          if (!form.name_en  || !form.name_ar || !form.country_code || !form.country_shortName  ) {
            return 'All Input field is required';
          }
        },
      });
  
      if (!formValues) {
        return; // Cancelled or invalid input
      }
  
      const { name_en, name_ar,country_code,country_shortName } = formValues;
  
      try {
        // Send a request to your API to add the company
        const response = await newRequest.post('/address/createCountries/', {
          name_en: name_en,
            name_ar: name_ar,
          country_code: country_code,
            country_shortName: country_shortName,
          status:1
        });
  
        toast.success(`name_en ${name_en} with name_ar "${name_ar}" has been added successfully.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });

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
                    title={'Country'}
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
                          onClick={handleAddCompany}
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                              <i className="fas fa-plus mr-2"></i>Add
                        </button>
                    </div>
                    {/* DataGrid */}
                    <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                    <DataTable data={data} 
                      title="Country"
                       columnsName={country__}
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

export default Country