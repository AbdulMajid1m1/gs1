import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { Autocomplete, Button, CircularProgress, TextField, debounce } from '@mui/material';
import newRequest from '../../../../utils/userRequest';
import { oldInActiveMemberColumn } from '../../../../utils/datatablesource';
import DataTable from '../../../../components/Datatable/Datatable';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';

const OldInActiveMembers = () => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [migrateButtonLoader, setMigrateButtonLoader] = useState(false);
  const [data, setData] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedOldMember, setSelectedOldMember] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [oldMemberList, setOldMemberList] = useState([]);
  const abortControllerRef = React.useRef(null);

  const handleGPCAutoCompleteChange = (event, value) => {
    setSelectedOldMember(value);


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
      setOldMemberList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }
    
    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setOldMemberList([]);
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

      const res = await newRequest.get(`/migration/user/search?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);
      
      const crs = res?.data?.map(item => {
        return {
          MemberID: item.MemberID,
          Email: item.Email,
          MemberNameE: item.MemberNameE,
          UserID: item.UserID,
        };
      });

      setOldMemberList(crs);
      setDetails(res?.data[0]);
   
      setOpen(true);
      setAutocompleteLoading(false);
      
      // fetchData();
      
    } catch (error) {
      console.error(error);
      setOldMemberList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);
  
  
  // const [allSearchMemberDetails, setAllSearchMemberDetails] = useState('')
  
  const fetchData = async (value) => {
    setIsLoading(true);
    console.log(value);
    // setAllSearchMemberDetails(value);
    try {
      const response = await newRequest.get(`/migration/membershipHistory?MemberID=${value?.MemberID}`);
      setData(response?.data || []);
      console.log(response.data);
    
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };




  const handleMigrateAndGenerateMember = async () => {
    setMigrateButtonLoader(true);
    // console.log(selectedOldMember);
    if (!selectedOldMember) {
      toast.info('Please select a member first');
      setMigrateButtonLoader(false); 
      return;
    }

    try {
      const res = await newRequest.post('/migration/migrateUser', {
        "MemberID": selectedOldMember?.MemberID,
      });
      console.log(res);
      toast.success(res?.data?.message || 'Member migrated successfully');
      setMigrateButtonLoader(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to migrate member');
      setMigrateButtonLoader(false);
    }
  }

  
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader title={t('Old InActive Members')} />
        </div>   


        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-2 bg-white shadow-xl rounded-md">


        <div className="px-3">
            <Autocomplete
              id="companyName"
              required
              options={oldMemberList}
              // MemberID: item.MemberID,
              // Email: item.Email,
              // MemberNameE: item.MemberNameE,
              // UserID: item.UserID,
              getOptionLabel={(option) => (option && option.MemberID) ? `${option?.Email} - ${option?.MemberNameE} - ${option?.UserID} ` : ''}
              onChange={handleGPCAutoCompleteChange}
              value={selectedOldMember}
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
                <li key={option.MemberID} {...props}>
                  {option ? `${option.MemberID} - ${option.Email} - ${option.MemberNameE} - ${option.UserID} ` : 'No options'}
                </li>
              )}


              renderInput={(params) => (
                <TextField
                  // required
                  error={isSubmitClicked && !selectedOldMember?.cr}
                  helperText={isSubmitClicked && !selectedOldMember?.cr ? "Products is required" : ""}
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

            <DataTable data={data} title={t('Old InActive Members')} columnsName={oldInActiveMemberColumn}
              loading={isLoading}
              secondaryColor="secondary"
              // handleRowClickInParent={handleRowClickInParent}
              uniqueId="customerListId"
              actionColumnVisibility={false}
              checkboxSelection={'disabled'}

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
                  // action: handleView,
                },
                {
                  label: `${t('Delete')}`,
                  icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                  ,
                  // action: handleDelete,
                }

              ]}

            />


                <div className='w-full flex justify-start px-6 pt-2 py-6 gap-2'>
                  {/* <button
                    onClick={handleMigrateAndGenerateMember}
                      className='bg-secondary font-sans font-normal text-sm px-6 py-2 text-white rounded-full hover:bg-primary'
                    >
                      Migrate & Generate Invoice
                    </button> */}
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                      type="button"
                      onClick={handleMigrateAndGenerateMember}
                      disabled={migrateButtonLoader}
                      className="ml-2"
                      endIcon={migrateButtonLoader ? <CircularProgress size={24} color="inherit" /> : null}
                      >
                      Migrate & Generate Invoice
                    </Button>
                </div>
          </div>


            </div>
          </div>
        </div>

 
      </div>
    </div>
  )
}

export default OldInActiveMembers