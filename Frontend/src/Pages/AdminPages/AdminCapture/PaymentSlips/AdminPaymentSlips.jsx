import React, { useContext, useEffect, useState } from 'react'
import { adminPaymentSlipsColumn, paymentSlipColumn } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { debounce } from '@mui/material/utils';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const AdminPaymentSlips = () => {
  const { t, i18n } = useTranslation();
  const [IsLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async (value) => {
    setIsLoading(true);

    try {
      let response = await newRequest.get(`/memberDocuments?type=bank_slip`);
      // console.log(response.data);
      setData(response?.data || []);

      setIsLoading(false)

    } catch (err) {
      // console.log(err);
      setIsLoading(false)
    }
  };




  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`} >
        <div>
          <AdminDashboardRightHeader
            title={`${t('Payment Slips')}`}
          />
        </div>


        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-3 bg-white shadow-xl rounded-md">



              <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

                <DataTable data={data} title={`${t('Payment Slips')}`} columnsName={paymentSlipColumn(t)}
                  loading={IsLoading}
                  checkboxSelection="disabled"
                  secondaryColor="secondary"
                  actionColumnVisibility={false}
                  // globalSearch={true}
                  // uniqueId="admin_registered_members"

                  dropDownOptions={[
                    {
                      label: `${t('Profile')}`,
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


                />
              </div>

            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default AdminPaymentSlips