import React, { useContext, useEffect, useState } from 'react'
import visitFrontend from "../../../../Images/visitFrontend.png"
import profileICon from "../../../../Images/profileICon.png"
import { TextField } from '@mui/material'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { useNavigate } from 'react-router-dom'
import { GtinColumn, MembersBrandsColumn, MembersDocumentColumn, financeColumn } from '../../../../utils/datatablesource'
import newRequest from '../../../../utils/userRequest'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import DataTable2 from '../../../../components/Datatable/Datatable2'
import './RegisteredMember.css'
import AddBrands from './AddBrands'
import UpdateBrands from './UpdateBrands'

const RegisteredMembersView = () => {
    // get the sesstion data
    const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
    console.log(gs1MemberData)
    
    const { rowSelectionModel, setRowSelectionModel,
        tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
      const [filteredData, setFilteredData] = useState([]);
  
  
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);

    const [membersDocuemtsData, setMembersDocumentsData] = useState([
        {
            type: 'national_address',
            document: gs1MemberData?.documents,
            date: gs1MemberData?.created_at,   
        },
        {
            type: 'company_documents',
            document: gs1MemberData?.address_image,
            date: gs1MemberData?.created_at,   
        },
        // {
        //     type: 'invoice',
        //     document: '',
        //     date: ''   
        // },
          


    ]);

    useEffect(() => {
      const fetchMemberBrandData = async () => {
        try {
          const response = await newRequest.get(`/users/cart?user_id=${gs1MemberData?.id}`);
          
          console.log(response.data);
    
          // Assuming the API response contains an array of documents
          const documents = response?.data.map(item => item.documents);
    
          // Update the invoice section in the state with the documents from the API response
          setMembersDocumentsData(prevState => [
            ...prevState.slice(0, 2),  // Keep the first two items unchanged
            {
              type: 'invoice',
              document: documents.join(', '),  // Join multiple documents if there are more than one
              date: gs1MemberData?.created_at,
            },
            ...prevState.slice(3),  // Keep the remaining items unchanged
          ]);
    
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      };
    
      fetchMemberBrandData();
    }, [gs1MemberData?.id]);  // Dependencies for the useEffect
    
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await newRequest.get(`/brands?user_id=${gs1MemberData?.id}`);
            
            console.log(response.data);
            setBrandsData(response?.data || []);
            setIsLoading(false)
  
          } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    };


    const fetchFinanceData = async () => {
      try {
        const response = await newRequest.get(`/users/cart?user_id=${gs1MemberData?.id}`);
        
        console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false)

      } catch (err) {
        console.log(err);
        setIsLoading(false)
          }
      };

      fetchFinanceData();
      fetchData(); // Calling the function within useEffect, not inside itself
    }, []); // Empty array dependency ensures this useEffect runs once on component mount

    
    // For refresh the Brand Datagrid
    const refreshBrandData = async () => {
        try {
          const response = await newRequest.get(`/brands?user_id=${gs1MemberData?.id}`);
          
          console.log(response.data);
          setBrandsData(response?.data || []);
          setIsLoading(false)

        } catch (err) {
          console.log(err);
          setIsLoading(false)
      }

      console.log(gs1MemberData?.id)
    }

    const navigate = useNavigate();
    const handleView = (row) => {
        console.log(row);
    }

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
        sessionStorage.setItem("updateBrandData", JSON.stringify(row));
      };




    //   HandleDelete
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
              const isDeleted = await newRequest.delete("/brands/" + row?.id);
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
    
    
      
      
  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div className='h-32 w-full flex justify-end items-start p-3 bg-primary -mt-6 sm:gap-7 gap-4'>
                <div className='flex justify-center items-center mt-1 cursor-pointer'>
                    <img src={visitFrontend} 
                        alt='logo'
                        style={{ filter: 'invert(1)' }}
                            className='h-5 w-5 text-white mr-4' />
                    <p className='text-white font-sans font-normal text-sm'>Vist Frontend</p>
                </div>

                <div className='flex justify-center items-center'>
                    <img src={profileICon} alt='logo' className='h-8 w-8 text-white mr-5' />
                </div>
            </div>
            
                <div className='flex justify-center items-center'>
                    <div className="h-20 w-[97%] bg-white shadow-xl rounded-md -mt-10 flex justify-start items-center px-10">
                        <p className="sm:text-2xl text-secondary text-sm font-sans font-semibold">GS1 Member Details</p>
                    </div>
                </div>


                <div className='flex justify-center items-center bg-[#DAF2EE]'>
                  <div className="h-auto w-[97%] px-0 pt-4">
                    <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

                     <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                        <TextField 
                            id="companyNameEnglish" 
                              label="Company Name English"
                                variant="outlined" 
                                    value={gs1MemberData?.company_name_eng}
                                InputLabelProps={{
                                    shrink: Boolean(gs1MemberData?.company_name_eng),
                                        style: { fontSize: gs1MemberData?.company_name_eng ? '16px' : '16px', zIndex: '0' },
                            }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="companyNameArabic" 
                                label="Company Name Arabic"
                                  variant="outlined" 
                                  value={gs1MemberData?.company_name_arabic}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.company_name_arabic),
                                          style: { fontSize: gs1MemberData?.company_name_arabic ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="Country" 
                                label="Country"
                                  variant="outlined" 
                                  value={gs1MemberData?.country}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.country),
                                          style: { fontSize: gs1MemberData?.country ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="CountryShortName" 
                                label="Country Short Name"
                                  variant="outlined" 
                                  value={gs1MemberData?.country}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.country),
                                          style: { fontSize: gs1MemberData?.country ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="State" 
                                label="State"
                                  variant="outlined" 
                                  value={gs1MemberData?.state}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.state),
                                          style: { fontSize: gs1MemberData?.state ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="City" 
                                label="City"
                                  variant="outlined" 
                                  value={gs1MemberData?.city}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.city),
                                          style: { fontSize: gs1MemberData?.city ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="ZipCode" 
                                label="Zip Code"
                                  variant="outlined" 
                                  value={gs1MemberData?.zip_code}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.zip_code),
                                          style: { fontSize: gs1MemberData?.zip_code ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="mobile" 
                                label="Mobile No (omit zero)"
                                  variant="outlined" 
                                  value={gs1MemberData?.mbl_extension}
                                  InputLabelProps={{
                                      shrink: Boolean(gs1MemberData?.mbl_extension),
                                          style: { fontSize: gs1MemberData?.mbl_extension ? '16px' : '16px', zIndex: '0' },
                              }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="Email" 
                                label="Email"
                                  variant="outlined" 
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                              id="upgradationDiscount" 
                                label="Upgradation Discount"
                                  variant="outlined" 
                                  value={gs1MemberData?.upgradation_disc_amount}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                  }}
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                          <TextField 
                              id="renewalDiscount" 
                                label="Reneval Discount"
                                  variant="outlined" 
                                  value={gs1MemberData?.renewal_disc_amount}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                  }}
                            />
                        </div>
                      </div>


                      <div className='h-auto w-full mt-8 px-1'>
                        <div className='flex justify-between'>
                            <p className='text-blue-500 font-sans font-semibold'>GS1 Member Details</p>
                            <button className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>Change Membership</button>
                        </div>

                        {/* <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Cr Number</p>
                                <p className='text-gray-500'>No</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Cr Activity</p>
                                <p className='text-gray-500'>No</p>
                            </div>
                        </div> */}
                     <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="crNumber" 
                                label="Cr Number"
                                    variant="outlined" 
                                        value={gs1MemberData?.cr_number}
                                    InputLabelProps={{
                                        shrink: Boolean(gs1MemberData?.cr_number),
                                            style: { fontSize: gs1MemberData?.cr_number ? '16px' : '16px', zIndex: '0' },
                                }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="crActivity" 
                                    label="Cr Activity"
                                    variant="outlined" 
                                    value={gs1MemberData?.cr_activity}
                                    InputLabelProps={{
                                        shrink: Boolean(gs1MemberData?.cr_activity),
                                            style: { fontSize: gs1MemberData?.cr_activity ? '16px' : '16px', zIndex: '0' },
                                }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <TextField 
                                    id="crDocuments" 
                                        label="CR Documents"
                                        variant="outlined" 
                                        value={gs1MemberData?.cr_documentID}
                                        InputLabelProps={{
                                            shrink: Boolean(gs1MemberData?.cr_documentID),
                                                style: { fontSize: gs1MemberData?.cr_documentID ? '16px' : '16px', zIndex: '0' },
                                    }}
                                    />
                            </div>
                       </div>
                    

                       <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="crNumber" 
                                label="CR Document Number"
                                    variant="outlined" 
                                    value={gs1MemberData?.document_number}
                                        InputLabelProps={{
                                            shrink: true,
                                               style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                    }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="companyNameEnglish" 
                                    label="Company Name English"
                                    variant="outlined" 
                                    value={gs1MemberData?.company_name_eng}
                                    InputLabelProps={{
                                        shrink: Boolean(gs1MemberData?.company_name_eng),
                                            style: { fontSize: gs1MemberData?.company_name_eng ? '16px' : '16px', zIndex: '0' },
                                }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <TextField 
                                    id="companyNameArabic" 
                                        label="Company Name Arabic"
                                        variant="outlined" 
                                        value={gs1MemberData?.company_name_arabic}
                                        InputLabelProps={{
                                            shrink: Boolean(gs1MemberData?.company_name_arabic),
                                                style: { fontSize: gs1MemberData?.company_name_arabic ? '16px' : '16px', zIndex: '0' },
                                    }}
                                    />
                            </div>
                       </div>
                    

                       <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="companyGCP" 
                                label="Company GCP"
                                    variant="outlined" 
                                    value={gs1MemberData?.gcpGLNID}
                                        InputLabelProps={{
                                            shrink: true,
                                               style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                    }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="contactPerson" 
                                    label="Contact Person"
                                    variant="outlined" 
                                    value={gs1MemberData?.contactPerson}
                                    InputLabelProps={{
                                        shrink: true,
                                           style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <TextField 
                                    id="mobileNo" 
                                        label="Mobile No (omit zero)"
                                        variant="outlined" 
                                        value={gs1MemberData?.mobile}
                                        InputLabelProps={{
                                            shrink: true,
                                               style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                    }}
                                    />
                            </div>
                       </div>


                       <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="memberID" 
                                label="Member ID"
                                    variant="outlined" 
                                    value={gs1MemberData?.memberID}
                                        InputLabelProps={{
                                            shrink: true,
                                               style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                    }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="companyLandline" 
                                    label="Company Landline"
                                    variant="outlined" 
                                    value={gs1MemberData?.companyLandLine}
                                    InputLabelProps={{
                                        shrink: true,
                                           style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                }}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <TextField 
                                    id="membershipType" 
                                        label="Membership Type"
                                        variant="outlined" 
                                        value={gs1MemberData?.membership_category}
                                        InputLabelProps={{
                                            shrink: true,
                                               style: { fontSize: '16px', paddingTop: '8px', zIndex: '0'  },
                                    }}
                                    />
                            </div>
                       </div>
                    

                       <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
                        <div className="w-[32.5%] font-body sm:text-base text-sm flex flex-col gap-2">
                            <TextField 
                                id="GTIN" 
                                label="GTIN"
                                    variant="outlined" 
                                    value={gs1MemberData?.gpc}
                                        InputLabelProps={{
                                            shrink: true,
                                               style: { fontSize: '16px', paddingTop: '8px', zIndex: '0' },
                                    }}
                                />
                            </div>
                           
                       </div>

                    <div className='flex justify-end'>
                        {/* <p className='text-blue-500 font-sans font-semibold'>Member Documents</p> */}
                        <button
                           onClick={handleShowCreatePopup} 
                            className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'
                        >
                            Add
                        </button>
                    </div>
                        
                       
                     <div className='flex gap-5 flex-wrap'>
                        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                        className='sm:w-[50%] w-full'
                        >
                       <DataTable2 data={membersDocuemtsData} 
                            title="Member'z Documents"
                            columnsName={MembersDocumentColumn}
                                loading={isLoading}
                                secondaryColor="secondary"
                                handleRowClickInParent={handleRowClickInParent}
                                checkboxSelection={false}
                                actionColumnVisibility={false}

                            dropDownOptions={[
                                // {
                                // label: "Add",
                                // icon: (
                                //     <EditIcon
                                //     fontSize="small"
                                //     color="action"
                                //     style={{ color: "rgb(37 99 235)" }}
                                //     />
                                // ),
                                // action: handleView,
                                // },
                                // {
                                //     label: "Delete",
                                //     icon: (
                                //         <DeleteIcon
                                //         fontSize="small"
                                //         color="action"
                                //         style={{ color: "rgb(37 99 235)" }}
                                //         />
                                //     ),
                                //     action: handleDelete,
                                //     },
    

                            ]}
                            uniqueId="gtinMainTableId"

                            />
                          </div>

                          <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                            className='sm:w-[50%] w-full'
                          >
                       <DataTable data={brandsData} 
                            title="Brands"
                            columnsName={MembersBrandsColumn}
                                loading={isLoading}
                                secondaryColor="secondary"
                                handleRowClickInParent={handleRowClickInParent}

                            dropDownOptions={[
                                // {
                                // label: "Add",
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

                      
                        {/* <div className='flex justify-between mt-8'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Mobile No (omit zero)</p>
                                <p className='text-gray-500'>339809338</p>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>Member ID</p>
                                <p className='text-gray-500'>3998</p>
                            </div>
                        </div> */}

                        {/* <div className='flex justify-between mt-6'>
                            <div className='w-full flex flex-col gap-1 '>
                                <p className='font-sans font-semibold text-sm text-gray-500'>GTIN</p>
                                <p className='text-gray-500'>Category B - ( 100 Barcodes )</p>
                            </div>
                        </div> */}

                      </div>
                    </div>
                 </div>
               </div>


                 <div className='flex justify-center items-center bg-[#DAF2EE]'>
                   <div className="h-auto w-[97%] px-0 pt-4">
                     <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">
                        
                        <div className='flex justify-between'>
                            <p className='text-blue-500 font-sans font-semibold'>Member Documents</p>
                            <button 
                              // onClick={handleShowCreatePopup}
                              className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>Add</button>
                        </div>
                        
                        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                          >
                       <DataTable data={data} 
                            title="Finance"
                            columnsName={financeColumn}
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


                   {/* AddBrands component with handleShowCreatePopup prop */}
                  {isCreatePopupVisible && (
                    <AddBrands isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshBrandData}/>
                  )}


                  {/* UpdateBrands component with handleShowUpdatePopup prop */}
                  {isUpdatePopupVisible && (
                    <UpdateBrands isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshBrandData}/>
                  )}

        </div>
    </div>
  )
}

export default RegisteredMembersView