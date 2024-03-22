import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { DataMatrixGenerator } from "../../../utils/Barcodes/Barcodes";
import Header from "../../../components/Header/Header";
import DropDownSelection from "../DropDownSelection/DropDownSelection";
import Footer from "../../../components/Footer/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import newRequest from "../../../utils/userRequest";
import Swal from "sweetalert2";
import { GtinDataMatrixGenerator } from "../../../utils/Barcodes/GtinReportsDataMatrix";

const GEPIR = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("home");
  const [userSearch, setUserSearch] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUserSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await newRequest.get(
        `/foreignGtin/getGtinProductDetailsFromLocalDb?barcode=${userSearch}`
      );
      console.log(response?.data);
      setData(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Swal.fire({
          title: `${t("Product Not Found")}`,
          text: `${t("Do you want to query in Global Database (GEPIR)?")}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: `${t("Yes Search")}`,
          cancelButtonText: `${t("Close")}`,
          // changes the color of the confirm button to red
          confirmButtonColor: "#021F69",
          cancelButtonColor: "#FF693A",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const globalResponse = await newRequest.get(
                `/foreignGtin/getGtinProductDetailsFromGlobalDb?barcode=${userSearch}`
              );
              console.log(globalResponse?.data);
              setData(globalResponse?.data);
            } catch (globalError) {
              console.log(globalError);
              toast.error(
                globalError?.response?.data?.error ||
                  globalError?.response?.data?.message ||
                  `${t("Something went wrong!")}`
              );
              setData(null);
            }
          }
        });
      } else {
        toast.error(
          error?.response?.data?.error || `${t("Something went wrong!")}`
        );
        setData(null);
      }
      setIsLoading(false);
    }
  };

  const products = [
    { name: `${t('GTIN')}`, value: data?.gtin || data?.globalGepirArr?.gtin },
    { name: `${t('Brand Name')}`, value: data?.brandName || data?.globalGepirArr?.brandName },
    { name: `${t('Product Description')}`, value: data?.productDescription || data?.globalGepirArr?.productDescription },
    { name: `${t('Product Image Url')}`, value: data?.productImageUrl ? <a style={{color: '#a8e0f4'}} href={data?.productImageUrl} target="_blank">{data?.productImageUrl}</a> : <a style={{color: '#a8e0f4'}} href={data?.globalGepirArr?.productImageUrl} target="_blank">{data?.globalGepirArr?.productImageUrl}</a> },
    { name: `${t('Gcp GLNID')}`, value: data?.gcpGLNID || data?.globalGepirArr?.gcpGLNID },
    { name: 'Net Content', value: data?.unitValue || `${data?.globalGepirArr?.unitValue} ${data?.globalGepirArr?.unitCode}` },
    { name: `${t('Country of sale')}`, value: data?.countryOfSaleName || data?.globalGepirArr?.countryOfSaleName },
  ]


  const companyInformation = [
    { name: `${t('Company Name')}`, value: data?.companyName || data?.globalGepirArr?.companyName },
    // { name: "Website", value: <p style={{color: 'gray'}}>Unknown</p> }, 
    { name: "Licence Key", value: data?.licenceKey || data?.globalGepirArr?.licenceKey },
    { name: "Licence Type", value: data?.licenceType || data?.globalGepirArr?.licenceType },
    // { name: 'Global Location Number (GLN)', value: data?.gcpGLNID || data?.globalGepirArr?.gcpGLNID },
    { name: 'Licensing GS1 Member Organisation', value: data?.moName || data?.globalGepirArr?.moName },
  ]


  return (
    <div>
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div>
        <DropDownSelection />
      </div>

      <div className="mt-10 mb-20 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96">
        <div className="">
          <div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="barcode"
                className="text-secondary sm:text-2xl text-lg font-body"
              >
                Enter a barcode number/GTIN
              </label>
              <div className="flex sm:w-[60%] w-full">
                <input
                  id="barcode"
                  type="text"
                  className="sm:w-[50%] w-full border h-10 rounded-sm px-5 font-medium text-black border-gray-200"
                  placeholder="Search"
                  value={userSearch}
                  onChange={(event) => setUserSearch(event.target.value)}
                />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#cd3c0d", color: "#ffffff" }}
                  // type='submit'
                  onClick={handleUserSearch}
                  disabled={isLoading}
                  className="ml-2"
                  endIcon={
                    isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : null
                  }
                >
                  Search
                </Button>
              </div>
              <p className="text-secondary text-base">
                Example search: 628000000000
              </p>
            </div>
          </div>

          {data && (
            <div>
              <div className="flex justify-end sm:px-40 px-10 py-10">
                <div style={{ height: "120px" }}>
                  <GtinDataMatrixGenerator
                    text={`${data?.gtin || data?.globalGepirArr?.gtin} - ${data?.brandName || data?.globalGepirArr?.brandName}`}
                  />
                  <p className="text-sm text-secondary">{data?.gtin || data?.globalGepirArr?.gtin}</p>
                  <p className="text-sm text-secondary">{data?.brandName || data?.globalGepirArr?.brandName}</p>
                </div>
              </div>

              <div className="">
                <div
                  className={`w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5 ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                    <p className="font-semibold"> {t("Complete Data")}</p>
                    <p>
                      {t("This number is registered to company")}: :{" "}
                      <span className="font-semibold">{data?.companyName || data?.globalGepirArr?.companyName}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center text-2xl font-medium text-secondary mb-2">
                <p>{data?.productDescription || data?.globalGepirArr?.productDescription}</p>
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 p-5">
                <button
                  className={`p-4 rounded ${
                    activeTab === "home"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick("home")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {t("GTIN INFORMATION")}
                </button>

                <button
                  className={`p-4 rounded ${
                    activeTab === "profile2"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } shadow-md flex items-center justify-center`}
                  onClick={() => handleTabClick("profile2")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 14H7A3 3 0 0 1 4 11v-1a3 3 0 0 1 3-3h2M15 14h2a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-2" />
                    <path d="M12 19v1m0 0v-1m0 1a6 6 0 0 0 6-6v-4a6 6 0 0 0-12 0v4a6 6 0 0 0 6 6z" />
                  </svg>
                  {/* {t('EVENTS')} */}
                  {t("Company Information")}
                </button>
              </div>

              {/*First Tab Gtin Information only change this tab*/}
              <div>
                {activeTab === "home" && (
                  <div className="block">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 flex justify-center items-center p-4">
                        <img
                          src={data?.productImageUrl || data?.globalGepirArr?.productImageUrl}
                          alt="Product"
                          className="w-1/2 object-contain"
                        />
                      </div>

                      <div className="w-full md:w-2/3">
                        <div className="container mx-auto mt-6 p-4">
                          <div className="overflow-x-auto">
                            <table className="table-auto min-w-max w-full">
                              <tbody>
                                {products.map((product, index) => (
                                  <tr key={index}>
                                    <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">
                                      {product.name}
                                    </td>
                                    <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">
                                      {product.value}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Third Tab Events Map */}
                {activeTab === "profile2" && (
                  <div className="shadow-lg border-[0.7px] mt-6 border-primary mb-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full">
                        <div className="container mx-auto mt-6 p-4">
                          <div className="overflow-x-auto">
                            <table className="table-auto min-w-max w-full">
                              <tbody>
                                {companyInformation.map((product, index) => (
                                  // {productInformation.map((product, index) => (
                                  <tr key={index}>
                                    <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">
                                      {product.name}
                                    </td>
                                    <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">
                                      {product.value}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GEPIR;
