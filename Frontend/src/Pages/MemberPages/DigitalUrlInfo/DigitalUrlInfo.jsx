import React, { useContext, useEffect, useState } from "react";
// import SideBar from "../../Components/SideBar/SideBar";
import "./DigitalUrlInfo.css";
// import userRequest from "../../../utils/userRequest";
import axios from "axios";
import FormPopup from "./FormPopup";
import {
  SafetyInformationColumn,
  RecipeColumn,
  ProductContentColumn,
  PromotionalOffersColumns,
  ProductLocationofOriginColumn,
  ProductRecallColumn,
  PackagingCompositionColumn,
  ElectronicLeafletsColumn,
} from "../../../utils/datatablesource";
import safetyInformationIcon from "../../../Images/safetyInformation.jpeg";
import promotionalOffersIcon from "../../../Images/promotionalOffers.jpeg";
import productContentIcon from "../../../Images/productContent.jpeg";
import productLocationofOriginIcon from "../../../Images/productLocationOrigin.jpeg";
import productRecallIcon from "../../../Images/ProductRecall.jpeg";
import recipeIcon from "../../../Images/Recipe.jpeg";
import packagingCompositionIcon from "../../../Images/packaging.jpeg";
import electronicLeafletsIcon from "../../../Images/electronicLeafLets.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
import {
  UpdateRowData,
  UpdateRowDataWithDoc,
} from "../../../utils/Funtions/rowUpdate";
// import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import DataTable from "../../../components/Datatable/Datatable";
import { toast } from "react-toastify";

const DigitalUrlInfo = () => {
  // const { currentUser } = useContext(CurrentUserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [safetyInformation, setSafetyInformation] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [productContent, setProductContent] = useState([]);
  const [promotionalOffers, setPromotionalOffers] = useState([]);
  const [productLocationofOrigin, setProductLocationofOrigin] = useState([]);
  const [productRecall, setProductRecall] = useState([]);
  const [packagingComposition, setPackagingComposition] = useState([]);
  const [electronicLeaflets, setElectronicLeaflets] = useState([]);

  const selectedGtinData = JSON.parse(
    sessionStorage.getItem("selectedGtinData")
  );
  console.log(selectedGtinData);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { openSnackbar } = useContext(SnackbarContext);
  useEffect(() => {
    // Product Type Drop Down Api
    axios.get("http://gs1ksa.org:7000/api/getAllProductTypes")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // // Safety Information Api
    axios
      .get(`http://gs1ksa.org:7000/api/getSafetyInformationByGtin/${selectedGtinData?.barcode}`)
      .then((response) => {
        console.log(response.data);
        setSafetyInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [selectedOption, setSelectedOption] = useState("Safety Information");

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    switch (option) {
      case "Safety Information":
        axios
          .get(`http://gs1ksa.org:7000/api/getSafetyInformationByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            setSafetyInformation(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(
            //   err?.response?.data?.message ?? "something went wrong!",
            //   "error"
            // );
            toast.error(err?.response?.data?.message ?? "No Data!");
            setSafetyInformation([]);
          });
        break;

      case "Promotional Offers":
        axios
          .get(`http://gs1ksa.org:7000/api/getPromotionalOffersByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            setPromotionalOffers(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");
            setPromotionalOffers([]);
          });
        break;

      case "Product Contents":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductContentByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            console.log("called");
            setProductContent(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");
            setProductContent([]);
          });
        break;

      case "ProductLocationofOrigin":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductLocationOriginByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            setProductLocationofOrigin(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");
            setProductLocationofOrigin([]);
          });
        break;

      case "ProductRecall":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductsRecallByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            setProductRecall(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");
            setProductRecall([]);
          });
        break;

      case "recipe":
        axios
          .get(`http://gs1ksa.org:7000/api/getRecipeDataByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            setRecipe(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");
            setRecipe([]);
          });
        break;

      case "PackagingComposition":
        axios
          .get(
            `http://gs1ksa.org:7000/api/getAlltblPkgCompositionDataByGtin/${selectedGtinData?.barcode}`
          )
          .then((response) => {
            console.log(response.data);
            setPackagingComposition(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");

            setPackagingComposition([]);
          });
        break;

      case "ElectronicLeaflets":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductLeafLetsDataByGtin/${selectedGtinData?.barcode}`)
          .then((response) => {
            console.log(response.data);
            setElectronicLeaflets(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ?? "No Data!");
            setElectronicLeaflets([]);
          });
        break;

      // Add more cases for other options
      default:
        break;
    }
  };

  const deleteData = (ID, endpoint) => {
    console.log(ID, selectedOption);
    axios
      .delete(`http://gs1ksa.org:7000/api/${endpoint}/${ID}`)
      .then((response) => {
        console.log(response.data);
        // openSnackbar(response?.data?.message, "success");
        toast.success(response?.data?.message ?? "Deleted Successfully!");
        handleOptionChange(selectedOption);
      })
      .catch((err) => {
        console.log(err);
        // openSnackbar(err?.response?.data?.message, "error");
        toast.error(err?.response?.data?.message ?? "something went wrong!");
      });
  };

  const handleDelete = (row) => {
    console.log(row);

    switch (selectedOption) {
      case "Safety Information":
        deleteData(row?.ID, "deleteProductSafetyInformationData");
        break;

      case "Promotional Offers":
        deleteData(row?.ID, "deletePromotionalOffersData");
        break;

      case "Product Contents":
        deleteData(row?.ID, "deleteProductContentsData");

        break;

      case "ProductLocationofOrigin":
        deleteData(row?.ID, "deleteProductLocationOriginData");

        break;

      case "ProductRecall":
        deleteData(row?.ID, "deleteProductRecallData");

        break;

      case "recipe":
        deleteData(row?.ID, "deleteRecipeData");

        break;

      case "PackagingComposition":
        deleteData(row?.ID, "deletePkgCompositionData");

        break;

      case "ElectronicLeaflets":
        deleteData(row?.ID, "deleteProductLeafletData");

        break;

      default:
        console.log("No option selected");
        break;
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    switch (selectedOption) {
      case "Safety Information":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updateProductSafetyInformation",
          "formData"
        );

      case "Promotional Offers":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updatePromotionalOffersData",
          "json"
        );

      case "Product Contents":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updateProductContentsData",
          "json"
        );

      case "ProductLocationofOrigin":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updateProductLocationOriginData",
          "json"
        );

      case "ProductRecall":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updateProductRecallData",
          "json"
        );

      case "recipe":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updateRecipeData",
          "formData"
        );

      case "PackagingComposition":
        return UpdateRowData(
          newRow,
          oldRow,
          openSnackbar,
          "/updatePkgCompositionData",
          "formData"
        );

      case "ElectronicLeaflets":
        return UpdateRowDataWithDoc(
          newRow,
          oldRow,
          openSnackbar,
          "/updateProductLeafletData",
          "formData"
        );

      default:
        console.log("No option selected");
        return; // Return undefined to indicate no updates were performed
    }
  };

  const renderDataGrid = () => {
    switch (selectedOption) {
      case "Safety Information":
        return (
          <DataTable
            data={safetyInformation}
            title={"Safety Information"}
            columnsName={SafetyInformationColumn}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            secondaryColor="secondary"
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "Promotional Offers":
        return (
          <DataTable
            data={promotionalOffers}
            title="Promotional Offers"
            columnsName={PromotionalOffersColumns}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "Product Contents":
        return (
          <DataTable
            data={productContent}
            title="Product Contents"
            columnsName={ProductContentColumn}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "ProductLocationofOrigin":
        return (
          <DataTable
            data={productLocationofOrigin}
            title="Product Location of Origin"
            columnsName={ProductLocationofOriginColumn}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "ProductRecall":
        return (
          <DataTable
            data={productRecall}
            title="Product Recall"
            columnsName={ProductRecallColumn}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            secondaryColor="secondary"
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "recipe":
        return (
          <DataTable
            data={recipe}
            title="Recipe"
            columnsName={RecipeColumn}
            checkboxSelection="disabled"
            secondaryColor="secondary"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "PackagingComposition":
        return (
          <DataTable
            data={packagingComposition}
            title="Packaging Composition"
            columnsName={PackagingCompositionColumn}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            secondaryColor="secondary"
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );

      case "ElectronicLeaflets":
        return (
          <DataTable
            data={electronicLeaflets}
            title="Electronic Leaflets"
            columnsName={ElectronicLeafletsColumn}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            secondaryColor="secondary"
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
        );
      // Add more cases for other options
      default:
        return null;
    }
  };

  return (
    <div>

      <div className="p-0 sm:p-1 h-full sm:ml-72">
        <div className="2xl:h-28 xl:h-28 lg:h-28 h-auto w-full shadow-xl font-sans rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
          {/* <div className="">
              <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
                  <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                    <p className="font-semibold">Complete Data</p>
                      <p>
                        This number is registered to company: :{" "}
                          <span className="font-semibold">Hasnain, Majid</span>
                      </p>
                    </div>
                  </div>
            </div> */}
            
          <div className="h-auto xl:h-10 lg:h-10 w-full">
            <div className="grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-6 gap-2 sm:gap-5 px-2 sm:px-10 py-2">
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Product Name
                </p>
                <p className="sm:text-xs text-sm font-sans font-semibold text-gray-600">
                  {selectedGtinData?.productnameenglish}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  QR Code
                </p>
                <p className="sm:text-xs text-sm font-sans text-secondary"></p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Brand Name
                </p>
                <p className="sm:text-xs text-sm font-sans text-gray-600">
                  {selectedGtinData?.BrandName}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Barcode
                </p>
                <p className="sm:text-xs text-sm font-sans font-semibold text-white bg-green-700 rounded-full px-3">
                  {selectedGtinData?.barcode}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Company
                </p>
                <p className="sm:text-xs text-sm font-sans text-gray-600">
                  {/* {currentUser?.user?.company_name_eng} */}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Certificate
                </p>
                <p className="sm:text-xs text-sm font-sans text-gray-600">
                  Certificate
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Status
                </p>
                <p className="sm:text-xs text-sm font-sans font-semibold text-white bg-green-500 rounded-full px-3">
                  {selectedGtinData?.status}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Action
                </p>
                <p
                  className="sm:text-xs text-center cursor-pointer text-sm font-sans text-white bg-blue-600 rounded-md px-3 py-[2px]"
                  onClick={togglePopup}
                >
                  Add Digital Link
                </p>
              </div>
            </div>
          </div>
        </div>

        <FormPopup
          data={data}
          showPopup={showPopup}
          togglePopup={togglePopup}
          barcode={selectedGtinData?.barcode}
        />

        <div className="2xl:mt-0 xl:mt-0 lg:mt-0">
          <div className="h-10 w-full bg-primary shadow-xl mt-6 flex justify-start items-center px-5">
            <p className="sm:w-auto w-full sm:text-lg text-sm font-sans text-white">
              Digital Link Information
            </p>
          </div>

          <div className="h-auto w-full flex justify-between flex-wrap">
            <div className="h-auto w-full sm:w-[25%] flex flex-col gap-4">
              {/* <span className='bg-yellow-100'>Safety Information</span>
            <span className='bg-yellow-100'>Promotional Offers</span> */}
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Safety Information" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Safety Information")}
              >
                <img
                  src={safetyInformationIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Safety Information
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Promotional Offers" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Promotional Offers")}
              >
                <img
                  src={promotionalOffersIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Promotional Offers
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Product Contents" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Product Contents")}
              >
                <img src={productContentIcon} className="w-5 h-5 ml-1" alt="" />
                Product Contents
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ProductLocationofOrigin"
                    ? "bg-yellow-500"
                    : ""
                  }`}
                onClick={() => handleOptionChange("ProductLocationofOrigin")}
              >
                <img
                  src={productLocationofOriginIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Product Location of Origin
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ProductRecall" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("ProductRecall")}
              >
                <img src={productRecallIcon} className="h-5 w-5 ml-1" alt="" />
                Product Recall
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "recipe" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("recipe")}
              >
                <img src={recipeIcon} className="h-5 w-5 ml-1" alt="" />
                Recipe
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "PackagingComposition"
                    ? "bg-yellow-500"
                    : ""
                  }`}
                onClick={() => handleOptionChange("PackagingComposition")}
              >
                <img
                  src={packagingCompositionIcon}
                  className="h-5 w-5 ml-1"
                  alt=""
                />
                Packaging Composition
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ElectronicLeaflets" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("ElectronicLeaflets")}
              >
                <img
                  src={electronicLeafletsIcon}
                  className="h-5 w-5 ml-1"
                  alt=""
                />
                Electronic Leaflets
              </span>
            </div>

            {/* All Datagird Display on the right side */}
            <div className="sm:w-[75%] w-full">{renderDataGrid()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalUrlInfo;
