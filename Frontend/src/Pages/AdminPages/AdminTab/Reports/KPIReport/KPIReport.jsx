import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { useNavigate } from 'react-router-dom';
import { KpiReportColumn } from '../../../../../utils/datatablesource';
import { Button, CircularProgress } from '@mui/material';
import newRequest from '../../../../../utils/userRequest';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const KPIReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [todayLoader, setTodayLoader] = useState(false);
  const [weeklyLoader, setWeeklyLoader] = useState(false);
  const [monthlyLoader, setMonthlyLoader] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('');
  const [shouldCallApi, setShouldCallApi] = useState(false);

  const [data, setData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (shouldCallApi) {
      handleSearchTimeAndDate();
      setShouldCallApi(false); // Reset the flag after making the API call
    }
  }, [startDate, endDate, shouldCallApi]);


  useEffect(() => {
    handleTodayLoader();
  }, []);

  const handleTodayLoader = () => {
    setTodayLoader(true);
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    // handleSearchTimeAndDate();
    setShouldCallApi(true);
  };

  const handleWeeklyLoader = () => {
    setWeeklyLoader(true);
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    setStartDate(lastWeek.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    // handleSearchTimeAndDate();
    setShouldCallApi(true);
  };

  const handleMonthlyLoader = () => {
    setMonthlyLoader(true);
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    setStartDate(lastMonth.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    setShouldCallApi(true);
  };


  const handleSearchTimeAndDate = async () => {
    setIsLoading(true);

    try {
      const formattedStartDate = new Date(startDate);
      formattedStartDate.setHours(0, 0, 0, 0);
      const formattedEndDate = new Date(endDate);
      formattedEndDate.setHours(23, 59, 59, 999);
      console.log(formattedStartDate?.toISOString(), formattedEndDate?.toISOString());


      const res = await newRequest.post('/report/kpi', {
        startDate: formattedStartDate.toISOString(),
        endDate: formattedEndDate.toISOString(),
      });

      // admin - username - email, user - companyID, companyNameE, productName
      console.log(res?.data?.combinedResults);

      const formattedData = res?.data?.combinedResults?.map((item) => {
        return {
          transaction_id: item?.transaction_id,
          price: item?.price,
          request_type: item?.request_type,
          status: item?.status,
          payment_type: item?.payment_type,
          username: item?.admin?.username,
          email: item?.admin?.email,
          companyID: item?.user?.companyID,
          company_name_eng: item?.user?.company_name_eng,
          productName: item?.productName,
          created_at: item?.created_at,
        };
      });

      // console.log(formattedData);

      setData(formattedData);
      setIsLoading(false);
      setTodayLoader(false);
      setWeeklyLoader(false);
      setMonthlyLoader(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(err?.response?.data || 'Error in fetching data');

      // Reset loaders after API call is complete
      setTodayLoader(false);
      setWeeklyLoader(false);
      setMonthlyLoader(false);
    }
  }



  const handleExportProductsTemplate = () => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    // Assuming these are the specific columns you want to export
    const selectedColumns = ['transaction_id', 'price', 'request_type', 'status', 'payment_type', 'username', 'email', 'companyID', 'company_name_eng', 'productName', 'created_at'];

    // Create a worksheet with headers and selected data
    const filteredData = data.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    // Create a worksheet with headers and data
    const worksheet = XLSX.utils.json_to_sheet([{}].concat(filteredData), { header: selectedColumns });

    // Set column widths in the !cols property
    const columnWidths = selectedColumns.map((column, index) => ({
      width: index === 0 ? 20 : 25, // Set the width to 25 for the first column, and 15 for the rest
    }));
    worksheet['!cols'] = columnWidths;

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Kpi Report');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'kpi_report_template.xlsx');
  };



  const handlePdfExport = (returnBlob = false) => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    const doc = new jsPDF("landscape");

    // Specify the columns you want to export
    const exportColumns = ['transaction_id', 'price', 'request_type', 'status', 'payment_type', 'username', 'email', 'companyID', 'company_name_eng', 'productName', 'created_at'];

    // Calculate the font size based on the number of columns
    const maxColumns = 10;
    const minFontSize = 5;
    const maxFontSize = 10;
    const fontSize = exportColumns.length <= maxColumns ? maxFontSize : Math.max(minFontSize, maxFontSize - (exportColumns.length - maxColumns));

    const tableData = data.map((item) => {
      const row = {};
      exportColumns.forEach((column) => {
        row[column] = item[column];
      });
      return Object.values(row);
    });

    // Use autoTable to generate the table in the PDF
    doc.autoTable({
      head: [exportColumns],
      body: tableData,
      theme: "grid",
      styles: { fontSize: fontSize },
      headStyles: { fillColor: [2, 31, 105], textColor: 255, fontStyle: "bold" },
      startY: 20,
      tableWidth: "auto",
    });

    if (returnBlob) {
      const blob = doc.output("blob");
      return blob;
    } else {
      // doc.save(`${title}.pdf`);
      doc.save(`KpiReport.pdf`);
    }
  };





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
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff', borderRadius: '20px', height: '28px' }}
                    disabled={todayLoader}
                    onClick={handleTodayLoader}
                    endIcon={todayLoader ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                    {t('Today')}
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff', borderRadius: '20px', height: '28px' }}
                    disabled={weeklyLoader}
                    onClick={handleWeeklyLoader}
                    endIcon={weeklyLoader ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                    {t('Weekly')}
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff', borderRadius: '20px', height: '28px', }}
                    disabled={monthlyLoader}
                    onClick={handleMonthlyLoader}
                    endIcon={monthlyLoader ? <CircularProgress size={24} color="inherit" /> : null}
                  >
                    {t('Monthly')}
                  </Button>

                  <button
                    onClick={handleExportProductsTemplate}
                    className="rounded-full bg-green-500 font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    <i className="fas fa-file-excel mr-2"></i>{t('EXCEL')}
                  </button>

                  <button
                    onClick={() => handlePdfExport()}
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