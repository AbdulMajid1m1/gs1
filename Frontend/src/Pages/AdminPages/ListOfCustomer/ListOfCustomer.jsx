import React, { useContext, useEffect, useState } from 'react'
import { ListOfCustomersColumn, ShipmentRequestColumns } from '../../../utils/datatablesource'
import DataTable from '../../../components/Datatable/Datatable';
import newRequest from '../../../utils/userRequest';
import CustomSnakebar from '../../../utils/CustomSnackbar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SnackbarContext } from '../../../Contexts/SnackbarContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { RiseLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ListOfCustomer = () => {
    const [alldata, setAllData] = useState([]);
    const [secondGridData, setSecondGridData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [shipmentRequestLoader, setShipmentRequestLoader] = useState(false);
    const [isShipmentDataLoading, setIsShipmentDataLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { openSnackbar } = useContext(SnackbarContext);

    const getVendorData = sessionStorage.getItem("vendorData");
    const parsedVendorData = JSON.parse(getVendorData);
    console.log(parsedVendorData);


    const resetSnakeBarMessages = () => {
        setError(null);
        setMessage(null);

    };


    useEffect(() => {
        const getAllCustomers = async () => {
            setIsLoading(true)
            try {

                const response = await newRequest.get(`/getApprovedVendorMembers?email=${parsedVendorData?.user?.email}`)
                setAllData(response?.data ?? [])

            }
            catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error?.response?.data?.message || `${t('Something went wrong!')}`
                })

            }
            finally {
                setIsLoading(false)
            }


        };
        getAllCustomers();

        const getAllShipments = async () => {
            setIsShipmentDataLoading(true)

            try {

                const response = await newRequest.get("/getShipmentRequestByVendorId?vendor_id=" + parsedVendorData?.user?.id)

                setSecondGridData(response?.data ?? [])
                setFilteredData(response?.data ?? [])
            }
            catch (error) {
                console.log(error);
                // setError(error?.response?.data?.message ?? `${t('Something went wrong!')}`)

            }
            finally {
                setIsShipmentDataLoading(false)
            }
        };


        const deleteEmptyShipmentRequest = async () => {
            try {
                const response = await newRequest.delete("/deleteEmptyShipmentRequestsForVendor?vendor_id=" + parsedVendorData?.user?.id)
                console.log(response?.data)
            }
            catch (error) {
                console.log(error);
            }
            finally {
                getAllShipments();
            }
        }

        deleteEmptyShipmentRequest();


    }, []);

    const handleRowClickInParent = async (item) => {

        if (item.length === 0) {
            setFilteredData(secondGridData)
            return
        }
        // const filteredData = secondGridData.filter((singleItem) => {
        //     return Number(singleItem?.customer_id) == Number(item[0]?.id)
        // })

        // // sort the data by datetime show latest first
        // filteredData.sort((a, b) => {
        //     return new Date(b?.datetime) - new Date(a?.datetime);
        // });
        setIsShipmentDataLoading(true)
        try {

            const res = await newRequest.get("/getShipmentRequestByCustomerId?customer_id=" + item[0]?.id)
            console.log(res?.data)
            setFilteredData(res?.data ?? [])
        }

        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.message || `${t('Something went wrong!')}`,
                timer: 2000,
                timerProgressBar: true,

            })


        }
        finally {
            setIsShipmentDataLoading(false)
        }


    }


    const handleShipmentRequest = async (row) => {
        setShipmentRequestLoader(true);
        console.log(row?.id);
        // store that row data in sesstion storage
        sessionStorage.setItem("customerRowData", JSON.stringify(row));
        try {
            const response = await newRequest.post("/insertShipmentRequest", {
                vendor_id: parsedVendorData?.user?.id,
                customer_id: row?.id,
            })

            console.log(response?.data);


            console.log(response?.data)
            console.log(response?.data?.insertedShipmentRequestData)

            // save the api response in session storage
            sessionStorage.setItem("shipmentRequest", JSON.stringify(response?.data?.insertedShipmentRequestData));

            navigate("/new-shipment-request")


        }
        catch (error) {
            console.log(error);
            openSnackbar(error?.response?.data?.message ?? `${t('Something went wrong!')}`, "error");

        }
        finally {
            setShipmentRequestLoader(false);
        }
    }


    const handleStatusChange = async (selectedShipment) => {


        if (selectedShipment?.status === 'approved') {
            Swal.fire({
                icon: 'info',
                title: `${t('Shipment Request already approved')}`,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        if (selectedShipment?.status === 'submitted') {
            Swal.fire({
                icon: 'info',
                title: `${t('Shipment Request already submitted')}`,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        try {
            const res = await newRequest.put('/updateShipmentRequest', {
                shipment_id: selectedShipment.shipment_id,
                status: "submitted"
            });

            // change the status in the table
            const updatedData = filteredData.map((shipment) => {
                if (shipment.shipment_id === selectedShipment.shipment_id) {
                    return {
                        ...shipment,
                        status: "submitted",
                    };
                }
                return shipment;
            });
            setFilteredData(updatedData);

            Swal.fire({
                icon: 'success',
                title: `${t('Shipment Request already submitted')}`,
                showConfirmButton: false,
                timer: 2000,
            });

            return;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to update status!';
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to update Status',
                text: errorMessage,
                showConfirmButton: true,
            });
            return;
        }

    };


    const handleShipmentDelete = async (row) => {
        Swal.fire({
            title: `${t('Are you sure to delete this record?')}!`,
            text: `${t('You will not be able to recover')}!`,
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
                    // convert row id to number
                    const shipment_id = Number(row.shipment_id);
                    console.log(row);
                    console.log(shipment_id);
                    await newRequest.delete("/deleteShipmentRequest?shipment_id=" + shipment_id);


                    const updatedData = filteredData.filter((item) => item?.shipment_id !== row?.shipment_id);
                    setFilteredData(updatedData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${t('Record has been deleted')}`,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                catch (err) {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err?.response?.data?.message || `${t('Something went wrong!')}`
                    })
                    return
                }

                // filter out the deleted user from the data

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return
            }
        })
    }

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

            <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
                <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-25px' }}>
                    <DataTable
                        data={alldata}
                        title={`${t('LIST OF CUSTOMERS')}`}
                        secondaryColor="secondary"
                        columnsName={ListOfCustomersColumn(t)}
                        backButton={true}
                        uniqueId="customerListId"
                        handleRowClickInParent={handleRowClickInParent}
                        loading={isLoading}
                        checkboxSelection='disabled'

                        dropDownOptions={[
                            {
                                label: `${t('New Shipment Request')}`,
                                icon: <LocalShippingIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                                ,
                                action: handleShipmentRequest,
                            },
                            // {
                            //   label: "Delete",
                            //   icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                            //   ,
                            //   action: handleDelete,
                            // }

                        ]}

                    />
                </div>

                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
                    <DataTable data={filteredData} 
                        title={`${t('LIST OF CUSTOMERS SHIPMENT REQUEST')}`}
                        secondaryColor="secondary"
                        columnsName={ShipmentRequestColumns(t)}
                        backButton={true}
                        checkboxSelection="disabled"
                        dropDownOptions={[
                            {
                                label: `${t('View')}`,
                                icon: (
                                    <VisibilityIcon
                                        fontSize="small"
                                        color="action"
                                        style={{ color: "rgb(37 99 235)" }}
                                    />
                                ),
                                action: (row) => {
                                    sessionStorage.setItem("shipmentRequest", JSON.stringify(row));
                                    navigate("/new-shipment-request")

                                },
                            },
                            {
                                label: `${t('Submit Request')}`,
                                icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                                ,
                                action: handleStatusChange,

                            },
                            {
                                label: `${t('Delete')}`,
                                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                                ,
                                action: handleShipmentDelete,
                            },
                        ]}
                        uniqueId={"shipmentRequestId"}
                        loading={isShipmentDataLoading}

                    />
                </div>

            </div>
        </div >
    )
}

export default ListOfCustomer