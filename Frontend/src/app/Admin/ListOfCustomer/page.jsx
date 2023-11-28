'use client';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from '../Datatable/Datatable';
import { ListOfCustomersColumn } from '../utils/datatablesource'
import SideBar from '../sidebar/page';
// import newRequest from '../../utils/userRequest';
// import CustomSnakebar from '../../utils/CustomSnackbar';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { SnackbarContext } from '../../Contexts/SnackbarContext';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import { RiseLoader } from 'react-spinners';
// import DeleteIcon from '@mui/icons-material/Delete';

// import Swal from 'sweetalert2';
const ListOfCustomer = () => {
    const [alldata, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [shipmentRequestLoader, setShipmentRequestLoader] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const resetSnakeBarMessages = () => {
        setError(null);
        setMessage(null);

    };


    // useEffect(() => {
    //     const getAllCustomers = async () => {
    //         setIsLoading(true)
    //         try {

    //             const response = await newRequest.get(`/getApprovedVendorMembers?email=${parsedVendorData?.user?.email}`)
    //             setAllData(response?.data ?? [])

    //         }
    //         catch (error) {
    //             console.log(error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 text: error?.response?.data?.message || 'Something went wrong'
    //             })

    //         }
    //         finally {
    //             setIsLoading(false)
    //         }


    //     };
    //     getAllCustomers();
    // }, []);

    // const handleRowClickInParent = async (item) => {

    //     if (item.length === 0) {
    //         setFilteredData(secondGridData)
    //         return
    //     }
    //     // const filteredData = secondGridData.filter((singleItem) => {
    //     //     return Number(singleItem?.customer_id) == Number(item[0]?.id)
    //     // })

    //     // // sort the data by datetime show latest first
    //     // filteredData.sort((a, b) => {
    //     //     return new Date(b?.datetime) - new Date(a?.datetime);
    //     // });
    //     setIsShipmentDataLoading(true)
    //     try {

    //         const res = await newRequest.get("/getShipmentRequestByCustomerId?customer_id=" + item[0]?.id)
    //         console.log(res?.data)
    //         setFilteredData(res?.data ?? [])
    //     }

    //     catch (error) {
    //         console.log(error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: error?.response?.data?.message || 'Something went wrong',
    //             timer: 2000,
    //             timerProgressBar: true,

    //         })


    //     }
    //     finally {
    //         setIsShipmentDataLoading(false)
    //     }


    // }


    // const handleShipmentDelete = async (row) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You will not be able to recover this Record!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, keep it',
    //         // changes the color of the confirm button to red
    //         confirmButtonColor: '#1E3B8B',
    //         cancelButtonColor: '#FF0032',
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 // convert row id to number
    //                 const shipment_id = Number(row.shipment_id);
    //                 console.log(row);
    //                 console.log(shipment_id);
    //                 await newRequest.delete("/deleteShipmentRequest?shipment_id=" + shipment_id);


    //                 const updatedData = filteredData.filter((item) => item?.shipment_id !== row?.shipment_id);
    //                 setFilteredData(updatedData);
    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Deleted!',
    //                     text: 'Record has been deleted.',
    //                     showConfirmButton: false,
    //                     timer: 2000,
    //                 });
    //             }
    //             catch (err) {
    //                 console.log(err);
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Oops...',
    //                     text: err?.response?.data?.message || 'Something went wrong'
    //                 })
    //                 return
    //             }

    //             // filter out the deleted user from the data

    //         } else if (result.dismiss === Swal.DismissReason.cancel) {
    //             return
    //         }
    //     })
    // }

    return (



        <div>

            {shipmentRequestLoader &&

                <div className='loading-spinner-background'
                    style={{
                        zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


                    }}
                >
                    <RiseLoader
                        size={18}
                        color={"#6439ff"}
                        // height={4}
                        loading={shipmentRequestLoader}
                    />
                </div>
            }


            {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
            {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />}

            <SideBar />
            
            <div className="p-3 h-full sm:ml-72">
                <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-25px' }}>
                    <DataTable
                        data={alldata}
                        title="LIST OF CUSTOMERS"
                        secondaryColor="secondary"
                        columnsName={ListOfCustomersColumn}
                        backButton={true}
                        uniqueId="customerListId"
                        // handleRowClickInParent={handleRowClickInParent}
                        loading={isLoading}
                        checkboxSelection='disabled'

                        // dropDownOptions={[
                        //     {
                        //         label: "New Shipment Request",
                        //         icon: <LocalShippingIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                        //         ,
                        //         action: handleShipmentRequest,
                        //     },
                        //     {
                        //       label: "Delete",
                        //       icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                        //       ,
                        //       action: handleDelete,
                        //     }

                        // ]}

                    />
                </div>

            </div>
        </div >
    )
}

export default ListOfCustomer