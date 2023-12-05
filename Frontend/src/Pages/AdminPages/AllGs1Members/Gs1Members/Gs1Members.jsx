import React, { useState } from 'react'
import { Gs1AllMembers } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Gs1Members = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([
        {
            "gs1_id": "123456789",
            "company_name": "GS1 India",
            "status": "INACTIVE",
        },
        {
            "gs1_id": "123456789",
            "company_name": "GS1 India",
            "status": "INACTIVE",
        },
        {
            "gs1_id": "123456789",
            "company_name": "GS1 India",
            "status": "Activated",
        },
    ]);

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