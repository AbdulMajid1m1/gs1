import React, { useState } from 'react'
import { bankSlipColumn, financeColumn } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import DataTable3 from '../../../../components/Datatable/Datatable3'
import DashboardRightHeader from '../../../../components/DashboardRightHeader/DashboardRightHeader'
import { I18nextProvider, useTranslation } from "react-i18next";

const Rejected = () => {
    const { t, i18n } = useTranslation();
    const [cardsRejected, setCardsRejected] = useState([])
    const [cardsRejectedLoader, setCardsRejectedLoader] = useState(false)
    const [usersRejected, setUsersRejected] = useState([])
    const [usersRejectedLoader, setUsersRejectedLoader] = useState(false)
    const [filteredUsersDetails, setFilteredUsersDetails] = useState([])
    
  const handleRowClickInParent = (item) => {
    console.log(item);
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      // setFilteredData(data)
      setFilteredUsersDetails(usersRejected)
      return
    }
    // fetchFilteredMemberDetails(item);
    
    }
    
  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
            <DashboardRightHeader title={t('Rejected')}/>
        </div>
       {/* Rejected Datagrid */}
        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">

              <div className='flex gap-5 flex-wrap'>
                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable data={cardsRejected}
                    title="Carts Rejected"
                    columnsName={financeColumn}
                    loading={cardsRejectedLoader}
                    secondaryColor="secondary"
                    handleRowClickInParent={handleRowClickInParent}
                    checkboxSelection={"disabled"}
                    buttonVisibility={false}
                    // dropDownOptions={[
                    //   {
                    //     label: "Activation",
                    //     icon: <SwapHorizIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                    //     ,
                    //     action: handleShowMemberInvoicePopup,
                    //   },

                    // ]}
                    uniqueId="memberInvoiceId"

                  />
                </div>

                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}
                  className='sm:w-[50%] w-full'
                >
                  <DataTable3 data={filteredUsersDetails}
                    title="Users Rejected"
                    columnsName={bankSlipColumn}
                    loading={usersRejectedLoader}
                    secondaryColor="secondary"
                    buttonVisibility={false}
                    checkboxSelection={"disabled"}
                    actionColumnVisibility={false}

                    // dropDownOptions={[
                    //   {
                    //     label: "View",
                    //     icon: (
                    //       <VisibilityIcon
                    //         fontSize="small"
                    //         color="action"
                    //         style={{ color: "rgb(37 99 235)" }}
                    //       />
                    //     ),
                    //     action: handleView,
                    //   },
                    // ]}
                    uniqueId="memberBankSlipId"

                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        </div>
    </div>
  )
}

export default Rejected