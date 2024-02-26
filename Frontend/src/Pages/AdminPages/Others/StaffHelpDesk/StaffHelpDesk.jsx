import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../components/Datatable/Datatable';
import { staffAssignedTaskColumn } from '../../../../utils/datatablesource';
import VisibilityIcon from "@mui/icons-material/Visibility";
import newRequest from '../../../../utils/userRequest';
import { toast } from 'react-toastify';
import { Autocomplete, CircularProgress, TextField, debounce } from '@mui/material';

const StaffHelpDesk = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const abortControllerRef = React.useRef(null);
    
  const handleGPCAutoCompleteChange = (event, value) => {
      setSelectedAdmin(value);


      // Update the state variable when Autocomplete field is filled
      setIsAutocompleteFilled(value !== null && value !== '');

      // if (value) {
      //   fetchData(value);
      // }
  }


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


    // const fetchData = async (value) => {
    //   setIsLoading(true)
    //   console.log(value);
    //   console.log(value?.id);
    //   try {
    //     const response = await newRequest.get(`/users/getUsersWithAssignTo=${value?.id}`);
  
    //     console.log(response.data);
    //     setData(response?.data || []);
    //     setIsLoading(false)
  
    //   } catch (err) {
    //     console.log(err);
    //     toast.error(err?.response?.data?.error || err?.response?.data || "Something went wrong!");
    //     setIsLoading(false)
    //   }
    // };

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await newRequest.get("/users/getUsersWithAssignTo");

      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || err?.response?.data || "Something went wrong!");
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleView = (row) => {
    console.log(row)
  };

  const handleRowClickInParent = (item) =>
  {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      return
    }

  }
 

  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
          <div>
          <AdminDashboardRightHeader title={t('Staff Assigned Desk')} />
          </div>

          <div className='flex justify-center items-center'>
            <div className="h-auto w-[97%] px-0 pt-4">
              <div className="h-auto w-full p-3 bg-white shadow-xl rounded-md">

                <div className='pt-3 px-3'>
                  <label htmlFor='adminSearch' className='text-secondary'> {t('Search Admin')} </label>
                    <Autocomplete
                      id="adminSearch"
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
                      sx={{ marginTop: '15px' }}
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

                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                  <DataTable data={data}
                  title={t('Staff Assigned Desk')}
                    columnsName={staffAssignedTaskColumn(t)}
                    loading={isLoading}
                    secondaryColor="secondary"
                    checkboxSelection={'disabled'}
                    actionColumnVisibility={false}
                    handleRowClickInParent={handleRowClickInParent}

                    dropDownOptions={[
                      {
                        label: t("View"),
                        icon: (
                          <VisibilityIcon
                            fontSize="small"
                            color="action"
                            style={{ color: "rgb(37 99 235)" }}
                          />
                        ),
                        action: handleView,
                      },
                     
                    ]}
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

export default StaffHelpDesk