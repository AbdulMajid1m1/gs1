import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import { productsColumn } from "../../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { DataTableContext } from "../../../../Contexts/DataTableContext";
import DashboardRightHeader from "../../../../components/DashboardRightHeader/DashboardRightHeader";
import { debounce } from '@mui/material/utils';
import newRequest from "../../../../utils/userRequest";

const Products = () => {
  const [data, setData] = useState([]);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedCr, setSelectedCr] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [crList, setCrList] = useState([]);
  const abortControllerRef = React.useRef(null);
  const navigate = useNavigate()
  
  
  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setSelectedCr(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    if(value) {
      fetchData();
    }
  }


  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    console.log(reason);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      setCrList([]); // Clear the data list if there is no input
      setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setCrList([]);
      setSelectedCr(null);
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
          user_id: item.user_id,
          transaction_id: item.transaction_id,
          email: item.email,
          mobile: item.mobile,
        };
      });

      setCrList(crs);

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


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await newRequest.get(`/products?user_id=${selectedCr?.user_id}`);
      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };



  

 
  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div>
          <DashboardRightHeader title={"Products"}/>
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

              {/* input */}
                {/* <label htmlFor="field2" className="text-secondary">Transaction Id </label> */}
                <Autocomplete
                      id="companyName"
                      required
                      options={crList}
                      getOptionLabel={(option) => (option && option.user_id) ? `${option?.user_id} - ${option?.transaction_id} - ${option?.email} - ${option?.mobile} ` : ''}
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
                          {option ? `${option.user_id} - ${option.transaction_id} - ${option.email} - ${option.mobile}` : 'No options'}
                        </li>
                      )}


                      renderInput={(params) => (
                        <TextField
                          // required
                          error={isSubmitClicked && !selectedCr?.cr}
                          helperText={isSubmitClicked && !selectedCr?.cr ? "Products is required" : ""}
                          {...params}
                          label="Search Products"
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
          
              <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-6'>
                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  GCP {data[0]?.gcpGLNID}
                </button>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  {/* {data?.CompanyDetails?.Membership} */}
                  {data[0]?.productnameenglish ? data[0]?.productnameenglish : 'Category C'}
                </button>

                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary active:bg-blue-700">
                  Member ID {data[0]?.memberID}
                  {/* Member ID */}
                </button>

              </div>


              <div style={{ marginLeft: '-25px', marginRight: '-25px' }}>

                <DataTable data={data} title="Member Products" columnsName={productsColumn}
                  loading={isLoading}
                  secondaryColor="secondary"
                  // handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[
                    {
                      label: "Edit",
                      icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                      ,
                      // action: handleEdit

                    },
                    {
                      label: "Delete",
                      icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                      ,
                    //   action: handleDelete,
                    }

                  ]}
                  uniqueId="adminProductId"

                />
              </div>

         
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products