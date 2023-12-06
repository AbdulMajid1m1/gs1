import React, { useContext, useEffect, useState } from 'react'
import { Gs1AllMembers } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import newRequest from '../../../../utils/userRequest';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import Swal from 'sweetalert2';

const Gs1Members = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    
    const { rowSelectionModel, setRowSelectionModel,
      tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
    const [filteredData, setFilteredData] = useState([]);

      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get("/users",);
          
          console.log(response.data);
          setData(response?.data || []);
          setIsLoading(false)

        } catch (err) {
          console.log(err);
          setIsLoading(false)
        }
      };

      fetchData(); // Calling the function within useEffect, not inside itself
    }, []); // Empty array dependency ensures this useEffect runs once on component mount


    const handleEdit = (row) => {
        console.log(row);
        // navigate("/upate-gtin-product/" + row?.id);
      };

    //   const handleUpdateTheStatus = async (row) => {
    //     const currentStatus = row.status;
    //     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    //     try {
    //       await newRequest.put(`/users/${row.id}`, { status: newStatus });
    
    //         Swal.fire({
    //             title: 'Status Changed!',
    //             text: `The status of ${row.company_name} has been changed to ${newStatus}.`,
    //             icon: 'success',
    //         });
    
    //         // Fetch the updated data to refresh the table
    //         fetchData();
    //     } catch (error) {
    //         // If there's an error, show an error message
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'An error occurred while changing the status.',
    //             icon: 'error',
    //         });
    //         console.error('Error changing status:', error);
    //     }
    // };
   
      const handleRowClickInParent = (item) => {
        if (!item || item?.length === 0) {
          setTableSelectedRows(data)
          setFilteredData(data)
          return
        }
    
      }

      
      
  return (
    <div>
      <div className="p-3 h-full sm:ml-72">
        
        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

            <DataTable data={data} title="All GS1 Members" columnsName={Gs1AllMembers}
            loading={isLoading}
            secondaryColor="secondary"
            handleRowClickInParent={handleRowClickInParent}

            dropDownOptions={[
                {
                label: "Change Status",
                icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                action: handleEdit

                },
                
                ,
                {
                label: "Delete",
                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                ,
                //   action: handleDelete,
                }

            ]}
            uniqueId="gtinMainTableId"

            />
            </div>

      </div>
    </div>
  )
}

export default Gs1Members