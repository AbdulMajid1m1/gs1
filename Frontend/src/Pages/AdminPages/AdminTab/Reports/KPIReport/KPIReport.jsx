import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { useNavigate } from 'react-router-dom';
import { KpiReportColumn, productsCategoryColumn } from '../../../../../utils/datatablesource';
import { Button, CircularProgress } from '@mui/material';
import newRequest from '../../../../../utils/userRequest';
import { toast } from 'react-toastify';
import moment from 'moment';

const KPIReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [todayLoader, setTodayLoader] = useState(false);
  const [weeklyLoader, setWeeklyLoader] = useState(false);
  const [monthlyLoader, setMonthlyLoader] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('');
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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

  const handleSearchTimeAndDate = async () => {
    setIsLoading(true);
    
    try {
      const formattedStartDate = new Date(startDate);
      formattedStartDate.setHours(0, 0, 0, 0);
      const formattedEndDate = new Date(endDate);
      formattedEndDate.setHours(23, 59, 59, 999);
      console.log(formattedStartDate?.toISOString(), formattedEndDate?.toISOString());
      
      
      const res = await newRequest.get('/report/kpi', {
        startDate: formattedStartDate.toISOString(),
        endDate: formattedEndDate.toISOString(),
      });

      console.log(res?.data?.combinedResults);
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.error || 'Error in fetching data');
    }
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
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-body text-sm">{t('To')}</label>
                        <input
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    
                    <button
                        type='button'
                        onClick={handleSearchTimeAndDate}
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
    </div>
  )
}

export default KPIReport