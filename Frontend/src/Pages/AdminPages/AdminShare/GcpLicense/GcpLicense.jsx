import React, { useEffect, useState } from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../components/Datatable/Datatable';
import { licenceRegistryColumn } from '../../../../utils/datatablesource';
import EditIcon from "@mui/icons-material/Edit";
import RestorePageIcon from '@mui/icons-material/RestorePage';
import newRequest from '../../../../utils/userRequest';
import * as XLSX from "xlsx";
import { toast } from 'react-toastify';

const GcpLicense = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);


  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await newRequest.get("/users/getLicenseRegisteryUser",);

      // console.log(response.data);
      setData(response?.data?.data || []);
      setIsLoading(false)

    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.error || err?.response?.data || "Something went wrong!");
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleRegenerate = async (row) => {
    try {
      const response = await newRequest.post("/users/postGepirLicence", {
        userId: row?.id,
      });
      console.log(response?.data);
      toast.success(response?.data?.message || "Licence Uploaded Successfully");

      // response.data.updatedUser has updated record. Replace the record in the data array with the updated record
      const updatedData = data.map(item => {
        if (item.id === response.data.updatedUser.id) {
          return response.data.updatedUser;
        }
        return item;
      });

    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
      setIsLoading(false)
    }
  };


  const handleExportProductsTemplate = () => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    // Assuming these are the specific columns you want to export
    const selectedColumns = ['gcpGLNID', 'gcp_type', 'company_name_eng', 'gln', 'status', 'additional_number'];

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
      width: index === 0 ? 15 : 15, // Set the width to 25 for the first column, and 15 for the rest
    }));
    worksheet['!cols'] = columnWidths;

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Kpi Report');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'licenceRegistry.xlsx');
  };


  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      return
    }

  }

  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader
            title={'Gcp Licence'}
          />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              <div className={`flex sm:justify-start items-center flex-wrap gap-2 py-4 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  onClick={handleExportProductsTemplate}
                  className="rounded-full bg-green-500 font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary">
                  <i className="fas fa-file-excel mr-2"></i>{t('EXCEL')}
                </button>
              </div>

              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data}
                  title={'Gcp Licence'}
                  columnsName={licenceRegistryColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  checkboxSelection={'disabled'}
                  globalSearch={true}
                  // actionColumnVisibility={false}
                  handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[
                    // {
                    //   label: "Update Data",
                    //   icon: (
                    //     <EditIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleEdit,
                    // },
                    {
                      label: "Posted GEPIR",
                      icon: (
                        <RestorePageIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleRegenerate,
                    },

                  ]}
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

export default GcpLicense