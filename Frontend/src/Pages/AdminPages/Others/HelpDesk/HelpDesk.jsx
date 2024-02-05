import React, { useEffect, useState } from 'react'
import AdminDashboardRightHeader from '../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader'
import { useTranslation } from 'react-i18next';
import DataTable from '../../../../components/Datatable/Datatable';
import { staffAssignedTaskColumn } from '../../../../utils/datatablesource';
import newRequest from '../../../../utils/userRequest';

const HelpDesk = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  // const fetchData = async () => {
  //   setIsLoading(true)
  //   try {
  //     const response = await newRequest.get("/users/getUsersWithAssignTo");

  //     console.log(response.data);
  //     setData(response?.data || []);
  //     setIsLoading(false)

  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.response?.data?.error || err?.response?.data || "Something went wrong!");
  //     setIsLoading(false)
  //   }
  // };

  // useEffect(() => {
  //   fetchData(); // Calling the function within useEffect, not inside itself
  // }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleRowClickInParent = (item) =>
  {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      return
    }

  }
 
  return (
    <div>
        <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
          <div>
            <AdminDashboardRightHeader title={'List of created tickets'} />
          </div>

          <div className='flex justify-center items-center'>
            <div className="h-auto w-[97%] px-0 pt-4">
              <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">
              
                {/* DataGrid */}
                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                  <DataTable data={data}
                    title={'List of created tickets'}
                    columnsName={staffAssignedTaskColumn(t)}
                    loading={isLoading}
                    secondaryColor="secondary"
                    checkboxSelection={'disabled'}
                    actionColumnVisibility={false}
                    handleRowClickInParent={handleRowClickInParent}

                    dropDownOptions={[
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

export default HelpDesk