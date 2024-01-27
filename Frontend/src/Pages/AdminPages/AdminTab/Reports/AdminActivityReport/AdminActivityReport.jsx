import React from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { AdminActivityReportColumn } from '../../../../../utils/datatablesource';
// import BarsDataset from './BarCharts';

const AdminActivityReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([
    {
      id: 1,
      details: 'Logged in and updated user profiles',
      ipaddress: '192.168.1.100',
      admin: 'Admin1',
      date: '2022-01-24T12:30:00', // Replace with an actual date string
    },
    {
      id: 2,
      details: 'Created new user accounts',
      ipaddress: '192.168.1.105',
      admin: 'Admin2',
      date: '2022-01-25T14:45:00', // Replace with an actual date string
    },
  ]);
  
  return (
    <div>
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
           <div>
              <AdminDashboardRightHeader title={t('Admins Log')} />
           </div>

           <div className='flex justify-center items-center'>
             <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 py-5 bg-white shadow-xl rounded-md">

                    <div className='flex p-4 gap-2 w-full'>
                      <div className="flex flex-col w-full">
                        <label className="font-body text-sm">{t('Admins')}</label>
                        <select
                          type="text"
                          className="border border-gray-300 p-2 rounded-lg"
                        >
                          <option value="">{t('Admin 1')}</option>
                          <option value="">{t('Admin 2')}</option>
                        </select>
                      </div>
                      <div className="flex flex-col w-full">
                          <label className="font-body text-sm">{t('Start Date')}</label>
                          <input
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                      <div className="flex flex-col w-full">
                          <label className="font-body text-sm">{t('End Date')}</label>
                          <input
                              type="date"
                              className="border border-gray-300 p-2 rounded-lg"
                          />
                      </div>
                    </div>

                      <div className='flex justify-between flex-wrap px-5'>
                          <button
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                          >
                             {t('View Admin Activity')}
                          </button>
                          <button
                            className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                          >
                             {t('Download Excel')}
                          </button>
                      </div>
                  


                      {/* <div className='flex justify-center items-center mt-6'>
                          <BarsDataset />
                      </div> */}
                    </div>
                  </div>
                </div>


              <div className='flex justify-center items-center'>
               <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px', padding: '10px' }}>

                  <DataTable data={data}
                  title={t('Admin Activity Chart')}
                  columnsName={AdminActivityReportColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  actionColumnVisibility={false}
                  showToolbarSlot={false}
                  checkboxSelection={'disabled'}
                  // handleRowClickInParent={handleRowClickInParent}

                  // dropDownOptions={[
                      // {
                      //   label: t("View"),
                      //   icon: (
                      //     <VisibilityIcon
                      //       fontSize="small"
                      //       color="action"
                      //       style={{ color: "rgb(37 99 235)" }}
                      //     />
                      //   ),
                      //   action: handleView,
                      // },
                  //     {
                  //     label: t("Delete"),
                  //     icon: (
                  //         <DeleteIcon
                  //         fontSize="small"
                  //         color="action"
                  //         style={{ color: "rgb(37 99 235)" }}
                  //         />
                  //     ),
                  //     action: handleDelete,
                  //     },

                  // ]}
                  uniqueId="gtinMainTableId"

                  />
                  </div>

                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AdminActivityReport