import React, { useEffect, useState } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../../components/Datatable/Datatable'
import newRequest from '../../../../utils/userRequest'
import { memberForRenevalColumn } from '../../../../utils/datatablesource'
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const MembersExpiryPage = () => {
    const [memberReneval, setMemberReneval] = useState([]);
    const [memberRenevalLoader, setMemberRenevalLoader] = useState(false);


    const getNewTransferOrder = async () => {
        setMemberRenevalLoader(true);
        try {
  
          newRequest.get("/users/getByGcpExpiry")
            .then(response => {
              console.log("MemberReneval", response.data)
              setMemberReneval(response.data)
              setMemberRenevalLoader(false);
            })
            .catch(error => {
  
         
              console.error(error);
              setMemberRenevalLoader(false);
            });
  
        }
        catch (error) {
          console.log(error);
  
        }
      };

    useEffect(() => {
        getNewTransferOrder()
    }
    , [])
  return (
    <div>
      <div className="p-0 h-full sm:ml-72">
        <div>
          <DashboardRightHeader
            title={'Members Expiry Page'}
          />
        </div>

        <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

          <DataTable data={memberReneval} title="Members Expiry Page" columnsName={memberForRenevalColumn}
            loading={memberRenevalLoader}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            globalSearch={true}
            // handleRowClickInParent={handleRowClickInParent}
            uniqueId="members_expiry_page_id"

            dropDownOptions={[
              {
                label: "Send Invoice",
                icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                // action: fetchMemberInvoiceData,

              },
              {
              label: "Open Profile",
              icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
              ,
              // action: handleOpen,

              },

        

            ]}


          />
        </div>

       </div>
    </div>
  )
}

export default MembersExpiryPage