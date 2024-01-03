import React, { useEffect, useState } from 'react'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import DataTable from '../../../../components/Datatable/Datatable'
import newRequest from '../../../../utils/userRequest'
import { memberForRenevalColumn } from '../../../../utils/datatablesource'

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

            // dropDownOptions={[
            //   {
            //     label: "Profile",
            //     icon: (
            //       <VisibilityIcon
            //         fontSize="small"
            //         color="action"
            //         style={{ color: "rgb(37 99 235)" }}
            //       />
            //     ),
            //     action: handleView,
            //   },
            //   {
            //     label: "Activation",
            //     icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
            //     ,
            //     action: fetchMemberInvoiceData,

            //   },
              // {
              // label: "Open",
              // icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
              // ,
              // action: handleOpen,

              // },

            //   ,
            //   {
            //     label: "Delete",
            //     icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
            //     ,
            //     action: handleDelete,
            //   }

            // ]}


          />
        </div>

       </div>
    </div>
  )
}

export default MembersExpiryPage