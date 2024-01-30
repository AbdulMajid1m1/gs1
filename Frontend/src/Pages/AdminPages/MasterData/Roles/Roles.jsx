import React, { useState } from 'react'
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { AdminRolesColumn } from '../../../../utils/datatablesource';
import DataTable from '../../../../components/Datatable/Datatable';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';

const Roles = () => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      roles: 'Admin',
    },
    {
      id: 2,
      roles: 'Member',
    },
    {
      id: 3,
      roles: 'User',
    },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader title={'Roles'}/>
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-4 bg-white shadow-xl rounded-md">

              <div className="flex justify-start py-3">
                <button
                  onClick={() => navigate('/admin/add-roles')}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  <i className="fas fa-plus mr-2"></i>Add Role
                </button>
              </div>
              
              {/* DataGrid */}
              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data}
                  title='Roles'
                  columnsName={AdminRolesColumn}
                  loading={isLoading}
                  secondaryColor="secondary"
                  checkboxSelection={'disabled'}
                  // actionColumnVisibility={false}
                  // handleRowClickInParent={handleRowClickInParent}

                  dropDownOptions={[
                  {
                    label: t("View"),
                    icon: (
                      <VisibilityIcon
                        fontSize="small"
                        color="action"
                        style={{ color: "rgb(37 99 235)" }}
                      />
                    ),
                    // action: handleView,
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

export default Roles