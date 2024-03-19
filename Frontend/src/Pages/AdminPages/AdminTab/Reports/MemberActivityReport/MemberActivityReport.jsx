import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { AdminActivityReportColumn, memberActivityReportColumn } from '../../../../../utils/datatablesource';
import { Autocomplete, CircularProgress, TextField, debounce } from '@mui/material';
import newRequest from '../../../../../utils/userRequest';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
// import BarsDataset from './BarCharts';

const MemberActivityReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const abortControllerRef = React.useRef(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('');
 
  const handleGPCAutoCompleteChange = (event, value) => {
    setSelectedMember(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    // if (value) {
    //   fetchData(value);
    // }
  }

  const [details, setDetails] = useState([])

  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    // console.log(reason);
    // console.log(newInputValue);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      // console.log('clear');
      // console.log(newInputValue);
      setMemberList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setMemberList([]);
      // setSelectedCr(null);
      return;
    }

    // console.log(newInputValue);
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
      // console.log(res); 

      const crs = res?.data?.map(item => {
        return {
          id: item?.id,
          memberID: item?.memberID,
          contactPerson: item?.contactPerson,
          email: item?.email,
          
        };
      });

      setMemberList(crs);
      setDetails(res?.data[0]);

      setOpen(true);
      setAutocompleteLoading(false);

      // fetchData();

    } catch (error) {
      // console.log(error);
      setMemberList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);



  const handleSearchTimeAndDate = async () => {
    if (!selectedMember) {
      toast.info('Please select an Member');
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
      // console.log(formattedStartDate?.toISOString(), formattedEndDate?.toISOString());
      
      
      const res = await newRequest.post('/report/gs1member', {
        startDate: formattedStartDate.toISOString(),
        endDate: formattedEndDate.toISOString(),
        userId: selectedMember?.id,
      });

      // console.log(res?.data);

      const responseAdminMainData = res?.data?.map(item => {
        return {
          subject: item?.subject,
          company_name_eng: item?.user?.company_name_eng,
          company_name_arabic: item?.user?.company_name_arabic,
          other_products: item?.user?.other_products,
          memberID: item?.user?.memberID,
          email: item?.user?.email,
          mobile: item?.user?.mobile,
          companyID: item?.user?.companyID,
          contactPerson: item?.user?.contactPerson,
          status: item?.user?.status,
          transaction_id: item?.user?.transaction_id,
          membership_category: item?.user?.membership_category,
          city: item?.user?.city,
          state: item?.user?.state,
          country: item?.user?.country,
          created_at: item?.created_at,
          updated_at: item?.updated_at,
        };
      });

      // console.log(responseAdminMainData);

      setData(responseAdminMainData);

      if (res?.data?.length === 0) {
        toast.error('No data found');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // console.log(err);
      toast.error(err?.response?.data || 'Error in fetching data');

    }
  }
    


  
  const handleExportProductsTemplate = () => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    // Assuming these are the specific columns you want to export
    const selectedColumns = ['subject', 'company_name_eng', 'company_name_arabic', 'other_products', 'memberID', 'email', 'mobile', 'companyID',
    'contactPerson', 'status', 'transaction_id', 'membership_category', 'city', 'state', 'country', 'created_at', 'updated_at'];
  
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
      width: index === 0 ? 55 : 27, // Set the width to 25 for the first column, and 15 for the rest
    }));
    worksheet['!cols'] = columnWidths;
  

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members Log');
  
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Save Excel file
    saveAs(dataBlob, 'MembersLog.xlsx');
  };
  



  
  return (
    <div>
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
           <div>
              <AdminDashboardRightHeader title={t('Members Log')} />
           </div>

           <div className='flex justify-center items-center'>
             <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 py-5 bg-white shadow-xl rounded-md">

                    <div className='sm:flex p-4 gap-2 w-full'>
                      <div className="flex flex-col w-full">
                  <label className={`font-body text-sm ${i18n.language === "ar" ? "text-end" : "text-start" }`}> {t('Members')}</label>
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
                            options={memberList}
                            // id: item?.id,
                            // memberID: item?.memberID,
                            // email: item?.email,
                            // getOptionLabel={(option) => (option && option.IntID) ? `${option?.Phone1} - ${option?.MemberNameE} - ${option?.MemberNameA} - ${option?.Email} - ${option?.GLNID}` : 'no'}
                            getOptionLabel={(option) => (option && option.memberID) ? `${option?.memberID} - ${option?.contactPerson} - ${option?.email} ` : ''}
                            onChange={handleGPCAutoCompleteChange}
                            value={selectedMember}
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
                              <li key={option.memberID} {...props}>
                                {option ? `${option.memberID} - ${option.contactPerson ? option.contactPerson : ''} - ${option.email} ` : 'No options'}
                              </li>
                            )}


                            renderInput={(params) => (
                              <TextField
                                // required
                                error={isSubmitClicked && !selectedMember}
                                helperText={isSubmitClicked && !selectedMember ? "Products is required" : ""}
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
                      <div className="flex flex-col w-full">
                          <label className={`font-body text-sm ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('Start Date')}</label>
                          <input
                              onChange={(e) => setStartDate(e.target.value)}
                              value={startDate}
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                      <div className="flex flex-col w-full">
                          <label className={`font-body text-sm ${i18n.language === "ar" ? "text-end" : "text-start" }`}>{t('End Date')}</label>
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
                          <i className="fas fa-eye ml-1"></i> {t('View Members Activity')}
                        </button>
                        <button
                          onClick={handleExportProductsTemplate}
                          className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                        >
                          {t('Download Excel')}
                        </button>
                      </div>
                  


                      {/* <div className='flex justify-center items-center mt-6'>
                          <BarsDataset />
                      </div> */}
                    </div>
                  </div>
                </div>


              <div className='flex justify-center items-center'>
               <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px', padding: '10px' }}>

                  <DataTable data={data}
                  title={t('Members Activity Chart')}
                  columnsName={memberActivityReportColumn(t)}
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

export default MemberActivityReport