import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { useNavigate } from 'react-router-dom';
import { KpiReportColumn, productsCategoryColumn } from '../../../../../utils/datatablesource';
import { Button, CircularProgress } from '@mui/material';

const KPIReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [todayLoader, setTodayLoader] = useState(false);
  const [weeklyLoader, setWeeklyLoader] = useState(false);
  const [monthlyLoader, setMonthlyLoader] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      transactionType: 1,
      date: '2022-01-24T12:30:00', // Replace with an actual date string
      companyId: 'ABC123',
      company: 'Company A',
      amount: 1000,
      products: 'Product A, Product B',
      actionby: 'John Doe',
    },
    {
      id: 2,
      transactionType: 0,
      date: '2022-01-25T14:45:00', // Replace with an actual date string
      companyId: 'DEF456',
      company: 'Company B',
      amount: 1500,
      products: 'Product C, Product D',
      actionby: 'Jane Smith',
    },
  ]);
  const navigate = useNavigate();

  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader title={t('KPI Report')} />
  const handleTodayLoader = () => {
    setTodayLoader(true);
    setTimeout(() => {
      setTodayLoader(false);
    }, 2000);
  };

  const handleWeeklyLoader = () => {
    setWeeklyLoader(true);
    setTimeout(() => {
      setWeeklyLoader(false);
    }, 2000);
  }

  const handleMonthlyLoader = () => {
    setMonthlyLoader(true);
    setTimeout(() => {
      setMonthlyLoader(false);
    }, 2000);
  }


  
  return (
    <div>
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
            <div>
                <AdminDashboardRightHeader title={t('KPI Report')} />
            </div>

            <div className='flex justify-center items-center'>
             <div className="h-auto w-[97%] px-0 pt-4">
                <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

                <div className={`flex  sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                  <div className='w-full flex gap-2 flex-wrap'> 
                    {/* <button
                     className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                        {t('Today')}
                    </button> */}
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#021F69', color: '#ffffff', borderRadius: '20px', height: '28px' }}
                      disabled={todayLoader}
                      onClick={handleTodayLoader}
                      endIcon={todayLoader ? <CircularProgress size={24} color="inherit" /> : null }
                    >
                     {t('Today')}
                    </Button>

                    {/* <button
                     className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                        {t('Weekly')}
                    </button> */}
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#021F69', color: '#ffffff', borderRadius: '20px', height: '28px' }}
                      disabled={weeklyLoader}
                      onClick={handleWeeklyLoader}
                      endIcon={weeklyLoader ? <CircularProgress size={24} color="inherit" /> : null }
                    >
                     {t('Weekly')}
                    </Button>

                    {/* <button
                     className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                        {t('Monthly')}
                    </button> */}
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#021F69', color: '#ffffff', borderRadius: '20px', height: '28px',}}
                      disabled={monthlyLoader}
                      onClick={handleMonthlyLoader}
                      endIcon={monthlyLoader ? <CircularProgress size={24} color="inherit" /> : null }
                    >
                      {t('Monthly')}
                    </Button>

                    <button
                     className="rounded-full bg-green-500 font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                         <i className="fas fa-file-excel mr-2"></i>{t('EXCEL')}
                    </button>

                    <button
                     className="rounded-full bg-red-500 font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                         <i className="fas fa-file-pdf mr-2"></i>{t('PDF')}
                    </button>
                  </div>

                  <div className='flex justify-end items-end flex-wrap gap-2 w-full'>
                    <div className="flex flex-col">
                        <label className="font-body text-sm">{t('From')}</label>
                        <input
                            type="date"
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-body text-sm">{t('To')}</label>
                        <input
                            type="date"
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    
                    <button
                        className="rounded-full bg-primary font-body px-5 py-2 text-sm mb-1 text-white transition duration-200 hover:bg-secondary">
                            {t('Search')}
                    </button>
                  </div>
                </div>

                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-15px' }}>

                    <DataTable data={data}
                    title={t('KPI Report')}
                    columnsName={KpiReportColumn}
                    loading={isLoading}
                    secondaryColor="secondary"
                    actionColumnVisibility={false}
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
                    //     label: t("Edit"),
                    //     icon: (
                    //         <EditIcon
                    //         fontSize="small"
                    //         color="action"
                    //         style={{ color: "rgb(37 99 235)" }}
                    //         />
                    //     ),
                    //     action: handleShowUpdatePopup,
                    //     },
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

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              <div className={`flex sm:justify-start items-center  flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div  className={`w-full flex gap-2 flex-wrap ${i18n.language === 'ar' ? 'flex-row-reverse ' : 'flex-row'}`}>
                  <button
                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    {t('Today')}
                  </button>

                  <button
                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    {t('Weekly')}
                  </button>

                  <button
                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    {t('Monthly')}
                  </button>

                  <button
                    className="rounded-full bg-green-500 font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    <i className="fas fa-file-excel mr-2"></i>{t('Excel')}
                  </button>

                  <button
                    className="rounded-full bg-red-500 font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    <i className="fas fa-file-pdf mr-2"></i>{t('Pdf')}
                  </button>
                </div>

                <div className='flex justify-end items-end flex-wrap gap-2 w-full'>
                  <div className="flex flex-col">
                    <label className="font-body text-sm">{t('From')}</label>
                    <input
                      type="date"
                      className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-body text-sm">{t('To')}</label>
                    <input
                      type="date"
                      className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                  </div>

                  <button
                    className="rounded-full bg-primary font-body px-5 py-2 text-sm mb-1 text-white transition duration-200 hover:bg-secondary">
                    {t('Search')}
                  </button>
                </div>
              </div>

              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-15px' }}>

                <DataTable data={data}
                  title={t('KPI Report')}
                  columnsName={KpiReportColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  actionColumnVisibility={false}
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
                  //     label: t("Edit"),
                  //     icon: (
                  //         <EditIcon
                  //         fontSize="small"
                  //         color="action"
                  //         style={{ color: "rgb(37 99 235)" }}
                  //         />
                  //     ),
                  //     action: handleShowUpdatePopup,
                  //     },
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

export default KPIReport