import React, { useContext, useEffect, useState } from 'react'
import { adminPaymentSlipsColumn } from '../../../../utils/datatablesource'
import DataTable from '../../../../components/Datatable/Datatable'
// import newRequest from '../../../../utils/userRequest';
import { DataTableContext } from '../../../../Contexts/DataTableContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader';
import { useTranslation } from 'react-i18next';

const ProductsCategory = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "hasnain@gmail.com",
      phone: "03001234567",
      status: "Active",
      role: "Admin",
      date: "12-12-2020",
    },
    {
      id: 2,
      name: "Hasnain",
      email: "hasnain@gmail.com",
      phone: "03069396743",
      status: "Active",
      role: "Admin",
      date: "12-12-2020",
    },
  ]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);


  // const fetchData = async () => {
  //   try {
  //     const response = await newRequest.get("/users",);

  //     console.log(response.data);
  //     setData(response?.data || []);
  //     setIsLoading(false)

  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false)
  //   }
  // };

  // useEffect(() => {
  //   fetchData(); // Calling the function within useEffect, not inside itself
  // }, []); // Empty array dependency ensures this useEffect runs once on component mount



  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <AdminDashboardRightHeader 
            title={`${t('Products Category')}`} 
          />
        </div>

        <div style={{ marginLeft: '-0px', marginRight: '-0px' }}>

          <DataTable data={data} title={`${t('Products Category')}`} columnsName={adminPaymentSlipsColumn}
            loading={IsLoading}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            // globalSearch={true}
            // uniqueId="admin_registered_members"

            // dropDownOptions={[
            //   {
            //     label: "Profile",
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


          />
        </div>



      </div>
    </div>
  )
}

export default ProductsCategory