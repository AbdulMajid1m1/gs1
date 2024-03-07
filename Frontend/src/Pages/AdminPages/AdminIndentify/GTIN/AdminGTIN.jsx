import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import { GtinColumn } from "../../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSnakebar from '../../../../utils/CustomSnackbar';
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../../../Images/gs1logowhite.png"
import { DataTableContext } from "../../../../Contexts/DataTableContext";
import newRequest from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import Barcode from "react-barcode";
import bwipjs from "bwip-js";
import { debounce } from '@mui/material/utils';
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import AdminDashboardRightHeader from "../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader";
import { useTranslation } from 'react-i18next';
import { selectedLanguage } from "../../../../utils/config";

const Gtin = () => {
  const [data, setData] = useState([]);
  // const memberDataString = sessionStorage.getItem('memberData');
  // const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  // const cartItemData = JSON.parse(memberData?.carts[0]?.cart_items);
  // console.log(cartItemData);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows, tableSelectedExportRows, setTableSelectedExportRows } = useContext(DataTableContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
  const [isExportBarcode, setIsExportBarcode] = useState(false);
  const navigate = useNavigate()

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();
  const resetSnakeBarMessages = () => {
    setError(null);
    setMessage(null);

  };

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedCr, setSelectedCr] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [crList, setCrList] = useState([]);
  const abortControllerRef = React.useRef(null);

  const handleGPCAutoCompleteChange = (event, value) => {
    setSelectedCr(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    if (value) {
      fetchData(value);
    }
  }

  const [details, setDetails] = useState([])

  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    console.log(reason);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      setCrList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setCrList([]);
      // setSelectedCr(null);
      return;
    }

    console.log(newInputValue);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort previous request
    }
    abortControllerRef.current = new AbortController(); // Create a new controller for the new request

    try {
      setAutocompleteLoading(true);
      setOpen(true);

      const res = await newRequest.get(`/users/search?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);

      const crs = res?.data?.map(item => {
        return {
          user_id: item.id,
          gcpGLNID: item.gcpGLNID,
          gln: item.gln,
          memberID: item.memberID,
          companyID: item.companyID,
          company_name_eng: item.company_name_eng,
          email: item.email,
          mobile: item.mobile,
          gcp_type: item.gcp_type,
        };
      });

      setCrList(crs);
      setDetails(res?.data[0]);

      setOpen(true);
      setAutocompleteLoading(false);

      // fetchData();

    } catch (error) {
      console.error(error);
      setCrList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);

  const [totalCategory, setTotalCategory] = useState([])
  const [allSearchMemberDetails, setAllSearchMemberDetails] = useState('')

  const fetchData = async (value) => {
    setIsLoading(true);
    console.log(value);
    setAllSearchMemberDetails(value);
    try {
      const response = await newRequest.get(`/products?user_id=${value?.user_id}`);
      const gtinResponse = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${value?.user_id}&isDeleted=false`);
      setData(response?.data || []);
      setTotalCategory(gtinResponse?.data?.gtinSubscriptions[0]?.gtin_product?.member_category_description);
      console.log(response.data);
      // console.log(gtinResponse?.data?.gtinSubscriptions[0]?.gtin_product?.member_category_description);
      // console.log(totalCategory)

      if (response?.data?.length === 0) {
        setTotalCategory('Category C', []);
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };




  // const fetchData = async () => {
  //   try {
  //     const response = await newRequest.get(`/products?user_id=${memberData?.id}`);
  //     console.log(response.data);
  //     setData(response?.data || []);
  //     setIsLoading(false)

  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false)
  //   }
  // };


  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleEdit = (row) => {
    console.log(row);
    navigate("/admin/admin-update-gtin/" + row?.id);
    // navigate("/upate-gtin-product/" + row?.id);
  };

  const handleView = (row) => {
    console.log(row);
    navigate("/admin/admin-view-gtin/" + row?.id);
  };

  const handleAddGtin = (row) => {
    if (!allSearchMemberDetails) {
      toast.error(`${t('Please select a member first')}!`);
      return;
    }
    navigate("/admin/admin-gtin");
    sessionStorage.setItem("selectedAddGtinData", JSON.stringify(allSearchMemberDetails));
  }

  const handleDigitalUrlInfo = (row) => {
    sessionStorage.setItem("selectedGtinData", JSON.stringify(row));
    navigate("/admin/admin-digitalurl")
  }

  const handleDelete = async (row) => {
    try {
      const deleteResponse = await newRequest.delete(`/products/gtin/${row?.id}`);
      console.log(deleteResponse.data);
      toast.success(`${t('The product has been deleted successfully')}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      // Update the datagrid Table after deletion
      setData(prevData => prevData.filter(item => item.id !== row?.id));


    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || 'Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };



  const handleExportProducts = () => {
    if (!tableSelectedExportRows || tableSelectedExportRows.length === 0) {
      toast.error(`${t('Please select at least one row for export')}!`);
      return;
    }

    // Convert data to Excel format
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tableSelectedExportRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Rows');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'gtin_products.xlsx');

    // Print data of selected rows
    console.log('Selected Rows Data:', tableSelectedExportRows);

    setTableSelectedExportRows([]);
    setRowSelectionModel([]);
  };


  const handleExportProductsTemplate = () => {
    // Mapping of original headers to desired headers
    const headerMapping = {
      productnameenglish: 'ProductNameEnglish',
      productnamearabic: 'ProductNameArabic',
      BrandName: 'BrandName',
      BrandNameAr: 'BrandNameAr',
      ProductType: 'ProductType',
      Origin: 'Country Of Origin',
      countrySale: 'Country of Sale',
      PackagingType: 'PackagingType',
      MnfCode: 'MnfCode',
      MnfGLN: 'MnfGLN',
      ProvGLN: 'ProvGLN',
      gpc_code: 'GPC Code',
      prod_lang: 'Product Language Code',
      details_page: 'DetailsPage',
      unit: 'UOM',
      size: 'Size',
      barcode: 'GTIN'
    };

    // Create a new array with the desired headers in the specified order
    const desiredHeaders = Object.values(headerMapping);

    // Create a worksheet with only headers
    const headerWorksheet = XLSX.utils.json_to_sheet([{}], { header: desiredHeaders });

    // Create a workbook and append the header worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, headerWorksheet, 'Header Only');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'gtin_products_template.xlsx');
  };





  // // file Import
  // const [selectedFile, setSelectedFile] = useState(null);

  // const fileInputRef = useRef(null);

  // const handleImportClick = () => {
  //   fileInputRef.current.click();
  // };

  //   const handleFileInputChange = (event) => {
  //     const selectedFile = event.target.files[0];
  //     setIsLoading(true);


  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append('file', selectedFile);
  //       formData.append('user_id', memberData?.id);
  //       formData.append('email', memberData?.email);

  //       newRequest.post('/products/bulkGtin', formData)
  //         .then((response) => {
  //           // Handle the successful response
  //           console.log(response.data);

  //           toast.success('The data has been imported successfully.', {
  //             position: 'top-right',
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             theme: 'light',
  //           });

  //           setIsLoading(false)

  //         })
  //         .catch((error) => {
  //           // Handle the error
  //           console.error(error);

  //           toast.error('Something is Wrong', {
  //             position: 'top-right',
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             theme: 'light',
  //           });

  //           setIsLoading(false)

  //         });
  //     }
  //   };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setIsLoading(true);

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user_id', allSearchMemberDetails?.user_id);
      formData.append('email', allSearchMemberDetails?.email);

      newRequest.post('/products/bulkGtin?selectedLanguage=' + selectedLanguage, formData)
        .then((response) => {
          // Handle the successful response
          console.log(response.data);

          if (response.data && response.data.errors && response.data.errors.length > 0) {
            // Display a generic error message
            toast.error(response.data.errors[0].error);
          }
          else {
            // Display a generic success message
            toast.success(response?.data?.message || `${t('The data has been imported successfully')}`);
          }

          setIsLoading(false);
          // Clear the file input value
          event.target.value = '';

          // fetchData();
        })
        .catch((error) => {
          // Handle the error
          console.error(error);

          toast.error(error?.response?.data?.error ?? `${t('Something is Wrong')}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          });

          // Clear the file input value
          event.target.value = '';
          setIsLoading(false);
        });
    }
  };


  // Gtin Page Print
  const handleGtinPage = () => {
    if (tableSelectedRows.length === 0) {
      setError(`${t('Please select a row to print')}`);
      return;
    }
    const printWindow = window.open('', 'Print Window', 'height=400,width=800');
    const html = '<html><head><title>GTIN 2D Barcode</title>' +
      '<style>' +
      '@page { size: 3in 2in; margin: 0; }' +
      'body { font-size: 13px; line-height: 0.1;}' +
      '#header { display: flex; justify-content: center;}' +
      '#imglogo {height: 50px; width: 100px; visibility: hidden;}' +
      '#itemcode { font-size: 13px; font-weight: 600; display: flex; justify-content: center;}' +
      '#inside-BRCode { display: flex; justify-content: center; align-items: center; padding: 1px;}' +
      '#itemSerialNo { font-size: 13px; display: flex; justify-content: center; font-weight: 600; margin-top: 3px;}' +
      '#Qrcodeserails { height: 100%; width: 100%;}' +
      '</style>' +
      '</head><body>' +
      '<div id="printBarcode"></div>' +
      '</body></html>';

    printWindow.document.write(html);
    const barcodeContainer = printWindow.document.getElementById('printBarcode');
    const barcode = document.getElementById('barcode').cloneNode(true);
    barcodeContainer.appendChild(barcode);

    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = function () {
      // printWindow.document.getElementById('imglogo').src = logoImg.src;
      printWindow.print();
      printWindow.close();
      setTimeout(() => {
        setTableSelectedRows([]);
        setRowSelectionModel([]);
      }, 500);

    };
  }



  // 2d Barcode Page Print
  const handle2dBarcodePage = () => {
    if (tableSelectedRows.length === 0) {
      setError(`${t('Please select a row to print')}`);
      return;
    }
    const printWindow = window.open('', 'Print Window', 'height=400,width=800');
    const html = '<html><head><title>GTIN 1D Barcode</title>' +
      '<style>' +
      '@page { size: 3in 2in; margin: 0; }' +
      'body { font-size: 13px; line-height: 0.1;}' +
      '#header { display: flex; justify-content: center;}' +
      '#imglogo {height: 50px; width: 100px; visibility: hidden;}' +
      '#itemcode { font-size: 13px; font-weight: 600; display: flex; justify-content: center;}' +
      '#inside-BRCode { display: flex; justify-content: center; align-items: center; padding: 1px;}' +
      '#itemSerialNo { font-size: 13px; display: flex; justify-content: center; font-weight: 600; margin-top: 3px;}' +
      '#Qrcodeserails { height: 100%; width: 100%;}' +
      '</style>' +
      '</head><body>' +
      '<div id="printBarcode"></div>' +
      '</body></html>';

    printWindow.document.write(html);
    const barcodeContainer = printWindow.document.getElementById('printBarcode');
    const barcode = document.getElementById('2dbarcode').cloneNode(true);
    barcodeContainer.appendChild(barcode);

    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = function () {
      // printWindow.document.getElementById('imglogo').src = logoImg.src;
      printWindow.print();
      printWindow.close();
      setTimeout(() => {
        setTableSelectedRows([]);
        setRowSelectionModel([]);
      }, 500);

    };
  }


  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      setTableSelectedExportRows(item)
      setFilteredData(data)
      return
    }

    const barcodes = item.map((row) => row.barcode);
    console.log(barcodes); // This will log an array of barcodes
    setTableSelectedRows(barcodes);
  }



  return (
    <div>
      {/* <SideBar /> */}

      {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
      {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />}


      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        {/* <div className='h-auto w-full shadow-xl'> */}
        <div>
          <AdminDashboardRightHeader title={"GTIN"} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              <div className={`flex justify-center sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  onClick={handleAddGtin}
                  className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary">

                  {i18n.language === 'ar' ? (
                    <>
                      {t('Add Product')}   <i className="fas fa-plus mr-1"></i>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-1"></i> {t('Add Product')}
                    </>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsExportBarcode(!isExportBarcode)}
                    className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">

                    {i18n.language === 'ar' ? (
                      <>
                        <i className="fas fa-caret-down ml-1"></i>   {t('Export Bulk Barcodes')}
                      </>
                    ) : (
                      <>
                        {t('Export Bulk Barcodes')}    <i className="fas fa-caret-down ml-1"></i>
                      </>
                    )}
                  </button>

                  {isExportBarcode && (
                    <div className="h-20 w-full flex flex-col gap-2 absolute bg-white shadow-xl rounded-md px-2 py-1">
                      <p onClick={handle2dBarcodePage} className="text-secondary font-sans w-full hover:bg-yellow-100 hover:font-semibold px-3 cursor-pointer">1D Barcode</p>
                      <p onClick={handleGtinPage} className="text-secondary font-sans w-full hover:bg-yellow-100 hover:font-semibold px-3 cursor-pointer">2D Barcode</p>
                    </div>
                  )}
                </div>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                  onClick={handleExportProducts}
                >
                  {i18n.language === 'ar' ? (
                    <>
                      <i className="fas fa-caret-down ml-1"></i> {t('Export in Excel')}
                    </>
                  ) : (
                    <>
                      {t('Export in Excel')}   <i className="fas fa-caret-down ml-1"></i>
                    </>
                  )}
                </button>

                <div>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                  <button
                    className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >

                    {i18n.language === 'ar' ? (
                      <>
                        {t('Import')}  <i className="fas fa-file-import mr-1"></i>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-file-import mr-1"></i>  {t('Import')}
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleExportProductsTemplate}
                  className="rounded-full bg-[#1E3B8B] font-body px-4 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">

                  {i18n.language === 'ar' ? (
                    <>
                      <i className="fas fa-caret-down ml-1"></i>  {t('Download Template')}
                    </>
                  ) : (
                    <>
                      {t('Download Template')} <i className="fas fa-caret-down ml-1"></i>
                    </>
                  )}
                </button>

                {/* <button
              onClick={handleExportProducts}
              className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-download mr-1"></i> Download
            </button> */}
              </div>

              <div className={`flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3 mt-4 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  GCP {allSearchMemberDetails?.gcpGLNID}
                </button>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  {totalCategory ? `${totalCategory}` : 'Category C'}
                </button>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  {t('Member ID')} {allSearchMemberDetails?.memberID}
                  {/* Member ID */}
                </button>

                <button
                  onClick={handleGtinPage}
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">

                  {i18n.language === 'ar' ? (
                    <>
                      GTIN {t('Print')}
                    </>
                  ) : (
                    <>
                      {t('Print')} GTIN
                    </>
                  )}
                </button>
              </div>


              <div className="px-3">
                <Autocomplete
                  id="companyName"
                  required
                  options={crList}
                  // gcpGLNID: item.gcpGLNID,
                  // gln: item.gln,
                  // memberID: item.memberID,
                  // companyID: item.companyID,
                  // company_name_eng: item.company_name_eng,
                  // email: item.email,
                  // mobile: item.mobile,
                  getOptionLabel={(option) => (option && option.user_id) ? `${option?.gcpGLNID} - ${option?.company_name_eng} - ${option?.memberID} - ${option?.email} - ${option?.mobile} ` : ''}
                  onChange={handleGPCAutoCompleteChange}
                  value={selectedCr?.cr}
                  onInputChange={(event, newInputValue, params) => debouncedHandleAutoCompleteInputChange(event, newInputValue, params)}
                  loading={autocompleteLoading}
                  sx={{ marginTop: '10px' }}
                  open={open}
                  onOpen={() => {
                    // setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  renderOption={(props, option) => (
                    <li key={option.user_id} {...props}>
                      {option ? `${option.gcpGLNID} - ${option.company_name_eng} - ${option.memberID} - ${option.email} - ${option.mobile}` : 'No options'}
                    </li>
                  )}


                  renderInput={(params) => (
                    <TextField
                      // required
                      error={isSubmitClicked && !selectedCr?.cr}
                      helperText={isSubmitClicked && !selectedCr?.cr ? "Products is required" : ""}
                      {...params}
                      label={`${t('Search Members')}`}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {autocompleteLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      sx={{
                        '& label.Mui-focused': {
                          color: '#00006A',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#00006A',
                        },
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#000000',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000000',
                          },
                        },
                      }}
                    />
                  )}

                />

              </div>


              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data} title={t('GTIN LIST')} columnsName={GtinColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}
                  uniqueId="customerListId"

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
                      icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      action: handleEdit

                    },
                    // {
                    //   label: `${t('Digital Links')}`,
                    //   icon: (
                    //     <VisibilityIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleDigitalUrlInfo,
                    // }
                    // ,
                    {
                      label: `${t('Delete')}`,
                      icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                      ,
                      action: handleDelete,
                    }

                  ]}

                />
              </div>



              <div id="barcode">
                {tableSelectedRows?.map((barcode, index) => (
                  <div id="Qrcodeserails" className="hidden" key={index}>
                    <div id="header">
                      <div>
                        <img src={logo} id="imglogo" alt="" />
                      </div>
                    </div>
                    <div id="inside-BRCode">
                      <QRCodeSVG value={barcode} width="170" height="70" />
                    </div>
                    <div id="itemSerialNo">
                      {/* {barcode} */}
                    </div>
                  </div>
                ))}
              </div>



              {/* 2d Barcode */}
              <div id="2dbarcode">
                {tableSelectedRows?.map((barcode, index) => (
                  <div id="Qrcodeserails" className="hidden" key={index}>
                    <div id="header">
                      <div>
                        <img src={logo} id="imglogo" alt="" />
                      </div>
                    </div>
                    <div id="inside-BRCode">
                      <Barcode value={barcode} width={1.9} height={65} />
                    </div>
                    <div id="itemSerialNo">
                      {/* {barcode} */}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gtin