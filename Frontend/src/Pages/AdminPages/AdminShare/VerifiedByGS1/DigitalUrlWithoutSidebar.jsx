import React, { useContext, useEffect, useState } from "react";
// import SideBar from "../../Components/SideBar/SideBar";
import "./DigitalUrlWithoutSidebar.css";
import DataTable from "../../../../components/Datatable/Datatable";
import {
  SafetyInformationColumn,
  RecipeColumn,
  ProductContentColumn,
  PromotionalOffersColumns,
  ProductLocationofOriginColumn,
  ProductRecallColumn,
  PackagingCompositionColumn,
  ElectronicLeafletsColumn,
} from "../../../../utils/datatablesource";
import safetyInformationIcon from "../../../../Images/safetyInformation.jpeg";
import promotionalOffersIcon from "../../../../Images/promotionalOffers.jpeg";
import productContentIcon from "../../../../Images/productContent.jpeg";
import productLocationofOriginIcon from "../../../../Images/productLocationOrigin.jpeg";
import productRecallIcon from "../../../../Images/ProductRecall.jpeg";
import recipeIcon from "../../../../Images/Recipe.jpeg";
import packagingCompositionIcon from "../../../../Images/packaging.jpeg";
import electronicLeafletsIcon from "../../../../Images/electronicLeafLets.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import { SnackbarContext } from "../../../../Contexts/SnackbarContext";
import {
  UpdateRowData,
  UpdateRowDataWithDoc,
} from "../../../../utils/Funtions/rowUpdate";
import FormPopup from "../../../MemberPages/DigitalUrlInfo/FormPopup";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DigitalUrlWithoutSidebar = ({ gtinData }) => {
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
  const { t, i18n } = useTranslation();


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { openSnackbar } = useContext(SnackbarContext);
  useEffect(() => {
    // Product Type Drop Down Api
    axios
      .get("http://gs1ksa.org:7000/api/getAllProductTypes")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        // console.log(err);
      });

    // // Safety Information Api
    axios
      .get(`http://gs1ksa.org:7000/api/getSafetyInformationByGtin/${gtinData?.gtin}`)
      .then((response) => {
        // console.log(response.data);
        setSafetyInformation(response.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const [selectedOption, setSelectedOption] = useState("Safety Information");

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    switch (option) {
      case "Safety Information":
        axios
          .get(`http://gs1ksa.org:7000/api/getSafetyInformationByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            setSafetyInformation(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(
            //   err?.response?.data?.message ?? "something went wrong!",
            //   "error"
            // );
            toast.error(err?.response?.data?.message ?? "something went wrong!");
            setSafetyInformation([]);
          });
        break;

      case "Promotional Offers":
        axios
          .get(`http://gs1ksa.org:7000/api/getPromotionalOffersByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            setPromotionalOffers(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");
            setPromotionalOffers([]);
          });
        break;

      case "Product Contents":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductContentByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            // console.log("called");
            setProductContent(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");
            setProductContent([]);
          });
        break;

      case "ProductLocationofOrigin":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductLocationOriginByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            setProductLocationofOrigin(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");
            setProductLocationofOrigin([]);
          });
        break;

      case "ProductRecall":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductsRecallByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            setProductRecall(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");
            setProductRecall([]);
          });
        break;

      case "recipe":
        axios
          .get(`http://gs1ksa.org:7000/api/getRecipeDataByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            setRecipe(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");
            setRecipe([]);
          });
        break;

      case "PackagingComposition":
        axios
          .get(
            `http://gs1ksa.org:7000/api/getAlltblPkgCompositionDataByGtin/${gtinData?.gtin}`
          )
          .then((response) => {
            // console.log(response.data);
            setPackagingComposition(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");

            setPackagingComposition([]);
          });
        break;

      case "ElectronicLeaflets":
        axios
          .get(`http://gs1ksa.org:7000/api/getProductLeafLetsDataByGtin/${gtinData?.gtin}`)
          .then((response) => {
            // console.log(response.data);
            setElectronicLeaflets(response.data);
          })
          .catch((err) => {
            // console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message || "error");
            setElectronicLeaflets([]);
          });
        break;

      // Add more cases for other options
      default:
        break;
    }
  };

  const deleteData = (ID, endpoint) => {
    // console.log(ID, selectedOption);
    axios
      .delete(`http://gs1ksa.org:7000/api/${endpoint}/${ID}`)
      .then((response) => {
        // console.log(response.data);
        // openSnackbar(response?.data?.message, "success");
        toast.success(response?.data?.message || "success");
        handleOptionChange(selectedOption);
      })
      .catch((err) => {
        // console.log(err);
        // openSnackbar(err?.response?.data?.message, "error");
        toast.error(err?.response?.data?.message || "error");
      });
  };

  const handleDelete = (row) => {
    // console.log(row);

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
        // console.log("No option selected");
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
        // console.log("No option selected");
        return; // Return undefined to indicate no updates were performed
    }
  };

  const renderDataGrid = () => {
    switch (selectedOption) {
      case "Safety Information":
        return (
          <DataTable
            data={safetyInformation}
            title={`${t('Safety Information')}`}
            secondaryColor="secondary"
            columnsName={SafetyInformationColumn(t)}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
            title={`${t('Promotional Offers')}`}
            columnsName={PromotionalOffersColumns(t)}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
            title={`${t('Product Contents')}`}
            columnsName={ProductContentColumn(t)}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
            secondaryColor="secondary"
            title={`${t('Product Location of Origin')}`}
            columnsName={ProductLocationofOriginColumn(t)}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
            title={`${t('Product Recall')}`}
            columnsName={ProductRecallColumn(t)}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
            title={`${t('Recipe')}`}
            columnsName={RecipeColumn(t)}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
            secondaryColor="secondary"
            title={`${t('Packaging Composition')}`}
            columnsName={PackagingCompositionColumn(t)}
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
             title={`${t('Electronic Leaflets')}`}
            columnsName={ElectronicLeafletsColumn(t)}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: `${t('Delete')}`,
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
        {/* <div className="h-28 w-full shadow-xl"> */}
        <div className="2xl:h-28 xl:h-28 lg:h-28 h-auto w-full shadow-xl font-sans rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
           <div className="h-auto xl:h-10 lg:h-10 w-full">
            <div className="grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-6 gap-2 sm:gap-5 px-2 sm:px-10 py-2">
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-semibold font-body text-secondary">
                  {t('Product Name')}
                </p>
                <p className="sm:text-xs text-sm font-body text-gray-600">
                  {gtinData?.productName}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  {t('QR Code')}
                </p>
                <p className="sm:text-xs text-sm font-sans text-secondary">
                  {/* {memberData?.qr_code} */}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
              <p className="sm:text-xs text-sm font-body font-semibold text-secondary">
                  {t('Brand Name')}
                </p>
                <p className="sm:text-xs text-sm font-body text-gray-600">
                  {gtinData?.brandName}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-body font-semibold text-secondary">
                  {t('Barcode')}
                </p>
                <p className="sm:text-xs text-sm font-body text-white bg-green-700 rounded-full px-3">
                  {gtinData?.gtin}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-body font-semibold text-secondary">
                  {t('Company')}
                </p>
                <p className="sm:text-xs text-sm font-body text-gray-600">
                  {gtinData?.companyName}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-body font-semibold text-secondary">
                  {t('Certificate')}
                </p>
                <p className="sm:text-xs text-sm font-body text-gray-600">
                  {t('Certificate')}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  {t('Status')}
                </p>
                <p className="sm:text-xs text-sm font-sans font-semibold text-white bg-green-500 rounded-full px-3">
                  {gtinData?.status}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="sm:text-xs text-sm font-sans font-semibold text-secondary">
                  Action
                </p>
                <p
                  className="sm:text-xs text-center cursor-pointer text-sm font-semibold font-sans text-white bg-secondary rounded-md px-3 py-2"
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
          barcode={gtinData?.gtin}
        />

        <div className="2xl:mt-0 xl:mt-0 lg:mt-0">
          <div className="h-10 w-full bg-primary rounded-md shadow-xl mt-6 flex justify-start items-center px-5">
            <p className="sm:w-auto w-full sm:text-lg text-sm font-body text-white">
              {t('Digital Link Information')}
            </p>
          </div>

          <div className={`h-auto w-full flex justify-between flex-wrap ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                {t('Safety Information')}
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
                {t('Promotional Offers')}
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Product Contents" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Product Contents")}
              >
                <img src={productContentIcon} className="w-5 h-5 ml-1" alt="" />
                {t('Product Contents')}
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
                {t('Product Location of Origin')}
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ProductRecall" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("ProductRecall")}
              >
                <img src={productRecallIcon} className="h-5 w-5 ml-1" alt="" />
                {t('Product Recall')}
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "recipe" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("recipe")}
              >
                <img src={recipeIcon} className="h-5 w-5 ml-1" alt="" />
                {t('Recipe')}
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
                {t('Packaging Composition')}
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
                {t('Electronic Leaflets')}
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

export default DigitalUrlWithoutSidebar;
