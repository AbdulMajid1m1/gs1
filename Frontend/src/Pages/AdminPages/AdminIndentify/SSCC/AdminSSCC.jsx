import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Barcode from "react-barcode";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../../../Images/logo.png";
import DataTable from '../../../../components/Datatable/Datatable';
import { ViewSsccColumn } from '../../../../utils/datatablesource';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
// import BulkPopUp from './BulkPopUp';
import { debounce } from '@mui/material/utils';
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { useTranslation } from 'react-i18next';
import AdminBulkPopUp from './AdminBulkPopUp';
  

const AdminSSCC = () => {
    const [data, setData] = useState([]);
    const { rowSelectionModel, setRowSelectionModel,
      tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    // const memberDataString = sessionStorage.getItem('memberData');
    // const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  const { t, i18n } = useTranslation();
  
    const [updatedRows, setUpdatedRows] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]); // for the map markers
    const [allSearchMemberDetails, setAllSearchMemberDetails] = useState('')
    const navigate = useNavigate()
    

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
  
      if(value) {
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
  
  
    const fetchData = async (value) => {
      setIsLoading(true);
      console.log(value);
      setAllSearchMemberDetails(value);
      try {
        const response = await newRequest.get(`/sscc?user_id=${value?.user_id}`);
        console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false)
  
      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    };
  

    // const fetchData = async () => {
    //   try {
    //       // /member/sscc/list
    //     const response = await newRequest.get(`/sscc?user_id=${memberData?.id}`)
    //     console.log(response.data);
    //     setData(response?.data);

    //     setFilteredData(response?.data)
    //     setIsLoading(false)
    //   } 
    //   catch (err) {
    //     console.log(err);
    //     setIsLoading(false)
    //   }
    // };
    
    // useEffect(() => {
    //   fetchData(); // Calling the function within useEffect, not inside itself
    // }, []); // Empty array dependency ensures this useEffect runs once on component mount


    
    const handleEdit = (row) => {
    //   console.log(row);
      navigate("/admin/admin-update-sscc/" + row?.id)
    }

    const handleAddSSCC = (row) => {
      // console.log(row);
      navigate('/admin/admin-addsscc')
      sessionStorage.setItem("selectedAddSSCCData", JSON.stringify(allSearchMemberDetails));
    }
  
            
    const handleDelete = async (row) => {
        try {
          const deleteResponse = await newRequest.delete(`/sscc/${row?.id}`);
          console.log(deleteResponse.data);
          const successMessage = deleteResponse.data.message;
            console.log(successMessage);

          toast.success(successMessage || `${t('SSCC')}  ${t('deleted successfully')}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                });


          // Update the datagrid Table after deletion
          setData(prevData => prevData.filter(item => item.id !== row?.id));

          // Handle the success message or update the data accordingly
        } catch (err) {
          console.log(err);

            toast.error(err?.response?.data?.error || 'Error', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                });
        }
      };

      const [isBulkPopupVisible, setBulkPopupVisibility] = useState(false);
      const handleShowBulkPopup = () => {
        setBulkPopupVisibility(true);
      };

      
      // Print Page
  const handlePrint = (row) => {
    console.log(row);
    setUpdatedRows(row);
    if (row.length === 0) {
      openSnackbar('Please select a row to print.');
      return;
    }

  };
  // useEffect hook to listen for changes in the updatedRows state
  useEffect(() => {
    // Check if the updatedRows state has been set
    if (updatedRows) {
      // Open a new window/tab with only the QR code
      const printWindow = window.open('', 'Print Window', 'height=400,width=800');
      const html = '<html><head><title>SSCC Barcode</title>' +
        '<style>' +
        '@page { size: 4in 6in; margin: 0; }' +
        'body { font-size: 13px; line-height: 0.3; border: 1px solid black;}' +
        '#header { display: flex; justify-content: space-between; padding: 10px;}' +
        '#imglogo {height: 40px; width: 100px;}' +
        '#inside-heading { display: flex; justify-content: space-between; align-items: center; padding: 25px; margin-top: -30px; font-weight: 500; font-family: AwanZaman Regular;}' +
        '#first-QRCode { padding: 10px;}' +
        '#inside-header-second { display: flex; justify-content: space-between; align-items: center; padding: 25px; margin-top: -60px; font-weight: 500; font-family: AwanZaman Regular;}' +
        '#inside-header-third { padding: 25px; gap: 5px; margin-top: -50px; font-weight: 500; font-family: AwanZaman Regular;}' +
        '#inside-body { display: flex; justify-content: space-between; padding: 15px;}' +
        '#inside-QRCode { display: flex; justify-content: center; align-items: center; padding: 5px;}' +
        '#inside-BRCode { display: flex; justify-content: center; align-items: center; padding: 5px;}' +
        '#paragh { font-size: 15px; font-weight: 600; }' +
        '#paragh-header { display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: 600; }' +
        '#paragh-body { font-size: 21px; font-weight: 600; margin-top: -4px;}' +
        '</style>' +
        '</head><body>' +
        '<div style="">' +
        '</div>' +
        '<div style="">' +
        '<div id="barcode"></div>' +
        '</div>' +
        '<div id="qrcode"></div>' +
        '<p id="parag"></p>' +
        '</body></html>';

      printWindow.document.write(html);
      const barcodeContainer = printWindow.document.getElementById('barcode');
      const barcode = document.getElementById('barcode').cloneNode(true);
      barcodeContainer.appendChild(barcode);

      // Add logo image to document
      const logoImg = new Image();
      logoImg.src = logo; // Make sure 'logo' contains the correct image URL or path

      logoImg.onload = function () {
        const printWindowLogoImg = printWindow.document.getElementById('imglogo');
        if (printWindowLogoImg) {
          printWindowLogoImg.src = logoImg.src;

          printWindow.print();
          printWindow.close();

          // Clear the updatedRows state after printing
          setUpdatedRows('');
        }
      };
    }
  }, [updatedRows]);
// };

    
 // Gtin Page Print
 const handleSSCCPage = () => {
  if (tableSelectedRows.length === 0) {
   setError('Please select a row to print.');
   return;
 }
 const printWindow = window.open('', 'Print Window', 'height=400,width=800');
 const html = '<html><head><title>GLN Barcode Number</title>' +
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
 const barcode = document.getElementById('SSCCbarcode').cloneNode(true);
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
    setFilteredData(data)
    return
  }
  setFilteredData(item)

  const barcodes = item.map((row) => row.SSCCBarcodeNumber);
    console.log(barcodes); // This will log an array of barcodes
    setTableSelectedRows(barcodes);
}

  
    return (
        <div>
    
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
                {/* <div className='h-auto w-full'>
                    <div className='h-16 w-full shadow-xl flex justify-start items-center px-5 border-l-2 border-t-2 border-r-2 border-[#e49515]'>
                        <p className='sm:text-2xl text-sm font-body'>View SSCC</p>
                    </div>
                </div> */}

                <div>
            <AdminDashboardRightHeader title={`${t('SSCC')}`} />
                </div>

                {/* <div className='h-auto w-full shadow-xl'> */}
                <div className='flex justify-center items-center'>
                  <div className="h-auto w-[97%] px-0 pt-4">
                    <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">
                    <div>
                    <div className={`flex justify-center sm:justify-start items-center flex-wrap gap-2 py-5 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                       
                    <button onClick={() => navigate(-1)} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                      {i18n.language === 'ar' ? (
                        <>
                          {t('Back')} <i className="fas fa-arrow-right ml-1"></i>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-arrow-left mr-1"></i> {t('Back')}
                        </>
                      )}
                    </button>

                        <button onClick={handleAddSSCC} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                     {i18n.language === 'ar' ? (
                        <>
                          {t('Add SSCC')} <i className="fas fa-plus mr-1"></i>
                        </>
                      ) : (
                        <>
                            <i className="fas fa-plus mr-1"></i> {t('Add SSCC')}
                        </>
                      )}
                        </button>

                        <button 
                        onClick={handleShowBulkPopup} // Show the bulk SSCC popup on click
                          className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                        
                      {i18n.language === 'ar' ? (
                        <>
                          {t('Bulk SSCC')} <i className="fas fa-archive mr-1"></i> 
                        </>
                      ) : (
                        <>
                            <i className="fas fa-archive mr-1"></i>  {t('Bulk SSCC')}
                        </>
                      )}
                        </button>

                        <button 
                        onClick={handleSSCCPage} // Show the bulk SSCC popup on click
                          className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary ">
                         
                      {i18n.language === 'ar' ? (
                        <>
                          {t('Print SSCC')} <i className="fas fa-print mr-1"></i>
                        </>
                      ) : (
                        <>
                            <i className="fas fa-print mr-1"></i>  {t('Print SSCC')}
                        </>
                      )}
                        </button>
                    </div>
                {/* </div> */}


                <div className="px-3">
                 <Autocomplete
                      id="companyName"
                      required
                      options={crList}
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
                <DataTable data={data}  title={`${t('SSCC LIST')}`} columnsName={ViewSsccColumn} backButton={false}
                    loading={isLoading}
                    secondaryColor="secondary"
                    handleRowClickInParent={handleRowClickInParent}
                    uniqueId="ssccTableId"
                    dropDownOptions={[
                        {
                        label: `${t('Edit')}`,
                          icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                          ,
                          action: handleEdit
          
                        },
                        {
                          label: `${t('Delete')}`,
                          icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                          ,
                          action: handleDelete,
                        },
                        // {
                        //   label: "Print",
                        //   icon: <AccountCircleIcon fontSize="small" style={{ color: '#FF0032' }} />
                        //   ,
                        //   action: handlePrint,
                        // }
          
                      ]}
                />
                </div>


                 {/* Add Bulk popup component with handlebulkCreatePopup prop */}
                 {isBulkPopupVisible && (
                  <AdminBulkPopUp isVisible={isBulkPopupVisible} setVisibility={setBulkPopupVisibility} refreshSsccData={fetchData}/>
                )}





          <div id="barcode">
              <div id="barcode" className='hidden'>
                <div id='header'>
                  <div>
                    <img src={logo} id='imglogo' alt='' />
                  </div>
                  <div id='first-QRCode'>
                    <QRCodeSVG value="http://localhost:3006/" width={50} height={32} />
                  </div>
                </div>
                <div id='inside-heading'>
                  <div>
                    <p>PO NUMBER</p>
                    <p id='paragh'>PO-12345</p>
                  </div>
                  <div>
                    <p>GROUP NAME</p>
                    <p id='paragh'>Group-12345</p>
                  </div>
                </div>

                <div id='inside-header-second'>
                  <div>
                    <p>BATCH/LOT</p>
                    <p id='paragh'>Batch</p>
                  </div>
                  <div>
                    <p>COUNT</p>
                    {/* <p id='paragh'>{selectedRow.data.USERID}</p> */}
                    <p id='paragh'>Count-12345</p>
                  </div>
                  <div>
                    <p>PROD DATE</p>
                    {/* <p id='paragh'>{selectedRow.data.PALLET_DATE}</p> */}
                    <p id='paragh'>29/12/2023</p>
                  </div>
                </div>

                <div id='inside-header-third'>
                  <p>SSCC</p>
                  <p id='paragh-header'>{updatedRows.SSCCBarcodeNumber}</p>
                </div>
                <hr />

                <div id='inside-body'>
                  <div>
                    <p id='paragh'>BS-4398742849734</p>
                    <br />
                    <p id='paragh'>HITACHI WASHING MACHINE <br /><br /><br /><br /> AUTOMATIC 230V, Inverter</p>
                  </div>
                  <div id='inside-QRCode'>
                    {/* <QRCodeSVG value={selectedRow.data.SERIALNUM} width={70} height={40} /> */}
                    <QRCodeSVG value="BS-4398742849734" width={70} height={40} />
                  </div>
                </div>
                <hr />

                <div id='inside-BRCode'>
                  <Barcode value={updatedRows.SSCCBarcodeNumber} width={2.3} height={100} />
                  {/* <Barcode value="383945734572987" width={2.3} height={100} /> */}
                </div>
              </div>
          </div>

            </div>

           {/* SSCC page */}
           <div id="SSCCbarcode">
              {tableSelectedRows.map((barcode, index) => (
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
                        <p>{barcode}</p>
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

export default AdminSSCC