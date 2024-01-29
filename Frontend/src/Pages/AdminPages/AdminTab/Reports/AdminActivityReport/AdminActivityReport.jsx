import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { AdminActivityReportColumn } from '../../../../../utils/datatablesource';
import { Autocomplete, CircularProgress, TextField, debounce } from '@mui/material';
import newRequest from '../../../../../utils/userRequest';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
import BarLineChartJs from './BarLineChartJs';
// import BarLineChartJs from './BarLineChartJs';

const AdminActivityReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedChartAdmin, setSelectedChartAdmin] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [adminList, setAdminList] = useState([]);
  const [adminChartList, setAdminChartList] = useState([]);
  const [autocompleteChartLoading, setAutocompleteChartLoading] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  const abortControllerRef = React.useRef(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('');

  const [startDateChart, setStartDateChart] = useState(new Date());
  const [endDateChart, setEndDateChart] = useState('');

 
  const handleGPCAutoCompleteChange = (event, value) => {
    setSelectedAdmin(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    // if (value) {
    //   fetchData(value);
    // }
  }

  const [details, setDetails] = useState([])

  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    console.log(reason);
    console.log(newInputValue);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      console.log('clear');
      // console.log(newInputValue);
      setAdminList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setAdminList([]);
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

      const res = await newRequest.get(`/admin/searchAdmins?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);

      const crs = res?.data?.map(item => {
        return {
          id: item.id,
          username: item.username,
          email: item.email,
          // UserID: item.UserID,
        };
      });

      setAdminList(crs);
      setDetails(res?.data[0]);

      setOpen(true);
      setAutocompleteLoading(false);

      // fetchData();

    } catch (error) {
      console.log(error);
      setAdminList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);



  const handleSearchTimeAndDate = async () => {
    if (!selectedAdmin) {
      toast.info('Please select an admin');
      return;
    }
    if (!startDate) {
      toast.info('Please select a start date');
      return;
    }
    if (!endDate) {
      toast.info('Please select an end date');
      return;
    }
    setIsLoading(true);
    
    try {
      const formattedStartDate = new Date(startDate);
      formattedStartDate.setHours(0, 0, 0, 0);
      const formattedEndDate = new Date(endDate);
      formattedEndDate.setHours(23, 59, 59, 999);
      console.log(formattedStartDate?.toISOString(), formattedEndDate?.toISOString());
      
      
      const res = await newRequest.post('/report/gs1Admin', {
        startDate: formattedStartDate.toISOString(),
        endDate: formattedEndDate.toISOString(),
        admin_id: selectedAdmin?.id,
      });

      console.log(res?.data);

      const responseAdminMainData = res?.data?.map(item => {
        return {
          subject: item?.subject,
          admin_id: item?.admin_id,
          created_at: item?.created_at,
          updated_at: item?.updated_at,
          username: item?.admin?.username,
          email: item?.admin?.email,
        };
      });

      console.log(responseAdminMainData);

      setData(responseAdminMainData);

      if (res?.data?.length === 0) {
        toast.error('No data found');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(err?.response?.data || 'Error in fetching data');

    }
  }
    



  // chart Filter
  const handleChartAutoCompleteChange = (event, value) => {
    setSelectedChartAdmin(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    // if (value) {
    //   fetchData(value);
    // }
  }

 
  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteChartInputChange = debounce(async (event, newInputValue, reason) => {
    console.log(reason);
    console.log(newInputValue);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      console.log('clear');
      // console.log(newInputValue);
      setAdminChartList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setAdminChartList([]);
      // setSelectedCr(null);
      return;
    }

    console.log(newInputValue);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort previous request
    }
    abortControllerRef.current = new AbortController(); // Create a new controller for the new request

    try {
      setAutocompleteChartLoading(true);
      setOpenChart(true);

      const res = await newRequest.get(`/admin/searchAdmins?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);

      const crs = res?.data?.map(item => {
        return {
          id: item.id,
          username: item.username,
          email: item.email,
          // UserID: item.UserID,
        };
      });

      setAdminChartList(crs);
      
      setOpenChart(true);
      setAutocompleteChartLoading(false);

      // fetchData();

    } catch (error) {
      console.log(error);
      setAdminChartList([]); // Clear the data list if an error occurs
      setOpenChart(false);
      setAutocompleteChartLoading(false);
    }
  }, 400);


  // const [chartData, setChartData] = useState([]);
  
  // const handleChartSearchDateAndTime = async () => { 
  //   try {
  //     const currentDate = new Date();
  //     const formattedStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  //     formattedStartDate.setHours(0, 0, 0, 0);
  //     const formattedEndDate = new Date(currentDate);
  //     formattedEndDate.setHours(23, 59, 59, 999);
  //     console.log(formattedStartDate?.toISOString(), formattedEndDate?.toISOString());
      
  //     const res = await newRequest.post('/report/gs1Admin', {
  //       startDate: formattedStartDate.toISOString(),
  //       endDate: formattedEndDate.toISOString(),
  //       // admin_id: selectedAdmin?.id,
  //       admin_id: 1,
  //     });

  //     console.log(res?.data);

  //     const responseAdminMainData = res?.data?.map(item => {
  //       return {
  //         subject: item?.subject,
  //         admin_id: item?.admin_id,
  //         created_at: item?.created_at,
  //         updated_at: item?.updated_at,
  //         username: item?.admin?.username,
  //         email: item?.admin?.email,
  //       };
  //     });

  //     console.log(responseAdminMainData);

  //     // Set the transformedChartData in the state
  //     setChartData(responseAdminMainData);


  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  // useEffect(() => {
  //   handleChartSearchDateAndTime();
  // }, []);
    



  const handleExportProductsTemplate = () => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    // Assuming these are the specific columns you want to export
    const selectedColumns = ['subject', 'username', 'email', 'admin_id', 'created_at', 'updated_at'];
  
    // Create a worksheet with headers and selected data
    const filteredData = data.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });
  
    // Create a worksheet with headers and data
    const worksheet = XLSX.utils.json_to_sheet([{}].concat(filteredData), { header: selectedColumns });
  
    // Set column widths in the !cols property
    const columnWidths = selectedColumns.map((column, index) => ({
      width: index === 0 ? 45 : 20, // Set the width to 25 for the first column, and 15 for the rest
    }));
    worksheet['!cols'] = columnWidths;


    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Admins Log');
  
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Save Excel file
    saveAs(dataBlob, 'AdminsLog.xlsx');
  };


  
  return (
    <div>
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
           <div>
              <AdminDashboardRightHeader title={t('Admins Log')} />
           </div>

           {/* Chart UI */}
           <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                  <div className='sm:flex p-4 gap-2 w-full'>
                   <div className="flex flex-col w-full">
                      <label className="font-body text-sm">{t('Admins')}</label>
                        {/* <select
                          type="text"
                          className="border border-gray-300 p-2 rounded-lg"
                        >
                          <option value="">{t('Admin 1')}</option>
                          <option value="">{t('Admin 2')}</option>
                        </select> */}

                        <Autocomplete
                            id="companyName"
                            required
                            options={adminChartList}
                            // id: item.id,
                            // username: item.username,
                            // email: item.email,
                            // getOptionLabel={(option) => (option && option.IntID) ? `${option?.Phone1} - ${option?.MemberNameE} - ${option?.MemberNameA} - ${option?.Email} - ${option?.GLNID}` : 'no'}
                            getOptionLabel={(option) => (option && option.id) ? `${option?.id} - ${option?.username} - ${option?.email} ` : ''}
                            onChange={handleChartAutoCompleteChange}
                            value={selectedChartAdmin}
                            onInputChange={(event, newInputValue, params) => debouncedHandleAutoCompleteChartInputChange(event, newInputValue, params)}
                            loading={autocompleteChartLoading}
                            sx={{ marginTop: '10px' }}
                            open={openChart}
                            onOpen={() => {
                              // setOpen(true);
                            }}
                            onClose={() => {
                              setOpenChart(false);
                            }}
                            renderOption={(props, option) => (
                              <li key={option.id} {...props}>
                                {option ? `${option.id} - ${option.username} - ${option.email} ` : 'No options'}
                              </li>
                            )}


                            renderInput={(params) => (
                              <TextField
                                // required
                                error={isSubmitClicked && !selectedChartAdmin}
                                helperText={isSubmitClicked && !selectedChartAdmin ? "Products is required" : ""}
                                {...params}
                                label={`${t('Search Admins')}`}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <React.Fragment>
                                      {autocompleteChartLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
                      <div className="flex flex-col w-full mt-2 sm:mt-0">
                          <label className="font-body text-sm">{t('Start Date')}</label>
                          <input
                              onChange={(e) => setStartDateChart(e.target.value)}
                              value={startDateChart}
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                      <div className="flex flex-col w-full mt-2 sm:mt-0">
                          <label className="font-body text-sm">{t('End Date')}</label>
                          <input
                              onChange={(e) => setEndDateChart(e.target.value)}
                              value={endDateChart}
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                    </div>

                    <BarLineChartJs />
                </div>
              </div>
          </div>

          {/* Datagrid Filter */}
           <div className='flex justify-center items-center'>
             <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 py-5 bg-white shadow-xl rounded-md">

                    <div className='sm:flex p-4 gap-2 w-full'>
                      <div className="flex flex-col w-full">
                        <label className="font-body text-sm">{t('Admins')}</label>
                        {/* <select
                          type="text"
                          className="border border-gray-300 p-2 rounded-lg"
                        >
                          <option value="">{t('Admin 1')}</option>
                          <option value="">{t('Admin 2')}</option>
                        </select> */}

                        <Autocomplete
                            id="companyName"
                            required
                            options={adminList}
                            // id: item.id,
                            // username: item.username,
                            // email: item.email,
                            // getOptionLabel={(option) => (option && option.IntID) ? `${option?.Phone1} - ${option?.MemberNameE} - ${option?.MemberNameA} - ${option?.Email} - ${option?.GLNID}` : 'no'}
                            getOptionLabel={(option) => (option && option.id) ? `${option?.id} - ${option?.username} - ${option?.email} ` : ''}
                            onChange={handleGPCAutoCompleteChange}
                            value={selectedAdmin}
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
                              <li key={option.id} {...props}>
                                {option ? `${option.id} - ${option.username} - ${option.email} ` : 'No options'}
                              </li>
                            )}


                            renderInput={(params) => (
                              <TextField
                                // required
                                error={isSubmitClicked && !selectedAdmin}
                                helperText={isSubmitClicked && !selectedAdmin ? "Products is required" : ""}
                                {...params}
                                label={`${t('Search Admins')}`}
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
                      <div className="flex flex-col w-full mt-2 sm:mt-0">
                          <label className="font-body text-sm">{t('Start Date')}</label>
                          <input
                              onChange={(e) => setStartDate(e.target.value)}
                              value={startDate}
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                      <div className="flex flex-col w-full mt-2 sm:mt-0">
                          <label className="font-body text-sm">{t('End Date')}</label>
                          <input
                              onChange={(e) => setEndDate(e.target.value)}
                              value={endDate}
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                    </div>

                      <div className='flex justify-between flex-wrap px-5'>
                        <button
                          onClick={handleSearchTimeAndDate}
                          className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                        >
                          <i className="fas fa-eye ml-1"></i> {t('View Admin Activity')}
                        </button>
                        <button
                          onClick={handleExportProductsTemplate}
                          className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                        >
                          {t('Download Excel')}
                        </button>
                      </div>
                  


                    </div>
                  </div>
                </div>


              <div className='flex justify-center items-center'>
               <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px', padding: '10px' }}>

                  <DataTable data={data}
                  title={t('Admin Activity Chart')}
                  columnsName={AdminActivityReportColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  actionColumnVisibility={false}
                  showToolbarSlot={false}
                  checkboxSelection={'disabled'}
                  // handleRowClickInParent={handleRowClickInParent}

                  // dropDownOptions={[
                      // {
                      //   label: t("View"),
                      //   icon: (
                      //     <VisibilityIcon
                      //       fontSize="small"
                      //       color="action"
                      //       style={{ color: "rgb(37 99 235)" }}
                      //     />
                      //   ),
                      //   action: handleView,
                      // },
                  //     {
                  //     label: t("Delete"),
                  //     icon: (
                  //         <DeleteIcon
                  //         fontSize="small"
                  //         color="action"
                  //         style={{ color: "rgb(37 99 235)" }}
                  //         />
                  //     ),
                  //     action: handleDelete,
                  //     },

                  // ]}
                  uniqueId="gtinMainTableId"

                  />
                  </div>

                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AdminActivityReport