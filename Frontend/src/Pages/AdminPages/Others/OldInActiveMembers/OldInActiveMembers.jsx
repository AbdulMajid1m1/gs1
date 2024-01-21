import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { Autocomplete, CircularProgress, TextField, debounce } from '@mui/material';
import newRequest from '../../../../utils/userRequest';
import { GtinColumn } from '../../../../utils/datatablesource';
import DataTable from '../../../../components/Datatable/Datatable';
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OldInActiveMembers = () => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
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
        setTotalCategory('Category C' ,[]);
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };



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

            <DataTable data={data} title={t('Old Inactive Members')} columnsName={GtinColumn}
              loading={isLoading}
              secondaryColor="secondary"
              // handleRowClickInParent={handleRowClickInParent}
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
                    onClick={handlePendingApprovedPopUp}
                    className={`font-sans font-normal text-sm px-4 py-1 rounded-full hover:bg-blue-600 ${allUserData?.isproductApproved == 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    disabled={allUserData.isproductApproved === 1 ? true : allUserData.isproductApproved === undefined ? true : false}
                    // show disable cursor if status is not approved
                    style={{ cursor: allUserData.isproductApproved == 1 ? 'not-allowed' : 'pointer' }}
                  >
                    {allUserData?.isproductApproved == 1 ? 'Approved' : allUserData?.isproductApproved == 0 ? "Pending For Approval" : "Rejected"}
                  </button> */}
                  <button
                      className='bg-secondary font-sans font-normal text-sm px-6 py-2 text-white rounded-full hover:bg-primary'
                    >
                      Migrate & Generate Invoice
                    </button>
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