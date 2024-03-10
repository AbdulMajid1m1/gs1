import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import newRequest from '../../../../utils/userRequest'
import { memberForRenevalColumn } from '../../../../utils/datatablesource'
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { useTranslation } from 'react-i18next';

const MembersExpiryPage = () => {
  const [memberReneval, setMemberReneval] = useState([]);
  const [memberRenevalLoader, setMemberRenevalLoader] = useState(false);
  const { t, i18n } = useTranslation();

  const getNewTransferOrder = async () => {
    setMemberRenevalLoader(true);
    try {

      newRequest.get("/users/getByGcpExpiry")
        .then(response => {
          // console.log("MemberReneval", response.data)
          setMemberReneval(response.data)
          setMemberRenevalLoader(false);
        })
        .catch(error => {
          console.error(error);
          setMemberRenevalLoader(false);
        });

    }
    catch (error) {
      // console.log(error);

    }
  };

  useEffect(() => {
    getNewTransferOrder()
  }
    , [])
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`} >
        <div>
          <AdminDashboardRightHeader
            title={`${t('Members Expiry Page')}`}
          />
        </div>

        <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

          <DataTable data={memberReneval} title={`${t('Members Expiry Page')}`} columnsName={memberForRenevalColumn(t)}
            loading={memberRenevalLoader}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            globalSearch={true}
            // handleRowClickInParent={handleRowClickInParent}
            uniqueId="members_expiry_page_id"

            dropDownOptions={[
              {
                label: `${t('Send Invoice')}`,
                icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                ,
                // action: fetchMemberInvoiceData,

              },
              {
                label: `${t('Open Profile')}`,
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