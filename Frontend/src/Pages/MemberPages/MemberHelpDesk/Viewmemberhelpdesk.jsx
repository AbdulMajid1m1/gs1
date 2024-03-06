import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import newRequest from "../../../utils/userRequest";
import DataTable from "../../../components/Datatable/Datatable";
import { DataTableContext } from "../../../Contexts/DataTableContext";
import { Commentcolumdata } from "../../../utils/datatablesource";
// import Commontslist from './Commontslist';

const Viewmemberhelpdesk = ({ isVisible, setVisibility, refreshBrandData }) => {
  // get this session data
  const updateBrandData = JSON.parse(
    sessionStorage.getItem("Viewassigentomember")
  );
  const { t, i18n } = useTranslation();
  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
  } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const refreshcitiesData = async () => {
    try {
      const response = await newRequest.get(
        `/gethelpdesk_commentByuserid/${updateBrandData?.id}`
      );
      setData(response?.data || []);
      console.log("-_____________-----", response?.data || []);
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
      {isVisible && (
        <div className="popup-overlay">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full max-h-screen overflow-y-auto">
              <div className="w-full">
                <div className="flex justify-between">
                  <h2 className="text-secondary font-sans font-semibold text-2xl">
                    {t("Ticket Details")}
                  </h2>
                  <p className="text-secondary font-sans font-semibold ">
                    {t("Ticket No")}: {updateBrandData?.ticket_no || ""}
                  </p>
                </div>
                <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                  <DataTable
                    data={data}
                    columnsName={Commentcolumdata(t)}
                    loading={isLoading}
                    secondaryColor="secondary"
                    handleRowClickInParent={handleRowClickInParent}
                    actionColumnVisibility={false}
                    uniqueId="gtinMainTableId"
                  />
                </div>
                <div className=" mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    {t("Close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewmemberhelpdesk;
