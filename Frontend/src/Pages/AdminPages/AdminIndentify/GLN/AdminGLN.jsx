import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../../components/Datatable/Datatable'
import { GlnColumn } from '../../../../utils/datatablesource'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from "../../../../Images/logo.png";
import { QRCodeSVG } from 'qrcode.react'
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import newRequest from '../../../../utils/userRequest';
import MapEvents from '../../../../components/Maps/MapEvents';
import { toast } from 'react-toastify';
import { debounce } from '@mui/material/utils';
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';

const Gln = () => {
  const [data, setData] = useState([]);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  // const memberDataString = sessionStorage.getItem('memberData');
  // const memberData = JSON.parse(memberDataString);
  // console.log(memberData);

  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
 
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
    try {
      const response = await newRequest.get(`/gln?user_id=${value?.user_id}`);
      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };


  const handleEdit = (row) => {
    console.log(row);
    navigate("/member/update-gln/" + row?.id)
    // save the response in session 
    sessionStorage.setItem('glnData', JSON.stringify(row));
  }


  const handleDelete = async (row) => {
    try {
      const deleteResponse = await newRequest.delete(`/gln/${row.id}`);
      console.log(deleteResponse.data);

      toast.success(deleteResponse?.data?.message || 'GLN deleted successfully', {
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
      setData(prevData => prevData.filter(item => item.id !== row.id));

    } 
    catch (err) {
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

   const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setFilteredData(data)
      return
    }
    setFilteredData(item)

    const barcodes = item.map((row) => row.GLNBarcodeNumber);
    console.log(barcodes); // This will log an array of barcodes
    // setSelectedRow(barcodes);
    setTableSelectedRows(barcodes);
  }


    // Gtin Page Print
    const handleGlnPage = () => {
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
 
 

  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        {/* <div className='h-auto w-full'>
          <div className='h-16 w-full shadow-xl flex justify-start items-center px-5 border-l-2 border-t-2 border-r-2 border-[#e49515]'>
            <p className='sm:text-2xl text-sm font-body'>View GLN</p>
          </div>
        </div> */}
        <div>
          <AdminDashboardRightHeader title={"GLN"}/>
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-3 px-3'>
            <button onClick={() => navigate(-1)} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-arrow-left mr-1"></i> Back
            </button>

            <button onClick={() => navigate('/admin/admin-addgln')} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-plus mr-1"></i> Add GLN
            </button>

            <button onClick={handleGlnPage} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
              <i className="fas fa-print mr-1"></i> Print GLN
            </button>
          </div>


        
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
                          label="Search Members.."
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
          <DataTable data={data} title={"GLN LIST"} columnsName={GlnColumn} backButton={false}
            loading={isLoading}
            secondaryColor="secondary"
            uniqueId={"gln_id"}
            handleRowClickInParent={handleRowClickInParent}
            dropDownOptions={[
              {
                label: "Edit",
                icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleEdit

              },
              {
                label: "Delete",
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                action: handleDelete,
              }

            ]}
          />

        <div id="barcode">
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

          <MapEvents locations={filteredData} />
        </div>
      </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Gln