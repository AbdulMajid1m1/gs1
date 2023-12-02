import React, { useContext, useEffect, useRef, useState } from "react";
import "./GTINAddProducts.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import userRequest from "../../../utils/userRequest";
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
// import phpRequest from "../../utils/phpRequest";
import { useNavigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
// import SideBar from '../../Components/SideBar/SideBar';
import { useParams } from "react-router-dom";
// import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { CircularProgress } from "@mui/material";

const GTINUpdateProducts = () => {
  const abortControllerRef = useRef(null);
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
  const [hsLoaderOpen, setHsLoaderOpen] = useState(false);
  const [hsCodeList, setHsCodeList] = useState([]); // hs code list

  const [autocompleteLoadingForHsCode, setAutocompleteLoadingForHsCode] = useState(false);

  const [gpcList, setGpcList] = useState([]);
  const [productType, setProductType] = useState([]);
  const [packageType, setPackageType] = useState([]);
  const navigate = useNavigate();
  let { productId } = useParams();

//   const { currentUser } = useContext(CurrentUserContext);
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
  const [gpc, setGpc] = useState(null);
  const [gpcCode, setGpcCode] = useState('');
  const [hsCode, setHsCode] = useState(null);
  const [descriptionEnglish, setDescriptionEnglish] = useState("");
  const [descriptionArabic, setDescriptionArabic] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [selectedUnitCode, setSelectedUnitCode] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [open, setOpen] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  const [selectedProductDescription, setSelectedProductDescription] =
    useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [selectedDigitalInformationType, setSelectedDigitalInformationType] =
    useState("");

//   useEffect(() => {
//     setIsLoading(true);
//     const fetchProductDetails = async () => {


//       try {
//         const response = await phpRequest.post("/member/edit/GTIN", {
//           "user_id": currentUser?.user?.id,
//           "prodcut_id": productId
//         });

//         console.log(response.data);

//         const productData = response.data?.GTINProduct;
//         const imagePath = response.data?.image_path;

//         // Set the state variables with the fetched data
//         setProductNameEnglish(productData?.productnameenglish);
//         setProductNameArabic(productData?.productnamearabic);
//         setBrandNameEnglish(productData?.BrandName);
//         setBrandNameArabic(productData?.BrandNameAr);
//         setSize(productData?.size);
//         setGpc({
//           value: productData?.gpc,
//           codeTitle: productData?.gpc,
//           gpcCode: productData?.gpc_code,

//         });
//         setHsCode({
//           HSCODES: productData?.HSCODES,
//           DescriptionEN: productData?.HsDescription,
//           HSID: productData,
//           value: productData?.HsDescription,

//         });
//         setGpcCode(productData?.gpc_code);
//         setDescriptionEnglish(productData?.details_page);
//         setDescriptionArabic(productData?.details_page_ar);
//         setProductUrl(productData?.product_url);
//         setSelectedUnitCode(productData?.unit);
//         setSelectedRegion(productData?.Origin);
//         setSelectedCountry(productData?.countrySale);
//         setSelectedProductDescription(productData?.details_page);
//         setSelectedProductType(productData?.ProductType);
//         setSelectedPackageType(productData?.PackagingType);
//         setSelectedDigitalInformationType(productData?.HsDescription);
//         const frontImg = imagePath + "/" + productData?.front_image;
//         setSelectedImage(frontImg);
//         const backImg = imagePath + "/" + productData?.back_image;
//         setSelectedBackImage(backImg);
//         console.log(imagePath + "/" + productData?.front_image);

//         setIsLoading(false);

//       } catch (error) {
//         console.log(error);
//         setIsLoading(false);

//       }
//     };
//     fetchProductDetails();
//   }, [productId]);
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

//   useEffect(() => {
//     userRequest
//       .get("/getAllCountries")
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;
//         const country = data.map((country) => country.name_en);
//         setAllCountryName(country);
//         console.log(country);
//       })
//       .catch((error) => {
//         console.log(error);
//       });



//     // All Countries of Sales Api
//     userRequest
//       .get("/getAlCountriesOfSales")
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;
//         const countryName = data.map((country) => country.country_name);
//         setRegion(countryName);
//         console.log(countryName);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Product Description Language Api
//     userRequest
//       .get("/getAllProdDescLanguages")
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;
//         const productlanguage = data.map((country) => country.language_name);
//         setProductDescriptionLanguage(productlanguage);
//         console.log(productlanguage);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Product type Api
//     userRequest
//       .get("/getAllProductTypesFromGs1ProdDb")
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;
//         const name = data.map((country) => country.name);
//         setProductType(name);
//         console.log(name);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // Package type Api
//     userRequest
//       .get("/getAllProductPackagings")
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;
//         const PackageName = data.map((country) => country.name);
//         setPackageType(PackageName);
//         console.log(PackageName);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     phpRequest.get('/get/units')
//       .then((response) => {
//         console.log(response.data)
//         const data = response?.data?.units;
//         const unitNameList = data.map((unitData) => unitData?.unit_name);
//         setUnitCode(unitNameList)

//       })
//       .catch((error) => {
//         console.log(error);

//       }
//       );
//   }, []);

  const { openSnackbar } = useContext(SnackbarContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    // formData.append('front_image', selectedImage);
    // formData.append('back_image', selectedBackImage);
    formData.append("gcpGLNID", "62810008");
    formData.append("productnameenglish", productNameEnglish);
    formData.append("productnamearabic", productNameArabic);
    formData.append("BrandName", brandNameEnglish);
    formData.append("BrandNameAr", brandNameArabic);
    formData.append("ProductType", selectedProductType);
    formData.append("Origin", selectedRegion);
    formData.append("countrySale", selectedCountry);
    formData.append("PackagingType", selectedPackageType);
    formData.append("ProvGLN", "6281000800003");
    formData.append("unit", selectedUnitCode);
    formData.append("size", size);
    formData.append("prod_lang", selectedProductDescription);
    formData.append("gpc", gpc.value);
    formData.append("gpc_code", gpcCode);
    formData.append("HsDescription", hsCode?.DescriptionEN);
    formData.append("HSCODES", hsCode?.HSCODES);
    formData.append("details_page", descriptionEnglish);
    formData.append("details_page_ar", descriptionArabic);
    formData.append("gcp_type", "GCP-2");
    formData.append("product_url", productUrl);
    // formData.append("user_id", currentUser?.user?.id);
    // formData.append('user_id', '3');
    formData.append("product_id", productId);
    // Append back image file
    const backImageInput = document.querySelector("#backImageInput");
    if (backImageInput.files && backImageInput.files[0]) {
      formData.append("back_image", backImageInput.files[0]);
    }

    // Append front image file
    const imageInput = document.querySelector("#imageInput");
    if (imageInput.files && imageInput.files[0]) {
      formData.append("front_image", imageInput.files[0]);
    }
    try {
      const response = await phpRequest.post("/member/update/GTIN", formData);

      console.log(response);
      openSnackbar("Product upadated Successfully", "success");
      // event reset form
      event.target.reset();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      openSnackbar("Something went wrong", "error");
      // alert("Something went wrong")
      setIsLoading(false);
    }
  };

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


  const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
    console.log(reason)
    if (reason === 'reset' || reason === 'clear') {
      setGpcList([]); // Clear the data list if there is no input
      return; // Do not perform search if the input is cleared or an option is selected
    }
    if (reason === 'option') {
      return // Do not perform search if the option is selected
    }

    if (!newInputValue || newInputValue.trim() === '') {
      // perform operation when input is cleared
      setGpcList([]);
      return;
    }


    setAutocompleteLoading(true);
    setOpen(true);


    console.log(newInputValue);
    // setSearchText(newInputValue);
    console.log("querying...")
    try {

      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new AbortController
      abortControllerRef.current = new AbortController();
      const res = await phpRequest.post("/search/gpc", {

        "term": newInputValue
      }, {

        signal: abortControllerRef.current.signal
      })

      console.log(res);
      setGpcList(res?.data?.gpc ?? []);
      setOpen(true);
      setAutocompleteLoading(false);
    }
    catch (error) {
      if (error?.name === 'CanceledError') {
        // Ignore abort errors
        setGpcList([]); // Clear the data list if there is no input
        setAutocompleteLoading(true);
        console.log(error)
        return;
      }
      console.error(error);
      console.log(error)
      setGpcList([]); // Clear the data list if an error occurs
      setOpen(false);
      setAutocompleteLoading(false);
    }

  }

  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setGpc(value);
    setGpcCode(value?.gpcCode);
  }

    // Test 
    const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
        console.log(reason)
    }

//   const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
//     console.log(reason)
//     if (reason === 'reset' || reason === 'clear') {
//       setHsCodeList([]); // Clear the data list if there is no input
//       return; // Do not perform search if the input is cleared or an option is selected
//     }
//     if (reason === 'option') {
//       return // Do not perform search if the option is selected
//     }

//     if (!newInputValue || newInputValue.trim() === '') {
//       // perform operation when input is cleared
//       setHsCodeList([]);
//       return;
//     }


//     setAutocompleteLoadingForHsCode(true);
//     setHsLoaderOpen(true);


//     console.log(newInputValue);
//     // setSearchText(newInputValue);
//     try {

//       // Cancel any pending requests
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }

//       // Create a new AbortController
//       abortControllerRef.current = new AbortController();
//       const res = await phpRequest.get("/search/hs/codes", {

//         "term": newInputValue
//       }, {

//         signal: abortControllerRef.current.signal
//       })

//       console.log(res);
//       console.log(res?.data?.hsCodes);
//       setHsCodeList(res?.data?.hsCodes ?? []);
//       setHsLoaderOpen(true);
//       setAutocompleteLoadingForHsCode(false);
//     }
//     catch (error) {
//       if (error?.name === 'CanceledError') {
//         // Ignore abort errors
//         setHsCodeList([]); // Clear the data list if there is no input
//         setAutocompleteLoadingForHsCode(true);
//         console.log(error)
//         return;
//       }
//       console.error(error);
//       console.log(error)
//       setHsCodeList([]); // Clear the data list if an error occurs
//       setHsLoaderOpen(false);
//       setAutocompleteLoadingForHsCode(false);
//     }

//   }

  const handleHsCodeAutoCompleteChange = (event, value) => {
    console.log(value);
    setHsCode(value);


  }
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
              <p className="sm:text-2xl text-sm font-body"> Update Product</p>
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
                <label htmlFor="fields1">
                  Product Name [English] <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="fields1"
                  onChange={(e) => setProductNameEnglish(e.target.value)}
                  value={productNameEnglish}
                  className="w-full h-10 p-2"
                  placeholder="Product Name English"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="fields2">
                  Product Name [Arabic] <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="fields2"
                  className="w-full h-10 p-2"
                  value={productNameArabic}
                  onChange={(e) => setProductNameArabic(e.target.value)}
                  placeholder="Product Name Arabic"
                />
              </div>
            </div>

            <div className="header-line"></div>

            <div className="popup-form">
              <form onSubmit={handleFormSubmit}>
                <div>
                  {/* Recipe inputs */}
                  <div className="form-row">
                    <label htmlFor="field1">
                      Brand Name [English]{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="field1"
                      onChange={(e) => setBrandNameEnglish(e.target.value)}
                      value={brandNameEnglish}
                      className="h-10 mt-2 p-2"
                      placeholder="Brand Name [English]"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field2">
                      Brand Name [Arabic]{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="field2"
                      onChange={(e) => setBrandNameArabic(e.target.value)}
                      value={brandNameArabic}
                      className="h-10 mt-2 p-2"
                      placeholder="Brand Name [Arabic]"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field3">
                      Unit Code <span className="text-red-600">*</span>
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
                        id="field3"
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
                    <label htmlFor="field4">
                      Size <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="field4"
                      onChange={(e) => setSize(e.target.value)}
                      value={size}
                      className="h-10 p-2"
                      placeholder="Size"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field5">
                      Region <span className="text-red-600">*</span>
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
                        id="field5"
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
                    <label htmlFor="field6">
                      Country of Sale <span className="text-red-600">*</span>
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
                        id="field6"
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
                    <label htmlFor="productDescriptionLanguage">
                      Product Description Language{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
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
                    <label htmlFor="field8">
                      Product Type <span className="text-red-600">*</span>
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
                        id="field8"
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
                    <label htmlFor="packageType">
                      Package Type <span className="text-red-600">*</span>
                    </label>
                    <div className="w-[70%]">
                      <Autocomplete
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
                    <label htmlFor="serachGpc">GPC<span className='text-red-600'>*</span></label>
                    <div className='w-[70%]'>
                      <Autocomplete
                        id="serachGpc"
                        required
                        options={gpcList}
                        getOptionLabel={(option) => (option && option?.value) ? option?.value : ''}
                        onChange={handleGPCAutoCompleteChange}
                        value={gpc}
                        onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                        loading={autocompleteLoading}
                        sx={{ marginTop: '10px' }}
                        open={open}
                        onOpen={() => {
                          // setOpen(true);
                        }}
                        onClose={() => {
                          setOpen(false);
                        }}
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option ? `${option?.value}` : 'No options'}
                          </li>
                        )}

                        renderInput={(params) => (
                          <TextField
                            // required
                            {...params}
                            label="Search GPC here"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {autocompleteLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                            sx={{
                              '& label.Mui-focused': {
                                color: '#00006A',
                              },
                              '& .MuiInput-underline:after': {
                                borderBottomColor: '#00006A',
                              },
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#000000',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#000000',
                                },
                              },
                            }}
                          />
                        )}

                      />

                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="hs-code">HS-Code<span className='text-red-600'>*</span></label>
                    <div className='w-[70%]'>

                      <Autocomplete
                        id="hs-code"
                        required
                        options={hsCodeList}
                        getOptionLabel={(option) => (option && option?.value) ? option?.value : ''}
                        onChange={handleHsCodeAutoCompleteChange}
                        value={hsCode}
                        onInputChange={(event, newInputValue, params) => handleHsCodeAutoCompleteInputChange(event, newInputValue, params)}
                        loading={autocompleteLoadingForHsCode}
                        sx={{ marginTop: '10px' }}
                        open={hsLoaderOpen}
                        onOpen={() => {
                          // setOpen(true);
                        }}
                        onClose={() => {
                          setHsLoaderOpen(false);
                        }}
                        renderOption={(props, option) => (
                          <li {...props}>
                            {option ? `${option?.DescriptionEN}` : 'No options'}
                          </li>
                        )}

                        renderInput={(params) => (
                          <TextField
                            // required
                            {...params}
                            label="Search HS-Code here"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {autocompleteLoadingForHsCode ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                            sx={{
                              '& label.Mui-focused': {
                                color: '#00006A',
                              },
                              '& .MuiInput-underline:after': {
                                borderBottomColor: '#00006A',
                              },
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#000000',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#000000',
                                },
                              },
                            }}
                          />
                        )}

                      />

                    </div>
                  </div>

                  <div className="form-row">
                    <label htmlFor="field12">
                      Description [English]{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      type="text"
                      onChange={(e) => setDescriptionEnglish(e.target.value)}
                      value={descriptionEnglish}
                      id="field12"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field13">
                      Description [Arabic]{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      type="text"
                      onChange={(e) => setDescriptionArabic(e.target.value)}
                      value={descriptionArabic}
                      id="field13"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="field14">
                      Product URL <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="field14"
                      onChange={(e) => setProductUrl(e.target.value)}
                      value={productUrl}
                      className="h-10 p-2"
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
                            htmlFor="imageInput"
                            className="cursor-pointer whitespace-nowrap"
                          >
                            Select Image
                            <input
                              type="file"
                              id="imageInput"
                              // accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                        {selectedImage && (
                          <div className="h-56 flex justify-center items-center object-contain w-auto">
                            <img
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
                              src={selectedBackImage}
                              className="h-56 w-56"
                              alt="Selected Image"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <div className='header-gtincenter mt-6 py-1'>
                                            <button type='button' className='header-belowgtin mb-6 px-4 rounded-sm'>
                                                <i className="fas fa-arrow-down"></i>  Digital Link Information
                                            </button>
                                        </div> */}
                  </div>
                </div>

                {/* <div className='flex flex-col gap-3'>
                                    <label>Digital Information Type</label>
                                    <div className='w-full'>
                                        <Autocomplete
                                            id="digitalInformation"
                                            options={packageType}
                                            getOptionLabel={(option) => option}
                                            onChange={handleDigitalInformationType}
                                            value={selectedDigitalInformationType}

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
                                                    placeholder="Enter/ Digital Information Type"
                                                    required
                                                />
                                            )}
                                            classes={{
                                                endAdornment: "text-white",
                                            }}
                                            sx={{
                                                '& .MuiAutocomplete-endAdornment': {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    </div>
                                </div> */}

                <div className="footer-line"></div>

                <div className="popup-footer">
                  {/* <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="popup-close"
                  >
                    Back
                  </button>
                  <button type="submit" className="popup-save" id="gtin-form">
                    Update
                  </button> */}
                  <button
                    onClick={() => navigate(-1)}
                    className="popup-close"
                  >
                    Back
                  </button>
                  <button className="popup-save" id="gtin-form">
                    Update
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
export default GTINUpdateProducts;
