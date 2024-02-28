import React, { useContext } from 'react'
import gtrackIcon from "../../../../Images/gtrackicons.png"
import { useState } from 'react';
import newRequest from '../../../../utils/userRequest';
import { SnackbarContext } from '../../../../Contexts/SnackbarContext';
import axios from 'axios';
import { gtrackUrl } from '../../../../utils/config';
import gtrackRequest from '../../../../utils/gtrackRequest';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const AdminDigitalLinkTab = ({ barcodeData }) => {
    const { t, i18n } = useTranslation();
    const [selectedOption, setSelectedOption] = useState("Safety-Information");
    const [safetyInformation, setSafetyInformation] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [productContent, setProductContent] = useState([]);
    const [promotionalOffers, setPromotionalOffers] = useState([]);
    const [productLocationofOrigin, setProductLocationofOrigin] = useState([]);
    const [productRecall, setProductRecall] = useState([]);
    const [packagingComposition, setPackagingComposition] = useState([]);
    const [electronicLeaflets, setElectronicLeaflets] = useState([]);
    const { openSnackbar } = useContext(SnackbarContext);

    
    // get that sesstion storage data
    // const getGtinData = sessionStorage.getItem("productData");
    // const gtinData = JSON.parse(getGtinData);
    // console.log(gtinData);

    // get the barcode sesstion data
    // const getBarcodeData = sessionStorage.getItem("barcode");
    // const barcodeData = JSON.parse(getBarcodeData);
    // console.log(barcodeData);

  //Digital Link Tab
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    
    switch (option) {
      case "Safety-Information":
        gtrackRequest
          .get(`/getSafetyInformationByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            setSafetyInformation(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(
            //   err?.response?.data?.message ??  `${t('Something went wrong!')}`,
            //   "error"
            // );
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setSafetyInformation([]);
          });
        break;

      case "Promotional-Offers":
        gtrackRequest
          .get(`/getPromotionalOffersByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            setPromotionalOffers(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setPromotionalOffers([]);
          });
        break;

      case "Product-Contents":
        gtrackRequest
          .get(`/getProductContentByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            console.log("called");
            setProductContent(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setProductContent([]);
          });
        break;

      case "Product-Location":
        gtrackRequest
          .get(`/getProductLocationOriginByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            setProductLocationofOrigin(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setProductLocationofOrigin([]);
          });
        break;

      case "ProductRecall":
        gtrackRequest
          .get(`/getProductsRecallByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            setProductRecall(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setProductRecall([]);
          });
        break;

      case "Recipe":
        gtrackRequest
          .get(`/getRecipeDataByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            setRecipe(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setRecipe([]);
          });
        break;

      case "Packaging-Composition":
        gtrackRequest
          .get(
            `/getAlltblPkgCompositionDataByGtin/${barcodeData}`
          )
          .then((response) => {
            console.log(response.data);
            setPackagingComposition(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);

            setPackagingComposition([]);
          });
        break;

      case "Electronic-Leaflets":
        gtrackRequest
          .get(`/getProductLeafLetsDataByGtin/${barcodeData}`)
          .then((response) => {
            console.log(response.data);
            setElectronicLeaflets(response.data);
          })
          .catch((err) => {
            console.log(err);
            // openSnackbar(err?.response?.data?.message, "error");
            toast.error(err?.response?.data?.message ??  `${t('Something went wrong!')}`);
            setElectronicLeaflets([]);
          });
        break;

      // Add more cases for other options
      default:
        break;
    }
  };


  const renderDataGrid = () => {
    switch (selectedOption) {
      case "Safety-Information":
        return (
          <div className='h-auto w-full mt-3'>

            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
                <div className='flex justify-between'>
                    <div className='w-[50%]'>
                        <p className='text-[#4AA9C4]'>    {t("Safety Information")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.SafetyDetailedInformation}</span>
                    </div>
                </div>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Link Type")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.LinkType}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Target URL")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.TargetURL}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Company Name")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.companyName}</span>
                      </div>
                  </div>
            </div>

          </div>
        );

      case "Promotional-Offers":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>    {t("Detailed Information")}</h1>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Promotional Offers")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.PromotionalOffers}</span>
                          {/* <span className='ml-1 text-[#CD8742]'>Promotional Offers</span> */}
                      </div>
                  </div>
               
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'> {t("Link Type")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        < span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.LinkType}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Target URL")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.TargetURL}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Price")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.price}</span>
                      </div>
                  </div>
            </div>

          </div>
        );

      case "Product-Contents":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>    {t("Detailed Information")}</h1>
                 <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Product Allergen Information")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ProductAllergenInformation}</span>
                      </div>
                  </div>
              
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Allergen Info")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.allergen_info}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Ingredients")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ingredients}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>    {t("Manufacturing Date")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ManufacturingDate}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'> {t("Best Before Date")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.bestBeforeDate}</span>
                      </div>
                  </div> 
                </div>
          </div>
        );

      case "Product-Location":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'> {t("Detailed Information")}</h1>
              
              <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'> {t("Product Location Origin")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ProductLocationOrigin}</span>
                      </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>    {t("Link Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.LinkType}</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'> {t("Ingredients")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.GTIN}</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'> {t("Manufacturing Date")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ExpiryDate}</span>
                  </div>
              </div>
          </div>
          </div>
        );

      case "Product-Recall":
        return (
          <div className="h-auto w-full mt-3">
            <div className="flex flex-col gap-2 p-2 border-2 border-dashed">
              {/* <h1 className='text-center font-semibold bg-yellow-100'>Product Recall RECORD</h1> */}
              <h1 className="font-normal bg-primary text-white px-2 py-1">
                {" "}
                {t("Detailed Information")}
              </h1>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Product Recall")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {productRecall?.[0]?.ProductRecall}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]">GTIN</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {productRecall?.[0]?.GTIN}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Link Type")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {productRecall?.[0]?.LinkType}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Expiry Date")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {productRecall?.[0]?.ExpiryDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Recipe":
        return (
          <div className="h-auto w-full mt-3">
            <div className="flex flex-col gap-2 p-2 border-2 border-dashed">
              <h1 className="font-normal bg-primary text-white px-2 py-1">
                {" "}
                {t("Detailed Information")}
              </h1>
              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Title")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {recipe?.[0]?.title}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Description")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {recipe?.[0]?.description}
                  </span>
                </div>
              </div>

              {/* <div>
                    <p className='text-base'>Ingredients: <span className='font-semibold ml-1'>{recipe?.[0]?.ingredients}</span></p>
                </div> */}
              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Ingredients")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {recipe?.[0]?.ingredients}
                  </span>
                </div>
              </div>

              {/* <div>
                    <p className='text-base'>Link Type: <span className='font-semibold ml-1'>{recipe?.[0]?.LinkType}</span></p>
                </div> */}
              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Link Type")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {recipe?.[0]?.LinkType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Packaging-Composition":
        return (
          <div className="h-auto w-full mt-3">
            <div className="flex flex-col gap-2 p-2 border-2 border-dashed">
              <h1 className="font-normal bg-primary text-white px-2 py-1">
                {t("Detailed Information")}
              </h1>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]">
                    {" "}
                    {t("Packaging Composition")}
                  </p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {packagingComposition?.[0]?.consumerProductVariant}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Link Type")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {packagingComposition?.[0]?.LinkType}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Recyclability")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {packagingComposition?.[0]?.recyclability}
                  </span>
                </div>
              </div>

              {/* <div>
                    <p className='text-base'>Material: <span className='font-semibold ml-1'>{packagingComposition?.[0]?.material}</span></p>
                </div> */}
              <div className="flex justify-between">
                <div className="w-[50%]">
                  <p className="text-[#4AA9C4]"> {t("Material")}</p>
                </div>
                <div className="flex w-[50%] overflow-x-auto gap-2">
                  <p>:</p>
                  <span className="ml-1 text-[#CD8742]">
                    {packagingComposition?.[0]?.material}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Electronic-Leaflets":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'> {t("Product Leaflet Information")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.ProductLeafletInformation}</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'> {t("Link Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.LinkType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'> {t("Language")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.Lang}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>GTIN</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.GTIN}</span>
                  </div>
                </div>
              </div>
          </div>
        );
      // Add more cases for other options
      default:
        return null;
    }
  };


  return (
    <div className= {`h-auto  gap-2 w-full mb-2 px-2 flex justify-between ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="w-[25%] flex flex-col gap-2 mt-3">
        <span
          className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                }`}
          onClick={() => handleOptionChange("Safety-Information")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Safety Information")}
        </span>

        <span
          className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Promotional-Offers" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Promotional-Offers")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Promotional Offers")}
        </span>

        <span
          className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Product-Contents" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Product-Contents")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Product Contents")}
        </span>

        <span
          className={`bg-[#E60023] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Product-Location" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Product-Location")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Product Location of Origin")}
        </span>

        <span
          className={`bg-[#0099FF] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Product-Recall" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Product-Recall")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Product Recall")}
        </span>

        <span
          className={`bg-[#db4a39] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Recipe" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Recipe")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Recipe")}
        </span>

        <span
          className={`bg-[#25d366] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Packaging-Composition" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Packaging-Composition")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Packaging Composition")}
        </span>

        <span
          className={`bg-[#CD201F] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Electronic-Leaflets" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Electronic-Leaflets")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Electronic Leaflets")}
        </span>
      </div>

      {/* All Datagird Display on the right side */}
      <div className="sm:w-[75%] w-full">{renderDataGrid()}</div>
    </div>
  );
}

export default AdminDigitalLinkTab