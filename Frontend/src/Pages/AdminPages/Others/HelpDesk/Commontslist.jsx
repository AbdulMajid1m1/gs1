import { useContext, useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { Commentcolumdata } from "../../../../utils/datatablesource";
import newRequest from '../../../../utils/userRequest'
import { useTranslation } from 'react-i18next';
const Commontslist = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const updateBrandData = JSON.parse(sessionStorage.getItem("Viewassigento"))
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
  } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const refreshcitiesData = async () => {
    try {
      const response = await newRequest.get(`gethelpdesk_commentByuserid/${updateBrandData?.id}`);
      setData(response?.data || []);
    console.log(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    refreshcitiesData(); // Calling the function within useEffect, not inside itself
  }, []);

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data);
      setFilteredData(data);
      return;
    }
  };

  return (
    <div>
      {/* DataGrid */}
      <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
        <DataTable
          data={data}
          columnsName={Commentcolumdata(t)}
          loading={isLoading}
          secondaryColor="secondary"
          handleRowClickInParent={handleRowClickInParent}
          actionColumnVisibility={false}
          // dropDownOptions={[

          //     {
          //         label: `${t('Edit')}`,
          //         icon: (
          //             <EditIcon
          //                 fontSize="small"
          //                 color="action"
          //                 style={{ color: "rgb(37 99 235)" }}
          //             />
          //         ),
          //         action: handleShowUpdatePopup,
          //     },
          //     {
          //         label: `${t('Delete')}`,
          //         icon: (
          //             <DeleteIcon
          //                 fontSize="small"
          //                 color="action"
          //                 style={{ color: "rgb(37 99 235)" }}
          //             />
          //         ),
          //         action: handleDelete,
          //     },

          // ]}
          uniqueId="gtinMainTableId"
        />
      </div>
    </div>
  );
};

export default Commontslist;