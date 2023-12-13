import React, { useContext, useEffect, useState } from 'react'
import visitFrontend from "../../../../Images/visitFrontend.png"
import profileICon from "../../../../Images/profileICon.png"
import { TextField } from '@mui/material'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { useNavigate } from 'react-router-dom'
import { GtinColumn, MembersBrandsColumn, MembersDocumentColumn } from '../../../../utils/datatablesource'
import newRequest from '../../../../utils/userRequest'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import DataTable2 from '../../../../components/Datatable/Datatable2'
import './RegisteredMember.css'

const RegisteredMembersView = () => {
    // get the sesstion data
    const gs1MemberData = JSON.parse(sessionStorage.getItem("gs1memberRecord"));
    console.log(gs1MemberData)
    
    const { rowSelectionModel, setRowSelectionModel,
        tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
      const [filteredData, setFilteredData] = useState([]);
  
  
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([
        {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Initial Status',
          },
          {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Initial Status',
          },
          {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Initial Status',
          },
          {
            product_id: 'Initial Product ID',
            productnameenglish: 'Initial Product Name',
            BrandName: 'Initial Brand',
            qrcode: 'Initial QRCode',
            barcode: 'Initial Barcode',
            product_url: 'http://example.com/initial',
            product_link_url: 'http://example.com/link/initial',
            status: 'Initial Status',
          },
    
    ]);
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

    //     const fetchMembersDocuments = async () => {
    //         try {
    //         const response = await newRequest.get(`/users/cart?user_id=clpxx5wmo0004h4a5111fcnrx`,);
            
    //         console.log(response.data);
    //         setMembersDocumentsData(response?.data || []);
    //         setIsLoading(false)

    //         } catch (err) {
    //         console.log(err);
    //         setIsLoading(false)
    //     }
    // };
    //     fetchMembersDocuments();
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


    // add the brands api 
    const handleAddCompany = async () => {
        const { value: formValues } = await Swal.fire({
          title: 'Create Brand',
          html:
            '<input id="companyName" class="swal2-input" placeholder="Company Name">' +
            '<input id="brandcompanyNameArabic" class="swal2-input" placeholder="Company Arabic Name">',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Create Brand',
          confirmButtonAriaLabel: 'Create',
          cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
          cancelButtonAriaLabel: 'Cancel',
          confirmButtonColor: '#021F69',
          preConfirm: () => {
            return {
              companyName: document.getElementById('companyName').value,
              brandcompanyNameArabic: document.getElementById('brandcompanyNameArabic').value,
            };
          },
          inputValidator: (form) => {
            if (!form.companyName || !form.brandcompanyNameArabic) {
              return 'Both Company Name and Company Arabic Name are required';
            }
          },
        });
      
        if (!formValues) {
          return; // Cancelled or invalid input
        }
      
        const { companyName, brandcompanyNameArabic } = formValues;
      
        try {
          // Send a request to your API to add the company
          const response = await newRequest.post('/brands/', {
            name: companyName,
            name_ar: brandcompanyNameArabic,
            status: 'active', // You may want to modify this based on your requirements
            user_id: gs1MemberData?.id, // Replace with the actual user ID
          });
      
          toast.success(`Company ${companyName} with Arabic name "${brandcompanyNameArabic}" has been added successfully.`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      
          console.log(response.data);
          refreshBrandData();
      
        } catch (error) {
          toast.error(error?.response?.data?.error || 'Error', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      
          console.log(error);
        }
      
        // show the both input field type data in console
        console.log(formValues);
      };


      // // Update Brands Data   
      // const handleUpdateBrandCompany = async (selectedUser) => {
      //   const statusOptions = ["active", "inactive"];
      //   const initialStatus = selectedUser.status;
      //   console.log(initialStatus);
      
      //   const { value: formValues } = await Swal.fire({
      //       title: `<strong>Update Brands</strong>`,
      //       html: `
      //         <select id="status" class="swal2-select" placeholder="Status">
      //           ${statusOptions.map((status) => `
      //             <option value="${status}" ${initialStatus === status ? 'selected' : ''}>${status}</option>
      //           `).join('')}
      //         </select>
      //         <input id="name" class="swal2-input" placeholder="Name" value="${selectedUser.name}" readonly>
      //         <input id="name_ar" class="swal2-input" placeholder="Arabic Name" value="${selectedUser.name_ar}" readonly>
      //         <input id="user_id" class="swal2-input" placeholder="User ID" value="${selectedUser.user_id}" readonly>
      //       `,
      //       showCancelButton: true,
      //       confirmButtonText: 'Update',
      //       confirmButtonColor: '#1E3B8B',
      //       cancelButtonColor: '#FF0032',
      //       preConfirm: () => {
      //         return {
      //           status: document.getElementById('status').value,
      //           name: document.getElementById('name').value,
      //           name_ar: document.getElementById('name_ar').value,
      //           user_id: document.getElementById('user_id').value,
      //         };
      //       },
      //     });
      
      //   if (!formValues) { // Cancel button was pressed or invalid input
      //     return;
      //   }
      
      //   const { status, name, name_ar, user_id } = formValues;
      
      //   if (status === 'reject') {
      //     handleReject(selectedUser); // Handle "reject" action
      //     return;
      //   }
      
      //   if (status === initialStatus) {
      //     // No changes were made, show a Toastify info message
      //     toast.info('No changes were made', {
      //       position: "top-right",
      //       autoClose: 2000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //     return;
      //   }
      
      //   try {
      //     const response = await newRequest.put(
      //       `/brands/${selectedUser.id}`, // Replace with the correct endpoint for updating status
      //       {
      //         status,
      //         name,
      //         name_ar,
      //         user_id,
      //       }
      //     );
      
      //     toast.success(response?.data?.message || 'Status updated successfully', {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });

      //     refreshBrandData();
      
      //   } catch (error) {
      //     toast.error(error?.response?.data?.message || 'Something went wrong!', {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      
      //     console.log(error);
      //   }
      // };
      
      const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
      const [brandName, setBrandName] = useState("");
      const [brandNameArabic, setBrandNameArabic] = useState("");
      const [brandStatus, setBrandStatus] = useState("");
      const [brandUserId, setBrandUserId] = useState("");


      const handleShowCreatePopup = () => {
        setCreatePopupVisibility(true);
      };

      const handleCloseCreatePopup = () => {
        setCreatePopupVisibility(false);
      };


  const handleCreateBrand = async (row) => {
    console.log(row);
    setCreatePopupVisibility(true);

    setBrandName(row?.name);
    setBrandNameArabic(row?.name_ar);
    setBrandStatus(row?.status);
    setBrandUserId(row?.id);

    // integrate this put api {{v2gs1Local}}/brands/clq0y51w000007zaaduhu7c0z try catch block use
    try {
      const response = await newRequest.put(`/brands/${row?.id}`, {
        name: brandName,
        name_ar: brandNameArabic,
        status: brandStatus,
        user_id: brandUserId,
      });

      toast.success(response?.data?.message || 'Status updated successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      refreshBrandData();

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
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
                           onClick={handleAddCompany} 
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
                                    action: handleShowCreatePopup,
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
                              onClick={handleShowCreatePopup}
                              className='bg-blue-500  font-sans font-normal text-sm px-4 py-1 text-white rounded-full hover:bg-blue-600'>Add</button>
                        </div>
                        
                        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                          >
                       <DataTable data={data} 
                            title="Member Documents"
                            columnsName={GtinColumn}
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


                 {isCreatePopupVisible && (
                   <div className="popup-overlay">
                     <div className="popup-container h-auto sm:w-[45%] w-full">
                       <div className="popup-form w-full">         
                          <form onSubmit={handleCreateBrand} className='w-full'>
                            <h2 className='text-secondary font-sans font-semibold text-2xl'>Update Brands</h2>
                            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">Brand Name EN</label>
                                <input
                                  type="text"
                                  id="field1"
                                  value={brandName}
                                  onChange={(e) => setBrandName(e.target.value)}
                                  placeholder="Enter Brand Name EN"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                              </div>

                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field2" className="text-secondary">Brand Name AR </label>
                                <input
                                  type="text"
                                  id="field2"
                                  value={brandNameArabic}
                                  onChange={(e) => setBrandNameArabic(e.target.value)}
                                  placeholder="Enter Brand Name AR"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary">Status</label>
                                <select
                                  type="text"
                                  id="field1"
                                  value={brandStatus}
                                  onChange={(e) => setBrandStatus(e.target.value)}
                                  placeholder="Enter Brand Name EN"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                >
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </div>

                              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field2" className="text-secondary">User Id</label>
                                <input
                                  type="text"
                                  id="field2"
                                  value={brandUserId}
                                  onChange={(e) => setBrandUserId(e.target.value)}
                                  placeholder="User Id"
                                  className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                              </div>
                            </div>

                            {/* Create two buttons for close and create brand */}
                            <div className="w-full flex justify-center items-center gap-8 mt-5">
                              <button
                                type="button"
                                className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                                onClick={handleCloseCreatePopup}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={handleCreateBrand}
                                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                              >
                                Update Brand
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                    
        </div>
    </div>
  )
}

export default RegisteredMembersView