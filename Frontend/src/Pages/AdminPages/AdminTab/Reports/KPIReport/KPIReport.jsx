import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AdminDashboardRightHeader from '../../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import DataTable from '../../../../../components/Datatable/Datatable';
import { useNavigate } from 'react-router-dom';
import { productsCategoryColumn } from '../../../../../utils/datatablesource';

const KPIReport = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
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

                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-15px' }}>

                    <DataTable data={data}
                    title={t('KPI Report')}
                    columnsName={productsCategoryColumn}
                    loading={isLoading}
                    secondaryColor="secondary"
                    actionColumnVisibility={false}
                    showToolbarSlot={false}
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