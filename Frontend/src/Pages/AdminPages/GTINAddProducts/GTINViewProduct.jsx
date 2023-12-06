import React, { useContext, useEffect, useState } from "react";
import "./GTINAddProducts.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import userRequest from "../../../utils/userRequest";
import axios, { all } from "axios";
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
// import phpRequest from "../../../utils/phpRequest";
import { useNavigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
// import SideBar from '../../Components/SideBar/SideBar';
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver';
import {
  BarcodeGenerator,
  DataMatrixGenerator,
} from "../../../utils/Barcodes/Barcodes";
import DownloadButton from "../../../utils/Buttons/DownloadBtn";
// import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

const GTINViewProduct = () => {
  const CompanyName = JSON.parse(sessionStorage.getItem("CompanyName"));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBackImage, setSelectedBackImage] = useState(null);
  const [unitCode, setUnitCode] = useState([]);
  const [region, setRegion] = useState([]);
  const [allCountryName, setAllCountryName] = useState([]);
  const [productDescriptionLanguage, setProductDescriptionLanguage] = useState(
    []
  );
  const [productType, setProductType] = useState([]);
  const [packageType, setPackageType] = useState([]);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  let { productId } = useParams();

  // const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const resetSnakeBarMessages = () => {
    setError(null);
    setMessage(null);
  };

  // set the all state values
  const [productNameEnglish, setProductNameEnglish] = useState("");
  const [productNameArabic, setProductNameArabic] = useState("");
  const [brandNameEnglish, setBrandNameEnglish] = useState("");
  const [brandNameArabic, setBrandNameArabic] = useState("");
  const [size, setSize] = useState("");
  const [gpc, setGpc] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [descriptionEnglish, setDescriptionEnglish] = useState("");
  const [descriptionArabic, setDescriptionArabic] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [selectedUnitCode, setSelectedUnitCode] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProductDescription, setSelectedProductDescription] =
    useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [selectedDigitalInformationType, setSelectedDigitalInformationType] =
    useState("");

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchProductDetails = async () => {
  //     try {
  //       const response = await phpRequest.post("/member/edit/GTIN", {
  //         "user_id": currentUser?.user?.id,
  //         "prodcut_id": productId
  //       });

  //       console.log(response.data);
  //       setAllData(response?.data?.GTINProduct);
  //       console.log(response?.data?.GTINProduct?.barcode);

  //       const productData = response.data?.GTINProduct;
  //       const imagePath = response.data?.image_path;

  //       // Set the state variables with the fetched data
  //       setProductNameEnglish(productData?.productnameenglish);
  //       setProductNameArabic(productData?.productnamearabic);
  //       setBrandNameEnglish(productData?.BrandName);
  //       setBrandNameArabic(productData?.BrandNameAr);
  //       setSize(productData?.size);
  //       setGpc(productData?.gpc);
  //       setHsCode(productData?.HSCODES);
  //       setDescriptionEnglish(productData?.details_page);
  //       setDescriptionArabic(productData?.details_page_ar);
  //       setProductUrl(productData?.product_url);
  //       setSelectedUnitCode(productData?.unit);
  //       setSelectedRegion(productData?.Origin);
  //       setSelectedCountry(productData?.countrySale);
  //       setSelectedProductDescription(productData?.details_page);
  //       setSelectedProductType(productData?.ProductType);
  //       setSelectedPackageType(productData?.PackagingType);
  //       setSelectedDigitalInformationType(productData?.HsDescription);
  //       const frontImg = imagePath + "/" + productData?.front_image;
  //       setSelectedImage(frontImg);
  //       const backImg = imagePath + "/" + productData?.back_image;
  //       setSelectedBackImage(backImg);
  //       console.log(imagePath + "/" + productData?.front_image);

  //       setIsLoading(false);

  //     } catch (error) {
  //       console.log(error);
  //       setIsLoading(true);
  //     }
  //   };
  //   fetchProductDetails();
  // }, [productId]);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

  const handleBackImageChange = (event) => {
    const backImageFile = event.target.files[0];
    const backImageUrl = URL.createObjectURL(backImageFile);
    setSelectedBackImage(backImageUrl);
  };

  useEffect(() => {
    userRequest
      .get("/getAllCountries")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const country = data.map((country) => country.name_en);
        setUnitCode(country);
        console.log(country);
      })
      .catch((error) => {
        console.log(error);
      });

    // All Countries Api
    userRequest
      .get("/getAllCountries")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const country = data.map((country) => country.name_en);
        setRegion(country);
        console.log(country);
      })
      .catch((error) => {
        console.log(error);
      });

    // All Countries of Sales Api
    userRequest
      .get("/getAlCountriesOfSales")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const countryName = data.map((country) => country.country_name);
        setAllCountryName(countryName);
        console.log(countryName);
      })
      .catch((error) => {
        console.log(error);
      });

    // Product Description Language Api
    userRequest
      .get("/getAllProdDescLanguages")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const productlanguage = data.map((country) => country.language_name);
        setProductDescriptionLanguage(productlanguage);
        console.log(productlanguage);
      })
      .catch((error) => {
        console.log(error);
      });

    // Product type Api
    userRequest
      .get("/getAllProductTypesFromGs1ProdDb")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const name = data.map((country) => country.name);
        setProductType(name);
        console.log(name);
      })
      .catch((error) => {
        console.log(error);
      });

    // Package type Api
    userRequest
      .get("/getAllProductPackagings")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const PackageName = data.map((country) => country.name);
        setPackageType(PackageName);
        console.log(PackageName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { openSnackbar } = useContext(SnackbarContext);

  const handleUnitCodeChange = (event, value) => {
    console.log(value);
    setSelectedUnitCode(value);
  };
  // console.log(selectedUnitCode);

  const handleSelectRegion = (event, value) => {
    console.log(value);
    setSelectedRegion(value);
  };

  const handleAllCounrtyName = (event, value) => {
    console.log(value);
    setSelectedCountry(value);
  };

  const handleProductDiscription = (event, value) => {
    console.log(value);
    setSelectedProductDescription(value);
  };

  const handleProductType = (event, value) => {
    console.log(value);
    setSelectedProductType(value);
  };

  const handlePackageType = (event, value) => {
    console.log(value);
    setSelectedPackageType(value);
  };

  const handleDigitalInformationType = (event, value) => {
    console.log(value);
    setSelectedDigitalInformationType(value);
  };
  const downloadImage = (id) => {
    const image = document.getElementById(id);
    const url = image
      .getAttribute("src")
      .replace("image/png", "image/octet-stream");
    const filename = "download.png";
    saveAs(url, filename);
  };



  return (
    <>
      {isLoading && (
        <div
          className="loading-spinner-background"
          style={{
            zIndex: 9999,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // position: "fixed",
          }}
        >
          <RiseLoader
            size={18}
            color={"#6439ff"}
            // height={4}
            loading={isLoading}
          />
        </div>
      )}

      {/* <SideBar /> */}

      <div className="p-3 h-full sm:ml-72">
        <div className="flex flex-col justify-center items-center bg-slate-100">
          {" "}
          {/* Added CSS classes */}
          <div className="h-auto w-full p-4">
            <div className="h-16 w-full bg-white shadow-xl flex justify-start items-center gap-3 px-5 border-l-2 border-[#e49515]">
              <i
                onClick={() => navigate("/gtin")}
                className="fas fa-arrow-left text-2xl text-[#e49515] cursor-pointer"
              ></i>
              <p className="sm:text-2xl text-sm font-body"> View Product</p>
            </div>
          </div>
          <div className="h-auto sm:w-[700px] w-full p-5 bg-white">
            <div className="popup-header">
              <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5">
                <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                  <p className="font-semibold">Complete Data</p>
                  <p>
                    This number is registered to company: :{" "}
                    {/* <span className="font-semibold">{currentUser?.user?.company_name_eng}</span> */}
                    <span className="font-semibold">Hasnain, Majid</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="fields1">Product Name [English]</label>
                <input
                  disabled={true}
                  type="text"
                  id="fields1"
                  onChange={(e) => setProductNameEnglish(e.target.value)}
                  value={productNameEnglish}
                  className="w-full"
                  placeholder="Product Name English"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="fields2">Product Name [Arabic]</label>
                <input
                  disabled={true}
                  type="text"
                  id="fields2"
                  className="w-full"
                  value={productNameArabic}
                  onChange={(e) => setProductNameArabic(e.target.value)}
                  placeholder="Product Name Arabic"
                />
              </div>
            </div>

            <div className="header-line"></div>

            <div className="popup-form">
              <form>
                <div>
                  {/* Recipe inputs */}
                  <div className="form-row">
                    <label htmlFor="field1">Brand Name [English] </label>
                    <input
                      disabled={true}
                      type="text"
                      id="field1"
                      onChange={(e) => setBrandNameEnglish(e.target.value)}
                      value={brandNameEnglish}
                      placeholder="Brand Name [English]"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field2">Brand Name [Arabic] </label>
                    <input
                      type="text"
                      id="field2"
                      onChange={(e) => setBrandNameArabic(e.target.value)}
                      value={brandNameArabic}
                      placeholder="Brand Name [Arabic]"
                      disabled={true}
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field3">Unit Code</label>
                    <div className="w-[70%]">
                      <Autocomplete
                        disabled={true}
                        id="zone"
                        options={unitCode}
                        getOptionLabel={(option) => option}
                        onChange={handleUnitCodeChange}
                        value={selectedUnitCode}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            placeholder="Enter/Unit"
                            required
                          />
                        )}
                        classes={{
                          endAdornment: "text-white",
                        }}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field4">Size</label>
                    <input
                      disabled={true}
                      type="text"
                      id="field4"
                      onChange={(e) => setSize(e.target.value)}
                      value={size}
                      placeholder="Size"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field5">Region</label>
                    <div className="w-[70%]">
                      <Autocomplete
                        // disable selecting and searching
                        disabled={true}
                        id="region"
                        options={region}
                        getOptionLabel={(option) => option}
                        // onChange={handleUnitCodeChange}
                        onChange={handleSelectRegion}
                        value={selectedRegion}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            placeholder="Enter/Region"
                            required
                          />
                        )}
                        classes={{
                          endAdornment: "text-white",
                        }}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field6">Country of Sale</label>
                    <div className="w-[70%]">
                      <Autocomplete
                        disabled={true}
                        id="countryName"
                        options={allCountryName}
                        getOptionLabel={(option) => option}
                        onChange={handleAllCounrtyName}
                        value={selectedCountry}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            placeholder="Enter/Country Name"
                            required
                          />
                        )}
                        classes={{
                          endAdornment: "text-white",
                        }}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field7">
                      Product Description Language{" "}
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
                        disabled={true}
                        id="productDescriptionLanguage"
                        options={productDescriptionLanguage}
                        getOptionLabel={(option) => option}
                        onChange={handleProductDiscription}
                        value={selectedProductDescription}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            placeholder="Enter/ Product Description Language"
                            required
                          />
                        )}
                        classes={{
                          endAdornment: "text-white",
                        }}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field8">Product Type</label>
                    <div className="w-[70%]">
                      <Autocomplete
                        disabled={true}
                        id="productType"
                        options={productType}
                        getOptionLabel={(option) => option}
                        onChange={handleProductType}
                        value={selectedProductType}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            placeholder="Enter/ Product Type"
                            required
                          />
                        )}
                        classes={{
                          endAdornment: "text-white",
                        }}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field9">Package Type</label>
                    <div className="w-[70%]">
                      <Autocomplete
                        disabled={true}
                        id="packageType"
                        options={packageType}
                        getOptionLabel={(option) => option}
                        onChange={handlePackageType}
                        value={selectedPackageType}
                        onInputChange={(event, value) => {
                          if (!value) {
                            // perform operation when input is cleared
                            console.log("Input cleared");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              className: "text-white",
                            }}
                            InputLabelProps={{
                              ...params.InputLabelProps,
                              style: { color: "white" },
                            }}
                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            placeholder="Enter/ Package Type"
                            required
                          />
                        )}
                        classes={{
                          endAdornment: "text-white",
                        }}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            color: "white",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field10">GPC</label>
                    <input
                      disabled={true}
                      type="text"
                      id="field10"
                      value={gpc}
                      onChange={(e) => setGpc(e.target.value)}
                      placeholder="GPC"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field11">HS-Code</label>
                    <input
                      disabled={true}
                      type="text"
                      id="field11"
                      onChange={(e) => setHsCode(e.target.value)}
                      value={hsCode}
                      placeholder="HS-Code"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field12">Description [English] </label>
                    <textarea
                      disabled={true}
                      type="text"
                      onChange={(e) => setDescriptionEnglish(e.target.value)}
                      value={descriptionEnglish}
                      id="field12"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field13">Description [Arabic] </label>
                    <textarea
                      disabled={true}
                      type="text"
                      onChange={(e) => setDescriptionArabic(e.target.value)}
                      value={descriptionArabic}
                      id="field13"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field12">Product URL</label>
                    <input
                      disabled={true}
                      type="text"
                      id="field12"
                      onChange={(e) => setProductUrl(e.target.value)}
                      value={productUrl}
                      placeholder="Product URL"
                    />
                  </div>

                  {/* Image container */}
                  <div className="flex justify-center items-center gap-7 flex-wrap mt-10 mb-10">
                    <div>
                      <span>Front Photo</span>
                      <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                        <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-blue-500 text-white font-body">
                          <label
                            htmlFor="imageInput1"
                            className="cursor-pointer whitespace-nowrap"
                          >
                            Select Image
                            <input
                              // download the image on click
                              disabled={true}
                              type="file"
                              id="imageInput1"
                              // accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                        {selectedImage && (
                          <div className="h-56 flex justify-center items-center object-contain w-auto">
                            <img
                              onClick={() => downloadImage("image1")}
                              id="image1"
                              src={selectedImage}
                              className="h-56 w-56"
                              alt="Selected Image"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <span>Back Photo</span>
                      <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                        <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-blue-500 text-white font-body">
                          <label
                            htmlFor="backImageInput"
                            className="cursor-pointer whitespace-nowrap"
                          >
                            Select Image
                            <input
                              disabled={true}
                              type="file"
                              id="backImageInput"
                              onChange={handleBackImageChange}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                        {selectedBackImage && (
                          <div className="h-56 flex justify-center items-center object-contain w-auto">
                            <img
                              onClick={() => downloadImage("image2")}
                              id="image2"
                              src={selectedBackImage}
                              className="h-56 w-56"
                              alt="Selected Image"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-row flex items-center justify-between gap-7 flex-wrap mb-10">
                    <div
                      style={{ width: "50%" }}
                      className=" flex items-center justify-start gap-7 flex-wrap"
                    >
                      <label htmlFor="field12">Barcode</label>
                      <BarcodeGenerator text={allData?.barcode} />
                    </div>
                    <div>
                      <DownloadButton id="barcodeCanvas" name="barcode" />
                    </div>
                  </div>

                  <div className="form-row flex items-center justify-between gap-7 flex-wrap mb-10">
                    <div
                      style={{ width: "50%" }}
                      className=" flex items-center justify-start gap-7 flex-wrap"
                    >
                      <label htmlFor="field12">Data Matrix</label>
                      <DataMatrixGenerator
                        text={
                          allData?.barcode +
                          " | " +
                          allData?.BrandName +
                          " | " +
                          allData?.unit +
                          " | " +
                          allData?.size +
                          " | " +
                          allData?.countrySale +
                          " | " +
                          allData?.gpc_code +
                          " | " +
                          allData?.HSCODES
                        }
                      />
                    </div>
                    <div>
                      <DownloadButton id="dataMatrixCanvas" name="datamatrix" />
                    </div>
                  </div>
                </div>

                <div className="footer-line"></div>

                <div className="popup-footer">
                  {/* <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="popup-close"
                  >
                    Back
                  </button> */}
                  <button
                    onClick={() => navigate(-1)}
                    className="popup-close"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GTINViewProduct;