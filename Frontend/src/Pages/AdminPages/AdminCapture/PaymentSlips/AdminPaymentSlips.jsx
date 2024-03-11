import React, { useContext, useEffect, useState } from 'react'
import { adminPaymentSlipsColumn, paymentSlipColumn } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { debounce } from '@mui/material/utils';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const AdminPaymentSlips = () => {
  const { t, i18n } = useTranslation();
  const [IsLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const abortControllerRef = React.useRef(null);
  const navigate = useNavigate()


  const handleGPCAutoCompleteChange = (event, value) => {
    // console.log(value);
    setSelectedSlip(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    if (value) {
      fetchData(value);
    }
  }


  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    // console.log(reason);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      setPaymentList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setPaymentList([]);
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
          company_name_eng: item?.company_name_eng,
          gln: item?.gln,
          companyID: item?.companyID,
          email: item?.email,
          mobile: item?.mobile,
          gpc: item?.gpc,

        };
        // const crs = res?.data?.map(item => {
        //   return {
        //     name: item?.name,
        //     name_ar: item?.name_ar,
        //     companyID: item?.companyID,
  
        //   };
      });

      setPaymentList(crs);

      setOpen(true);
      setAutocompleteLoading(false);

      // fetchData();

    } catch (error) {
      console.error(error);
      setPaymentList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);

  
  const fetchData = async (value) => {
    setIsLoading(true);
    // console.log(value); 
    // console.log(value?.companyID);
    try {
      const response = await newRequest.get(`/memberDocuments?user_id=${value?.id}&type=bank_slip`);
      // console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      // console.log(err);
      setIsLoading(false)
    }
  };




  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`} >
        <div>
          <AdminDashboardRightHeader
            title={`${t('Payment Slips')}`}
          />
        </div>


        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-3 bg-white shadow-xl rounded-md">

              {/*  */}
              <div className='pt-3 px-3'>
                <Autocomplete
                  id="companyName"
                  required
                  options={paymentList}
                  getOptionLabel={(option) => (option && option?.memberID) ? `${option?.company_name_eng} - ${option?.gln} - ${option?.companyID} - ${option?.email} - ${option?.mobile} - ${option?.gpc}` : ''}
                  onChange={handleGPCAutoCompleteChange}
                  value={selectedSlip}
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
                      {option ? `${option?.company_name_eng} - ${option.gln} - ${option.companyID} - ${option.email} - ${option.mobile} - ${option.gpc}` : 'No options'}
                    </li>
                  )}


                  renderInput={(params) => (
                    <TextField
                      // required
                      error={isSubmitClicked && !selectedSlip?.cr}
                      helperText={isSubmitClicked && !selectedSlip?.cr ? "Products is required" : ""}
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


          <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

            <DataTable data={data} title={`${t('Payment Slips')}`} columnsName={paymentSlipColumn(t)}
              loading={IsLoading}
              checkboxSelection="disabled"
              secondaryColor="secondary"
              actionColumnVisibility={false}
              // globalSearch={true}
              // uniqueId="admin_registered_members"

              dropDownOptions={[
                {
                  label: `${t('Profile')}`,
                  icon: (
                    <VisibilityIcon
                      fontSize="small"
                      color="action"
                      style={{ color: "rgb(37 99 235)" }}
                    />
                  ),
                  // action: handleView,
                },
              



              ]}


            />
          </div>

          </div>
         </div>
       </div>



      </div>
    </div>
  )
}

export default AdminPaymentSlips