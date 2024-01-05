import { useContext, useEffect, useState } from 'react'
// import visitFrontend from "../../../Images/visitFrontend.png"
// import profileICon from "../../../Images/profileICon.png"
import DataTable from '../../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../../../Contexts/DataTableContext'
import { silderDataColumn } from '../../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../../utils/userRequest'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
// import Addunit from './addunit';
// import Updateunit from './updateunit';
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Addsilders from './Addsilders';
import Updatasilder from './Updatasilder';
const Sliders = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
    const [brandsData, setBrandsData] = useState([]);
    const handleShowCreatePopup = () => {
        setCreatePopupVisibility(true);
    };

    const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

    const handleShowUpdatePopup = (row) => {
        setUpdatePopupVisibility(true);
        // save this row data in session storage 
        sessionStorage.setItem("updatesilder", JSON.stringify(row));
    };
    const { rowSelectionModel, setRowSelectionModel,
        tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

    const refreshcitiesData = async () => {
        try {
            const response = await newRequest.get("/getAllsliders",);

            console.log(response.data);
            setData(response?.data || []);
            setIsLoading(false)

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    };
    useEffect(() => {

        refreshcitiesData() // Calling the function within useEffect, not inside itself
    }, []);
    const handleDelete = async (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Sliders!',
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
                    const isDeleted = await newRequest.delete("/deletesliders/" + row?.id);
                    if (isDeleted) {
                        toast.success('Sliders deleted successfully', {
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
    const handleView = (row) => {
        console.log(row);
    }
    const handleAddCompany = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Create Unit',
            html:
                '<input id="unitname" class="swal2-input" placeholder="unit Name">' +

                '<input id="unitcode" class="swal2-input" placeholder="unit code">',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Create Unit',
            confirmButtonAriaLabel: 'Create',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
            cancelButtonAriaLabel: 'Cancel',
            confirmButtonColor: '#021F69',

            preConfirm: () => {
                return {
                    caption: document.getElementById('unitname').value,
                    title: document.getElementById('unitcode').value,
                };
            },
            inputValidator: (form) => {
                if (!form.unitname || !form.unitcode) {
                    return 'Both Menu Name  are required';
                }
            },
        });

        if (!formValues) {
            return; // Cancelled or invalid input
        }
        const { caption, title, Description, imageshow, Page } = formValues;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('description',Description);
        formData.append('image', imageshow);
        formData.append('link', Page);
        formData.append('status', 0);
        try {
            // Send a request to your API to add the company
            const response = await newRequest.post('/updatesliders/', {
                caption: caption.toString(),
                title: title.toString(),
                status: '0', // You may want to modify this based on your requirements
            });
            toast.success(`Sliders ${caption} "${title}" has been added successfully.`, {
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
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file.type);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0]; // Assuming you have data in the first sheet
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                json.forEach((item) => {
                    const formData = new FormData();
                    formData.append('title', item.title);
                    formData.append('caption', item.caption);
                    formData.append('description', item.Description);
                    formData.append('image', item.imageshow);
                    formData.append('link', item.Page);
                    formData.append('status', 1);
                    newRequest.post(`/updatesliders`, formData)
                        .then((res) => {
                            console.log('Add', res.data);
                            Swal.fire(
                                'Add!',
                                `Sliders has been created`,
                                'success'
                            )
                            refreshcitiesData()
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire(
                                'Error!',
                                `Some Sliders already exist`,
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
                        title={'Sliders'}
                    />
                </div>

                <div className='flex justify-center items-center'>
                    <div className="h-auto w-[97%] px-0 pt-4">
                        <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

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
                                    title="Sliders"
                                    columnsName={silderDataColumn}
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
                {isCreatePopupVisible && (
                    <Addsilders isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshcitiesData} />
                )}
                {/* Updateunit component with handleShowUpdatePopup prop */}
                {isUpdatePopupVisible && (
                    <Updatasilder isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshcitiesData} />
                )}
            </div>
        </div>
    )
}

export default Sliders