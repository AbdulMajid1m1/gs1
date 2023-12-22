import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { city } from '../../../../utils/datatablesource'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import newRequest from '../../../../utils/userRequest'
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';
import AddCity from './AddCity';
import Updatecity from './updatecity';

const Cities = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);

    const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

    const handleShowCreatePopup = () => {
      setCreatePopupVisibility(true);
    };

    const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

      const handleShowUpdatePopup = (row) => {
        setUpdatePopupVisibility(true);
        // console.log(row)
        // save this row data in session storage 
        sessionStorage.setItem("updateBrandData", JSON.stringify(row));
      };
   

      // const fetchData = async () => {
      //   try {
      //     const response = await newRequest.get("/address/getAllCities",);
          
      //     console.log(response.data);
      //     setData(response?.data || []);
      //     setIsLoading(false)

      //   } catch (err) {
      //     console.log(err);
      //     setIsLoading(false)
      //   }
      // };

      const fetchData = async () => {
        try {
          // Fetch cities data
          const citiesResponse = await newRequest.get("/address/getAllCities");
          const citiesData = citiesResponse?.data || [];
      
          // Fetch states data
          const statesResponse = await newRequest.get('/address/getAllStatesName');
          const statesData = statesResponse?.data || [];
      
          // Create a mapping between state_id and state name
          const stateIdToNameMap = {};
          statesData.forEach(state => {
            stateIdToNameMap[state.id] = state.name;
          });
      
          // Replace state_id with state name in the cities data
          const updatedCitiesData = citiesData.map(city => ({
            ...city,
            state_name: stateIdToNameMap[city.state_id] || "Unknown State",
          }));
      
          console.log(updatedCitiesData);
          setData(updatedCitiesData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      };
      

      useEffect(() => {
        fetchData();
      }, []);

const refreshcitiesData = async () => {
      try {
        const response = await newRequest.get("/address/getAllCities",);
        
        console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false)

      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
  };
    const handleDelete = async (row) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this city!',
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
              const isDeleted = await newRequest.delete("/address/deleteCities/" + row?.id);
              if (isDeleted) {
                toast.success('City deleted successfully', {
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
                const filteredData = brandsData.filter((item) => item?.id !== row?.id);
                setBrandsData(filteredData);
                refreshcitiesData()
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
    
    const handleView = (row) => {
        console.log(row);
    }

    const handleRowClickInParent = (item) => {
      // if (!item || item?.length === 0) {
      //   setTableSelectedRows(data)
      //   setFilteredData(data)
      //   return
      // }
  
    }



  return (
    <div>
        <div className="p-0 h-full sm:ml-72">
            <div>
                <DashboardRightHeader 
                    title={'Cities'}
                />
            </div>

            <div className='flex justify-center items-center'>
              <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

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
                      title="Cities"
                       columnsName={city}
                        loading={isLoading}
                         secondaryColor="secondary"
                          handleRowClickInParent={handleRowClickInParent}
                   
                    dropDownOptions={[
                        {
                        label: "View",
                        icon: (
                            <VisibilityIcon
                            fontSize="small"
                            color="action"
                            style={{ color: "rgb(37 99 235)" }}
                            />
                        ),
                        action: handleView,
                        },
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
      

             {/* AddCity component with handleShowCreatePopup prop */}
             {isCreatePopupVisible && (
                <AddCity isVisible={isCreatePopupVisible} setVisibility={setCreatePopupVisibility} refreshBrandData={fetchData}/>
              )}
            
            {/* Updatecity component with handleShowUpdatePopup prop */}
            {isUpdatePopupVisible && (
              <Updatecity isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshBrandData={fetchData}/>
            )}

        </div>
    </div>
  )
}

export default Cities