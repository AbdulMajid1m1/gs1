'use client';
import "./Datatable.css";
// import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
// import CustomSnakebar from "../../utils/CustomSnakebar";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

import { GridToolbar } from "@mui/x-data-grid";
import { MuiCustomTable } from "../../utils/MuiCustomTable";
import ActionDropdown from "../../utils/ActionDropdown";
// import newRequest from "../../../utils/userRequest";
// import NewUserPopup from "../../NewUserPopup/NewUserPopup";
import { DataTableContext } from "../../Contexts/DataTableContext";
import CustomSnakebar from "../../utils/CustomSnackbar";
import { SnackbarContext } from "../../Contexts/SnackbarContext";
import Swal from "sweetalert2";
// import * as XLSX from 'xlsx';

const DataTable = ({
  columnsName = [],
  data,
  title,
  actionColumnVisibility,
  uniqueId,
  ShipmentIdSearchEnable,
  ContainerIdSearchEnable,
  buttonVisibility,
  checkboxSelection,
  processRowUpdate,
  dropDownOptions,
  handleRowClickInParent,
  loading,
  setIsLoading,
  NewUser,
  Permission,
  secondaryColor,
  refreshData,
  handleEdit,
  dropDown,
  handleUserListPopUp,
  AssignPickListBtn,
  sendInvitation,
  handleSendInvitationPopup,
  AddDocBtn,
  handleAddDoc,
  handleUsers,
  handleAddUser,
}) => {
  // const navigate = useNavigate();
  const [qrcodeValue, setQRCodeValue] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [record, setRecord] = useState([]);
  const [shipmentIdSearch, setShipmentIdSearch] = useState("");
  const [containerIdSearch, setContainerIdSearch] = useState("");
  const [updatedRows, setUpdatedRows] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [muiFilteredData, setMuiFilteredData] = useState([]);
  // const { rowSelectionModel, setRowSelectionModel, tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  //   const { openSnackbar } = useContext(SnackbarContext);

  const resetSnakeBarMessages = () => {
    setError(null);
    setMessage(null);
  };

  // if checkboxSelection is giving in props then use it other wise by default it is false
  const checkboxSelectionValue = checkboxSelection == "disabled" ? false : true;

  const [filterModel, setFilterModel] = useState({ items: [] });

  const handleFilterModelChange = (newFilterModel) => {
    setFilterModel(newFilterModel);

    // You can apply the filtering logic here and use the filtered rows for your other logic
    const filteredRows = applyFiltering(filteredData, newFilterModel);
    console.log("Filtered rows:", filteredRows);
    setMuiFilteredData(filteredRows);
  };

  const operatorFunctions = {
    contains: (cellValue, value) =>
      cellValue !== null && cellValue.toString().includes(value),
    notContains: (cellValue, value) =>
      cellValue !== null && !cellValue.toString().includes(value),
    equals: (cellValue, value) =>
      cellValue !== null ? cellValue.toString() === value : cellValue === value,
    notEqual: (cellValue, value) =>
      cellValue !== null ? cellValue.toString() !== value : cellValue !== value,
    greaterThan: (cellValue, value) => cellValue !== null && cellValue > value,
    greaterThanOrEqual: (cellValue, value) =>
      cellValue !== null && cellValue >= value,
    lessThan: (cellValue, value) => cellValue !== null && cellValue < value,
    lessThanOrEqual: (cellValue, value) =>
      cellValue !== null && cellValue <= value,
    startsWith: (cellValue, value) =>
      cellValue !== null && cellValue.toString().startsWith(value),
    endsWith: (cellValue, value) =>
      cellValue !== null && cellValue.toString().endsWith(value),
  };

  const applyFiltering = (filteredData, filterModel) => {
    if (!filterModel || !filterModel.items || filterModel.items.length === 0) {
      return filteredData;
    }

    return filteredData.filter((row) => {
      return filterModel.items.every((filter) => {
        const { field, operator, value } = filter;
        const cellValue = row[field];

        if (!operatorFunctions.hasOwnProperty(operator)) {
          console.warn(`Unknown filter operator: ${operator}`);
          return true;
        }

        return operatorFunctions[operator](cellValue, value);
      });
    });
  };
  const ids = [
    'gln_id',
    'purchaseOrderId',
    'gtinMainTableId',
    'ssccTableId',
    'customerListId'
  ]
  const handleRowClick = (item) => {
    console.log(item)
    // check if the uniqueId is in the ids array
    if (ids.includes(uniqueId)) {
      handleRowClickInParent(item);
      return;
    }


  };

  useEffect(() => {
    if (data) {
      setRecord(data.map((item, index) => ({ ...item, no: index + 1 })));
    }
  }, [data]);

  const filteredData =
    shipmentIdSearch && containerIdSearch
      ? record.filter(
        (item) =>
          item.SHIPMENTID.toLowerCase().includes(
            shipmentIdSearch.toLowerCase()
          ) &&
          item.CONTAINERID.toLowerCase().includes(
            containerIdSearch.toLowerCase()
          )
      )
      : shipmentIdSearch && !containerIdSearch
        ? record.filter((item) =>
          item.SHIPMENTID.toLowerCase().includes(shipmentIdSearch.toLowerCase())
        )
        : !shipmentIdSearch && containerIdSearch
          ? record.filter((item) =>
            item.CONTAINERID.toLowerCase().includes(
              containerIdSearch.toLowerCase()
            )
          )
          : record;

  useEffect(() => {
    setMuiFilteredData(filteredData);
  }, [filteredData]);

  const handleSearch = (e) => {
    // setShipmentIdSearch(e.target.value);
    e.target.name === "SHIPMENTID"
      ? setShipmentIdSearch(e.target.value)
      : setContainerIdSearch(e.target.value);
    console.log(e.target.name, e.target.value);
    console.log(shipmentIdSearch, containerIdSearch);
  };
  // Retrieve the value with the key "myKey" from localStorage getvalue
  // const myValue = localStorage.getItem("userId");
  // console.log(myValue);

  // const handleDelete = async (id, rowdata) => {
  //     // if (window.confirm("Are you sure you want to delete this user?")) {
  //     //   let success = false;

  //     //   switch (uniqueId) {
  //     //     case "SERIALNUM":
  //     //       // call the api to delete the data from the shipment table
  //     //       try {
  //     //         const response = await userRequest.delete(
  //     //           "deleteShipmentRecievedDataCL?SERIALNUM=" + rowdata.SERIALNUM
  //     //         );
  //     //         console.log(response);
  //     //         setMessage(response?.data?.message ?? "User deleted successfully");
  //     //         success = true; // to update the state of the table
  //     //       } catch (error) {
  //     //         setError(error?.message ?? "Something went wrong");
  //     //         success = false;
  //     //       }
  //     //       break;

  //     //     default:
  //     //       // do nothing
  //     //       break;
  //     //   }

  //     //   if (success) {
  //     //     setRecord(record.filter((item) => item.id !== id));
  //     //   }
  //     // }
  // };

  //Edit
  // const handleEdit = async (rowData) => {

  //     sessionStorage.setItem('edit', JSON.stringify(rowData));
  //     console.log(rowData)
  //     switch (uniqueId) {

  //       case "usersAccountsId":
  //         navigate("/user-accounts/" + rowData?.UserID + "/" + rowData?.Fullname)

  //       default:
  //         // do nothing
  //         break;
  //     }
  // };

  // const CustomCell = (params) => {
  //     const style = {
  //         whiteSpace: 'nowrap',
  //         overflow: 'hidden',
  //         textOverflow: 'auto',
  //         minWidth: 0, // add this property
  //         maxWidth: '100%', // add this property
  //     };
  //     return (
  //         <div style={{ ...style, overflowX: 'auto' }}>
  //             {params.value}
  //         </div>
  //     );
  // };
  // const columnsWithCustomCell = columnsName.map((column) => {
  //     if (column.width) {
  //         return {
  //             ...column,
  //             renderCell: CustomCell,
  //         };
  //     }
  //     return column;
  // });
  // const columnsWithCustomCell = columnsName.map((column) => {
  //     if (column.renderCell) {
  //         const originalRenderCell = column.renderCell;
  //         return {
  //             ...column,
  //             renderCell: (params) => (
  //                 <>
  //                     {CustomCell(params)} {/* Render custom cell component */}
  //                     {originalRenderCell(params)}
  //                 </>
  //             ),
  //         };
  //     }
  //     return column;
  // });

  const idColumn = [
    {
      field: "no",
      headerName: "ID",
      width: 30,
    },
  ];

  const handleRemoveRole = async (rowdata) => {
    console.log(rowdata.RoleID);

    // userRequest.delete("/deleteUserRoleAssignedData/" + rowdata?.RoleId,
    // ).then((response) => {
    //     console.log(response);
    //     setMessage("Role removed successfully");

    //     // refresh the data table after adding the role
    //     detectAddRole();
    // }).catch((error) => {

    //     setError(error?.response?.data?.message ?? "Something went wrong!")
    // }
    // )
  };

  // let handleUpdate = async (rowdata) => {
  //     console.log(rowdata);
  // }

  // let handleDigitalUrlInfo = async (rowdata) => {
  //     navigate("/digitalurl")
  // }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: uniqueId === "usersAccountsId" ? 200 : 150,

      renderCell: (params) => (
        <ActionDropdown row={params.row} dropDownOptions={dropDownOptions} />
      ),
    },
  ];

  // const actionColumn = [
  //     {
  //         field: "action",
  //         headerName: "Action",
  //         width: uniqueId === "usersAccountsId" ? 200 : 150,

  //         renderCell: (params) => {
  //             return (
  //                 <div className="cellAction">
  //                     <div
  //                         className="deleteButton"
  //                         onClick={() => handleDelete(params.row.id, params.row)}
  //                     >
  //                         Delete
  //                     </div>
  //                     <span
  //                         onClick={() => handleEdit(params.row)}
  //                         style={{ textDecoration: "none" }}
  //                     >
  //                         <div className="viewButton">
  //                             {uniqueId === "usersAccountsId" ? "Update Roles" : "Update"}
  //                         </div>
  //                     </span>
  //                 </div>
  //             );
  //         },
  //     },
  // ];

  //   const handleExport = (returnBlob = false) => {
  //     // get only the data from the record array which matsch columnsName field
  //     const data = muiFilteredData.map((item) => {
  //       const row = {};
  //       columnsName.forEach((column) => {
  //         row[column.field] = item[column.field];
  //       });

  //       return row;
  //     });
  //     // Create a new array that excludes the 'id' field
  //     const dataWithoutId = data.map(({ id, ...rest }) => rest);
  //     const wb = XLSX.utils.book_new();
  //     const ws = XLSX.utils.json_to_sheet(dataWithoutId); // Pass the new array to the 'json_to_sheet' method
  //     XLSX.utils.book_append_sheet(wb, ws, title);
  //     if (returnBlob) {
  //       const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //       const blob = new Blob([wbout], { type: 'application/octet-stream' });
  //       return blob;
  //     } else {
  //       XLSX.writeFile(wb, `${title}.xlsx`); // Export the file
  //     }

  //   };

  //   const handlePdfExport = (returnBlob = false) => {
  //     const doc = new jsPDF("landscape");

  //     // Calculate the font size based on the number of columns
  //     const maxColumns = 10; // Maximum number of columns before font size starts to decrease
  //     const minFontSize = 4; // Minimum font size
  //     const maxFontSize = 8; // Maximum font size
  //     const fontSize = columnsName.length <= maxColumns ? maxFontSize : Math.max(minFontSize, maxFontSize - (columnsName.length - maxColumns));

  //     const tableData = muiFilteredData.map((item) => {
  //       const row = {};
  //       columnsName.forEach((column) => {
  //         row[column.field] = item[column.field];
  //       });
  //       return Object.values(row);
  //     });

  //     const headers = columnsName.map((column) => column.headerName);

  //     // Use autoTable to generate the table in the PDF
  //     doc.autoTable({
  //       head: [headers],
  //       body: tableData,
  //       theme: "grid",
  //       styles: { fontSize: fontSize },
  //       headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
  //       startY: 20,
  //       tableWidth: "auto", // Automatically adjust table width based on content
  //     });

  //     if (returnBlob) {
  //       const blob = doc.output("blob");
  //       return blob;
  //     } else {
  //       doc.save(`${title}.pdf`);
  //     }
  //   };

  let smallHeightTableScreens = [
    "journalMovementClId",
    "journalMovementClDetId",
  ];
  let mediumHeightTableScreens = ["userRolesAssignedId", "userAccountRoleId"];

  // function computeMutation(newRow, oldRow) {
  //     for (let key in newRow) {
  //         if (newRow[key] !== oldRow[key]) {
  //             return true;
  //         }
  //     }
  //     return false;
  // }

  // const processRowUpdate = (newRow, oldRow) => {

  //     return new Promise((resolve, reject) => {
  //         const ifUpdates = computeMutation(newRow, oldRow); // check if there is any change in the row
  //         if (!ifUpdates) {
  //             resolve(oldRow);

  //             console.log("no updates");
  //             return;
  //         }
  //         newRequest.put("/updateProductLocationOriginData", newRow)
  //             .then((res) => {
  //                 console.log(res);
  //                 resolve(newRow);
  //                 console.log("updated");
  //             })
  //             .catch((err) => {
  //                 console.log(err);
  //                 resolve(oldRow);
  //                 console.log("not updated");
  //             });
  //     });
  // }

  const [showPopup, setShowPopup] = useState(false);
  const [sendInvitationPopup, setSendInvitationPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  const handleSendInvitation = () => {
    handleSendInvitationPopup();
  };





  return (
    <>
      {/* {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
            {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />} */}

      <div
        className="datatable"
        style={
          smallHeightTableScreens.includes(uniqueId)
            ? { height: "450px" }
            : mediumHeightTableScreens.includes(uniqueId)
              ? { height: "600px" }
              : { height: "500px" }
        }
      >
        <div className="datatableTitle">
          <div className="left-div">
            <span>{title}</span>

            {ShipmentIdSearchEnable && ShipmentIdSearchEnable === true ? (
              <span>
                <input
                  type="text"
                  placeholder="SEARCH BY SHIPMENT ID"
                  name="SHIPMENTID"
                  className="searchInput"
                  onChange={handleSearch}
                />
              </span>
            ) : null}

            {ContainerIdSearchEnable && ContainerIdSearchEnable === true ? (
              <span>
                <input
                  type="text"
                  name="CONTAINERID"
                  placeholder="SEARCH BY CONTAINER ID"
                  className="searchInput"
                  onChange={handleSearch}
                />
              </span>
            ) : null}
          </div>

          <span className="leftDatatableTitle">
            {buttonVisibility !== false && (
              <span
                className="leftDatatableTitle"
                onClick={
                  uniqueId === "SERIALNUM"
                    ? // cleart sessionStorage for receiptsData
                    () => {
                      sessionStorage.removeItem("receiptsData");
                    }
                    : null
                }
              >
                {NewUser && <button onClick={togglePopup} className="link">New User</button>}
                {Permission && <button onClick={handleEdit}>Permission</button>}
                {sendInvitation && <button onClick={handleSendInvitation}>Send Invitation</button>}
                {AddDocBtn && <button onClick={handleAddDoc}>Add Document</button>}
                {handleUsers && <button onClick={handleAddUser}>Add Users</button>}
                {/* <button onClick={() => handlePdfExport(false)}
                            >Export to Pdf</button> */}
              </span>
            )}
            {AssignPickListBtn && <button onClick={handleUserListPopUp} >Assign Picklist</button>}

            {/* {backButton && <button onClick={() => { navigate(-1) }}>Go Back</button>} */}
          </span>

          {/* {dropDown && (
        
        )} */}
        </div>

        {/* {showPopup && (
          <NewUserPopup
            onUserAdded={refreshData}

            showPopup={showPopup}
            togglePopup={togglePopup}
          />
        )} */}

        <MuiCustomTable
          secondaryColor={secondaryColor ? secondaryColor : null}
          loading={loading}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          editMode="none" // set to row if need to edit row
          processRowUpdate={processRowUpdate ? processRowUpdate : null}
          onProcessRowUpdateError={(params, error) => {
            console.log(error);
          }}
          slots={{ toolbar: GridToolbar }}
          rows={filteredData}
          columns={
            uniqueId === "customerListId"
              ? [...idColumn.slice(0, 1), ...actionColumn, ...idColumn.slice(1), ...columnsName]
              : (actionColumnVisibility !== false
                ? idColumn.concat(columnsName.concat(actionColumn))
                : idColumn.concat(columnsName))
          }


          pageSize={30}
          rowsPerPageOptions={[30, 50, 100]}
          checkboxSelection={checkboxSelectionValue}
          filterModel={filterModel}
          onFilterModelChange={handleFilterModelChange}

          getRowId={(row) => row.no}

          // rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            // setRowSelectionModel(newRowSelectionModel); // Set the state with selected row ids
            console.log(newRowSelectionModel); // Logs the ids of selected rows
            const selectedRows = filteredData.filter((row) => newRowSelectionModel.includes(row.no));
            console.log(selectedRows)
            setSelectedRow(selectedRows.map((item, index) => ({ data: item, index }))); // Set the state with selected row data objects
            // setTableSelectedRows(selectedRows)
            handleRowClick(selectedRows);

          }}
        />
      </div>
    </>
  );
};

export default DataTable;


