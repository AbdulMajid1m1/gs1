import React, { useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import AdminDashboardRightHeader from "../../../../components/AdminDashboardRightHeader/AdminDashboardRightHeader";
import DataTable from "../../../../components/Datatable/Datatable";
import { AllProductsColumn } from "../../../../utils/datatablesource";
import EditIcon from "@mui/icons-material/Edit";
import newRequest from "../../../../utils/userRequest";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  debounce,
} from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';

const AllProducts = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [selectedCr, setSelectedCr] = useState(null);
  const [isAutocompleteFilled, setIsAutocompleteFilled] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [crList, setCrList] = useState([]);
  const abortControllerRef = React.useRef(null);
  const [allSearchMemberDetails, setAllSearchMemberDetails] = useState("");

  const handleGPCAutoCompleteChange = (event, value) => {
    setSelectedCr(value);

    // Update the state variable when Autocomplete field is filled
    setIsAutocompleteFilled(value !== null && value !== "");

    if (value) {
      fetchData(value);
    }
  };

  const [details, setDetails] = useState([]);
  const debouncedHandleAutoCompleteInputChange = debounce(
    async (event, newInputValue, reason) => {
      // console.log(reason);
      setIsSubmitClicked(false);
      if (reason === "reset" || reason === "clear") {
        setCrList([]); // Clear the data list if there is no input
        // setSelectedCr(null);
        return; // Do not perform search if the input is cleared or an option is selected
      }
      if (reason === "option") {
        return; // Do not perform search if the option is selected
      }

      if (!newInputValue || newInputValue.trim() === "") {
        // perform operation when input is cleared
        setCrList([]);
        // setSelectedCr(null);
        return;
      }

      // console.log(newInputValue);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Abort previous request
      }
      abortControllerRef.current = new AbortController(); // Create a new controller for the new request

      try {
        setAutocompleteLoading(true);
        setOpen(true);

        const res = await newRequest.get(
          `/users/search?keyword=${newInputValue}`,
          {
            signal: abortControllerRef.current.signal,
          }
        );
        // console.log(res);

        const crs = res?.data?.map((item) => {
          return {
            user_id: item.id,
            gcpGLNID: item.gcpGLNID,
            gln: item.gln,
            memberID: item.memberID,
            companyID: item.companyID,
            company_name_eng: item.company_name_eng,
            email: item.email,
            mobile: item.mobile,
          };
        });

        setCrList(crs);
        setDetails(res?.data[0]);

        setOpen(true);
        setAutocompleteLoading(false);


      } catch (error) {
        console.error(error);
        setCrList([]); // Clear the data list if an error occurs
        setOpen(false);
        setAutocompleteLoading(false);
      }
    },
    400
  );

  const fetchData = async (value) => {
    setIsLoading(true);
    console.log(value);
    //   setAllSearchMemberDetails(value);
    try {
      const response = await newRequest.get(
        `/products?user_id=${value?.user_id}`
      );
      console.log(response);
      setData(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      // console.log(err);
      setIsLoading(false);
    }
  };



  const handleExportProductsTemplate = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }
    // Assuming these are the specific columns you want to export
    const selectedColumns = [
      "gcpGLNID",
      "gcp_type",
      "company_name_eng",
      "gln",
      "status",
      "additional_number",
    ];

    // Create a worksheet with headers and selected data
    const filteredData = data.map((row) => {
      const filteredRow = {};
      selectedColumns.forEach((column) => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    // Create a worksheet with headers and data
    const worksheet = XLSX.utils.json_to_sheet([{}].concat(filteredData), {
      header: selectedColumns,
    });

    // Set column widths in the !cols property
    const columnWidths = selectedColumns.map((column, index) => ({
      width: index === 0 ? 15 : 15, // Set the width to 25 for the first column, and 15 for the rest
    }));
    worksheet["!cols"] = columnWidths;

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kpi Report");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save Excel file
    saveAs(dataBlob, "licenceRegistry.xlsx");
  };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      return;
    }
  };

  // const handleEdit = (row) => {
  //   navigate("/admin/UpdateProducts/");
  // };

  const handleRegenerate = async (row) => {
    try {
      const response = await newRequest.post("/products/checkGtinDataAndSendToGepir", {
        "ids": [row.id]
      });
      console.log(response?.data);
      toast.success(response?.data?.message || "Licence Uploaded Successfully");

      fetchData(selectedCr);

    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
      setIsLoading(false)
    }
  };


  return (
    <div>
      <div
        className={`p-0 h-full ${i18n.language === "ar" ? "sm:mr-72" : "sm:ml-72"
          }`}
      >
        <div>
          <AdminDashboardRightHeader title={"All Products"} />
        </div>

        <div className="flex justify-center items-center">
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">
              <div className="px-3">
                <Autocomplete
                  id="companyName"
                  required
                  options={crList}
                  getOptionLabel={(option) =>
                    option && option.user_id
                      ? `${option?.gcpGLNID} - ${option?.company_name_eng} - ${option?.memberID} - ${option?.email} - ${option?.mobile} `
                      : ""
                  }
                  onChange={handleGPCAutoCompleteChange}
                  value={selectedCr?.cr}
                  onInputChange={(event, newInputValue, params) =>
                    debouncedHandleAutoCompleteInputChange(
                      event,
                      newInputValue,
                      params
                    )
                  }
                  loading={autocompleteLoading}
                  sx={{ marginTop: "10px" }}
                  open={open}
                  onOpen={() => {
                    // setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  renderOption={(props, option) => (
                    <li key={option.user_id} {...props}>
                      {option
                        ? `${option.gcpGLNID} - ${option.company_name_eng} - ${option.memberID} - ${option.email} - ${option.mobile}`
                        : "No options"}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      // required
                      error={isSubmitClicked && !selectedCr?.cr}
                      helperText={
                        isSubmitClicked && !selectedCr?.cr
                          ? "Products is required"
                          : ""
                      }
                      {...params}
                      label={`${t("Search Members")}`}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {autocompleteLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      sx={{
                        "& label.Mui-focused": {
                          color: "#00006A",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#00006A",
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#000000",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#000000",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              {/* DataGrid */}
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title={"All Products"}
                  columnsName={AllProductsColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  checkboxSelection={"disabled"}
                  globalSearch={false}
                  actionColumnVisibility={true}
                  handleRowClickInParent={handleRowClickInParent}
                  dropDownOptions={[
                    {
                      label: "Posted GEPIR",
                      icon: (
                        <IosShareIcon
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
  );
};

export default AllProducts;
