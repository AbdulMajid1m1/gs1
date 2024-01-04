import React, { useContext, useEffect, useState } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdminBrandsColumn } from '../../../../utils/datatablesource';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import newRequest from '../../../../utils/userRequest';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Addbrands from './addbrands';
import Updatebrands from './updatebrands';
import { debounce } from '@mui/material/utils';
const Brands = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);
  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    // console.log(row)
    sessionStorage.setItem("updateBrandData", JSON.stringify(row));
  };



  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedCr, setSelectedCr] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const abortControllerRef = React.useRef(null);

  const navigate = useNavigate()


  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setSelectedCr(value);


    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== '');

    if (value) {
      fetchData(value);
    }
  }


  // Use debounce to wrap the handleAutoCompleteInputChange function
  const debouncedHandleAutoCompleteInputChange = debounce(async (event, newInputValue, reason) => {
    console.log(reason);
    setIsSubmitClicked(false);
    if (reason === 'reset' || reason === 'clear') {
      setBrandList([]); // Clear the data list if there is no input
      // setSelectedCr(null);
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return; // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setBrandList([]);
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

      const res = await newRequest.get(`/brands/search?keyword=${newInputValue}`, {
        signal: abortControllerRef.current.signal
      });
      console.log(res);

      const crs = res?.data?.map(item => {
        return {
          name: item?.name,
          name_ar: item?.name_ar,
          companyID: item?.companyID,

        };
      });

      setBrandList(crs);

      setOpen(true);
      setAutocompleteLoading(false);

      // fetchData();

    } catch (error) {
      console.error(error);
      setBrandList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }
  }, 400);

  
  const fetchData = async (value) => {
    setIsLoading(true);
    console.log(value);
    console.log(value?.companyID);
    try {
      const response = await newRequest.get(`/brands?companyID=${value?.companyID}`);
      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  
  const handleView = (row) => {
    console.log(row);
  }

  const handleDelete = async (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this cr number!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/brands/" + row?.id);
          if (isDeleted) {
            toast.success('Cr number deleted successfully', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });


            // filter out the deleted user from the data
            const filteredData = data.filter((item) => item?.id !== row?.id);
            setData(filteredData);

          } else {
            // Handle any additional logic if the user was not deleted successfully
            toast.error('Failed to delete user', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

          }
        } catch (error) {
          // Handle any error that occurred during the deletion
          console.error("Error deleting user:", error);
          toast.error('Something went wrong while deleting user', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };



  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div>
          <DashboardRightHeader
            title={'Brands'}
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
                  options={brandList}
                  getOptionLabel={(option) => (option && option?.name) ? `${option?.name_ar} - ${option?.companyID}` : ''}
                  onChange={handleGPCAutoCompleteChange}
                  value={selectedCr}
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
                    <li key={option.name_ar} {...props}>
                      {option ? `${option?.name} - ${option.name_ar} - ${option.companyID}` : 'No options'}
                    </li>
                  )}


                  renderInput={(params) => (
                    <TextField
                      // required
                      error={isSubmitClicked && !selectedCr?.cr}
                      helperText={isSubmitClicked && !selectedCr?.cr ? "Products is required" : ""}
                      {...params}
                      label="Search Members"
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

              <div className='flex justify-start sm:justify-start items-center flex-wrap gap-2 py-7 px-3'>
                <button
                  onClick={handleShowCreatePopup}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  <i className="fas fa-plus mr-2"></i>Add
                </button>
              </div>

              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
                <DataTable data={data}
                  title="Brands"
                  columnsName={AdminBrandsColumn}
                  loading={isLoading}
                  secondaryColor="secondary"

                  dropDownOptions={[
                    // {
                    //   label: "View",
                    //   icon: (
                    //     <VisibilityIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleView,
                    // },
                    {
                      label: "Edit",
                      icon: (
                        <EditIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleShowUpdatePopup,
                    },
                    {
                      label: "Delete",
                      icon: (
                        <DeleteIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleDelete,
                    },

                  ]}
                  uniqueId="gtinMainTableId"
                />
              </div>


            </div>
          </div>
        </div>
        {/* Addbrands component with handleShowCreatePopup prop */}
        {isCreatePopupVisible && (
          <Addbrands isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={fetchData} />
        )}
        {/* Updatebrands component with handleShowUpdatePopup prop */}
        {isUpdatePopupVisible && (
          <Updatebrands isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={fetchData} />
        )}
      </div>
    </div>
  )
}

export default Brands