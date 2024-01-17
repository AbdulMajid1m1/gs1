import { useContext, useEffect, useState } from 'react'
import DataTable from '../../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../../../Contexts/DataTableContext'
import { footerMenuDataColumn } from '../../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../../utils/userRequest'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Addfootermenu from './Addfootermenu';
import Updatefootermenu from './Updatefootermenu';
import { useTranslation } from 'react-i18next';
const Footermenu = () => {

    const { t, i18n } = useTranslation();
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
        sessionStorage.setItem("updatefootermenu", JSON.stringify(row));
    };
    const { rowSelectionModel, setRowSelectionModel,
        tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

    const refreshcitiesData = async () => {
        try {
            const response = await newRequest.get("/getAllfooter_menus",);
            setData(response?.data || []);
            setIsLoading(false)
            const citiesData = response?.data || [];

            const statesResponse = await newRequest.get('/getAllmega_menu_categories');
            const statesData = statesResponse?.data || [];
            const stateIdToNameMap = {};
            statesData.forEach(state => {
                stateIdToNameMap[state.id] = state.category_name_en;
            });


            const updatedCitiesData = citiesData.map(megnumenu => ({
                ...megnumenu,
                parent_id: stateIdToNameMap[megnumenu.parent_id] || "Unknown Category",
            }));
            setData(updatedCitiesData);
            console.log('getAllmega_menu_categories', updatedCitiesData);

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
            text: `${t('You will not be able to recover this')} ${t('Footer menu')}!`,
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
                    const isDeleted = await newRequest.delete("/deletefooter_menus/" + row?.id);
                    if (isDeleted) {
                        toast.success(`${t('Footer menu')}  ${t('has been deleted')} ${t('successfully')}!`)
                        const filteredData = brandsData.filter((item) => item?.id !== row?.id);
                        setBrandsData(filteredData);
                        refreshcitiesData()
                    } else {
                        // Handle any additional logic if the user was not deleted successfully
                        toast.error('Failed to delete user');
                    }
                } catch (error) {
                    // Handle any error that occurred during the deletion
                    console.error("Error deleting user:", error);
                    toast.error(`${t('Footer menu')} {t('has been not deleted')} ${t('Delete')}!`);
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

                '<input id="unitcode" class="swal2-input" placeholder="unit code">' +

                '<input id="url" class="swal2-input" placeholder="unit code">' +

                '<input id="parentid" class="swal2-input" placeholder="unit code">',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Create Unit',
            confirmButtonAriaLabel: 'Create',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
            cancelButtonAriaLabel: 'Cancel',
            confirmButtonColor: '#021F69',

            preConfirm: () => {
                return {
                    category_name_en: document.getElementById('unitname').value,
                    category_name_ar: document.getElementById('unitcode').value,
                    url: document.getElementById('url').value,
                    parent_id: document.getElementById('parentid').value,
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

        const { category_name_en, category_name_ar, parent_id, url } = formValues;

        try {
            // Send a request to your API to add the company
            const response = await newRequest.post('/creatfooter_menus/', {
                category_name_en: category_name_en.toString(),
                category_name_ar: category_name_ar,
                parent_id: parent_id.toString(),
                url: url,
                status: '0', // You may want to modify this based on your requirements

            });

            toast.success(`Footer Menu ${category_name_en} "${category_name_ar}" has been added successfully.`, {
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
                    newRequest.post(`/creatfooter_menus`, {
                        category_name_ar: item.category_name_ar, // Adjust property names as needed
                        category_name_en: item.category_name_en.toString(),
                        parent_id: item.parent_id.toString(),
                        url: item.url,
                        status: 1
                    })
                        .then((res) => {
                            console.log('Add', res.data);

                            Swal.fire(
                                'Add!',
                                `Footer Menu has been created`,
                                'success'
                            )
                            refreshcitiesData()
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire(
                                'Error!',
                                `Some Unit code already exist`,
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
            <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
                <div>
                    <DashboardRightHeader
                        title={`${t('Footer menu')}`}
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
                                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary" >   {t('Export')}  <FileUploadIcon />
                                </CSVLink>
                            </div>
                            {/* DataGrid */}
                            <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                                <DataTable data={data}
                                    title={`${t('Footer menu')}`}
                                    columnsName={footerMenuDataColumn}
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

                {/* Addunit component with handleShowCreatePopup prop */}
                 {isCreatePopupVisible && (
                    <Addfootermenu isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={refreshcitiesData} />
                )}
                {/* Updateunit component with handleShowUpdatePopup prop */}
                {isUpdatePopupVisible && (
                    <Updatefootermenu isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={refreshcitiesData} />
                )}

            </div>
        </div>
    )
}

export default Footermenu