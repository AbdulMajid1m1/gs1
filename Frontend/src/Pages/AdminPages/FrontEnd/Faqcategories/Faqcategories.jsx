import { useContext, useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { FaqCategoriesDataColumn } from '../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../utils/userRequest'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Addfaqcategories from './Addfaqcategories';
import Updafaqcategores from './Updafaqcategores';
import { useTranslation } from 'react-i18next';
const Faqcategories = () => {

    const { t } = useTranslation();
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
        sessionStorage.setItem("updatemenfaqCategories", JSON.stringify(row));
    };
    const { rowSelectionModel, setRowSelectionModel,
        tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);
    const refreshcitiesData = async () => {
        try {
            const response = await newRequest.get("/getAllfaq_categories",);

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
            title: `${t('Are you sure to delete this record?')}!`,
            text: `${t('You will not be able to recover this')} ${t('Faq Categories')}!`,
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
                    const isDeleted = await newRequest.delete("/deletefaq_categories/" + row?.id);
                    if (isDeleted) {
                        toast.success(`${t('Faq Categories')}  ${t('has been deleted')} ${t('successfully')}!`, {
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
                    toast.error(`${t('Faq Categories')} ${t('has been not deleted')} ${t('Delete')}!`, {
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
            title: 'Create Faq Categories',
            html:
                '<input id="unitname" class="swal2-input" placeholder="unit Name">',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Create Unit',
            confirmButtonAriaLabel: 'Create',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
            cancelButtonAriaLabel: 'Cancel',
            confirmButtonColor: '#021F69',

            preConfirm: () => {
                return {
                    name: document.getElementById('unitname').value,
                };
            },
            inputValidator: (form) => {
                if (!form.unitname) {
                    return ' Name are required';
                }
            },
        });

        if (!formValues) {
            return; // Cancelled or invalid input
        }

        const { name, slug } = formValues;

        try {
            // Send a request to your API to add the company
            const response = await newRequest.post('/createfaq_categories/', {
                name: name.toString(),
            });

            toast.success(`Faq  Categories ${name} has been added successfully.`, {
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
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                json.forEach((item) => {
                    newRequest.post(`/createfaq_categories`, {
                        name: item.name.toString(),
                    })
                        .then((res) => {
                            console.log('Add', res.data);

                            Swal.fire(
                                'Add!',
                                `Faq Categories has been created`,
                                'success'
                            )
                            refreshcitiesData()
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire(
                                'Error!',
                                `Some Faq  Categoriess already exist`,
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
                        title={`${t('Faq Categories')}`}
                    />
                </div>

                <div className='flex justify-center items-center'>
                    <div className="h-auto w-[97%] px-0 pt-4">
                        <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                            <div className='flex justify-start sm:justify-start items-center flex-wrap gap-2 py-7 px-3'>
                                <button
                                    onClick={handleShowCreatePopup}
                                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                                    <i className="fas fa-plus mr-2"></i>{t('Add')}
                                </button>
                                <div className="relative">
                                    <button
                                        className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary cursor-pointer"
                                    >
                                        <i className="fas fa-file-import mr-1"></i> {t('Import')}
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
                                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary" >  {t('Export')}  <FileUploadIcon />
                                </CSVLink>
                            </div>
                            {/* DataGrid */}
                            <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                                <DataTable data={data}
                                    title={`${t('Faq Categories')}`}
                                    columnsName={FaqCategoriesDataColumn}
                                    loading={isLoading}
                                    secondaryColor="secondary"
                                    handleRowClickInParent={handleRowClickInParent}

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
                                            action: handleView,
                                        },
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

                {isCreatePopupVisible && (
                    <Addfaqcategories isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshcitiesData} />
                )}
                {isUpdatePopupVisible && (
                    <Updafaqcategores isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshcitiesData} />
                )}

            </div>
        </div>
    )
}

export default Faqcategories