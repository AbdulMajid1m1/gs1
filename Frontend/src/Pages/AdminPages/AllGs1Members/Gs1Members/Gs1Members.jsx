import React, { useEffect, useState } from 'react'
import { Gs1AllMembers } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import newRequest from '../../../../utils/userRequest';

const Gs1Members = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);


      useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await newRequest.get("/users",);
          
          console.log(response.data);
          setData(response?.data?.products || []);
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
      const handleView = (row) => {
        console.log(row);
      };
      
  return (
    <div>
      <div className="p-3 h-full sm:ml-72">
        
        <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

            <DataTable data={data} title="All GS1 Members" columnsName={Gs1AllMembers}
            loading={isLoading}
            secondaryColor="secondary"
            // handleRowClickInParent={handleRowClickInParent}

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