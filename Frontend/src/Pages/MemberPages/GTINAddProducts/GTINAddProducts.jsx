import React, { useContext, useEffect, useRef, useState } from 'react';
import './GTINAddProducts.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import userRequest from '../../utils/userRequest';
import axios from 'axios';
import { SnackbarContext } from '../../../Contexts/SnackbarContext';
// import phpRequest from '../../utils/phpRequest';
import { useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
// import { CurrentUserContext } from '../../Contexts/CurrentUserContext';
import { CircularProgress } from '@mui/material';
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
// import SideBar from '../../Components/SideBar/SideBar';
import Identify from '../../../Images/Identify.png';
import capture from '../../../Images/capture.png';
import share from '../../../Images/share.png';



const GTINAddProducts = () => {
    const abortControllerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBackImage, setSelectedBackImage] = useState(null);
    const [unitCode, setUnitCode] = useState([]);
    const [region, setRegion] = useState([]);
    const [allCountryName, setAllCountryName] = useState([]);
    const [productDescriptionLanguage, setProductDescriptionLanguage] = useState([]);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const [productType, setProductType] = useState([]);
    const [packageType, setPackageType] = useState([]);
    const [open, setOpen] = useState(false);
    const [hsLoaderOpen, setHsLoaderOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [autocompleteLoadingForHsCode, setAutocompleteLoadingForHsCode] = useState(false);
    // const [digitalInformationType, setDigitalInformationType] = useState([]);
    const navigate = useNavigate();

    // const { currentUser } = useContext(CurrentUserContext);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const resetSnakeBarMessages = () => {
        setError(null);
        setMessage(null);

    };

    

    // set the all state values
    const [productNameEnglish, setProductNameEnglish] = useState('');
    const [productNameArabic, setProductNameArabic] = useState('');
    const [brandNameEnglish, setBrandNameEnglish] = useState('');
    const [brandNameArabic, setBrandNameArabic] = useState('');
    const [size, setSize] = useState('');
    const [gpc, setGpc] = useState(null);
    const [gpcCode, setGpcCode] = useState('');
    const [hsCode, setHsCode] = useState(null);
    const [hsCodeList, setHsCodeList] = useState([]); // hs code list
    const [descriptionEnglish, setDescriptionEnglish] = useState('');
    const [descriptionArabic, setDescriptionArabic] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [selectedUnitCode, setSelectedUnitCode] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProductDescription, setSelectedProductDescription] = useState('');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedPackageType, setSelectedPackageType] = useState('');
    const [selectedDigitalInformationType, setSelectedDigitalInformationType] = useState('');

    // const handleUnitCodeChange = (event, value) => {
    //     setSelectedUnitCode(value);
    //   };


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


    // useEffect(() => {
    //     // All Countries Api
    //     userRequest.get('/getAllCountries')
    //         .then((response) => {
    //             console.log(response.data)
    //             const data = response.data;
    //             const country = data.map((country) => country.name_en);

    //             setAllCountryName(country);
    //             console.log(country);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         }
    //         );


    //     // All Countries of Sales Api
    //     userRequest.get('/getAlCountriesOfSales')
    //         .then((response) => {
    //             console.log(response.data)
    //             const data = response.data;
    //             const countryName = data.map((country) => country.country_name);
    //             setRegion(countryName);
    //             console.log(countryName);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         }
    //         );


    //     // Product Description Language Api
    //     userRequest.get('/getAllProdDescLanguages')
    //         .then((response) => {
    //             console.log(response.data)
    //             const data = response.data;
    //             const productlanguage = data.map((country) => country.language_name);
    //             setProductDescriptionLanguage(productlanguage);
    //             console.log(productlanguage);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         }
    //         );



    //     // Product type Api
    //     userRequest.get('/getAllProductTypesFromGs1ProdDb')
    //         .then((response) => {
    //             console.log(response.data)
    //             const data = response.data;
    //             const name = data.map((country) => country.name);
    //             setProductType(name);
    //             console.log(name);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         }
    //         );


    //     // Package type Api
    //     userRequest.get('/getAllProductPackagings')
    //         .then((response) => {
    //             console.log(response.data)
    //             const data = response.data;
    //             const PackageName = data.map((country) => country.name);
    //             setPackageType(PackageName);
    //             console.log(PackageName);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         }
    //         );
    //     phpRequest.get('/get/units')
    //         .then((response) => {
    //             console.log(response.data)
    //             const data = response?.data?.units;
    //             const unitNameList = data.map((unitData) => unitData?.unit_name);
    //             setUnitCode(unitNameList)

    //         })
    //         .catch((error) => {
    //             console.log(error);

    //         }
    //         );





    // }, []);




    const { openSnackbar } = useContext(SnackbarContext);


    // testing add
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    }

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);

    //     const formData = new FormData();
    //     // formData.append('front_image', selectedImage);
    //     // formData.append('back_image', selectedBackImage);
    //     formData.append('gcpGLNID', currentUser?.user?.gcpGLNID);
    //     formData.append('productnameenglish', productNameEnglish);
    //     formData.append('productnamearabic', productNameArabic);
    //     formData.append('BrandName', brandNameEnglish);
    //     formData.append('BrandNameAr', brandNameArabic);
    //     formData.append('ProductType', selectedProductType);
    //     formData.append('Origin', selectedRegion);
    //     formData.append('countrySale', selectedCountry);
    //     formData.append('PackagingType', selectedPackageType);
    //     formData.append('ProvGLN', currentUser?.user?.gln);
    //     formData.append('unit', selectedUnitCode);
    //     formData.append('size', size);
    //     formData.append('prod_lang', selectedProductDescription);
    //     formData.append('gpc', gpc?.value);
    //     formData.append('gpc_code', gpcCode);
    //     formData.append('HsDescription', hsCode?.DescriptionEN);
    //     formData.append('HSCODES', hsCode?.HSCODES);
    //     formData.append('details_page', descriptionEnglish);
    //     formData.append('details_page_ar', descriptionArabic);
    //     formData.append('gcp_type', currentUser?.user?.gcp_type || 'GCP');
    //     formData.append('product_url', productUrl);
    //     formData.append('user_id', currentUser?.user?.id);
    //     // formData.append('user_id', '3');
    //     // Append back image file
    //     const backImageInput = document.querySelector('#backImageInput');
    //     if (backImageInput.files && backImageInput.files[0]) {
    //         formData.append('back_image', backImageInput.files[0]);
    //     }

    //     // Append front image file
    //     const imageInput = document.querySelector('#imageInput');
    //     if (imageInput.files && imageInput.files[0]) {
    //         formData.append('front_image', imageInput.files[0]);
    //     }
    //     try {


    //         const response = await phpRequest.post(
    //             '/member/create/GTIN',
    //             formData
    //         );

    //         console.log(response);
    //         openSnackbar('Product Added Successfully', 'success');
    //         // event reset form
    //         event.target.reset();
    //         setSelectedImage(null);
    //         setSelectedBackImage(null);
    //         setSelectedUnitCode('');
    //         setSelectedRegion('');
    //         setSelectedCountry('');
    //         setSelectedProductDescription('');
    //         setSelectedProductType('');
    //         setSelectedPackageType('');
    //         setGpc(null);
    //         setGpcCode('');
    //         setHsCode(null);
    //         setDescriptionEnglish('');
    //         setDescriptionArabic('');
    //         setProductUrl('');
    //         setSize('');
    //         setBrandNameEnglish('');
    //         setBrandNameArabic('');
    //         setProductNameEnglish('');
    //         setProductNameArabic('');
    //         setIsLoading(false);


    //     }
    //     catch (error) {
    //         console.log(error);
    //         openSnackbar("Something went wrong", "error");
    //         // alert("Something went wrong")
    //         setIsLoading(false);
    //     }

    // };




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


    // Testing add
    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        // console.log(reason)
    }

    // const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
    //     console.log(reason)
    //     if (reason === 'reset' || reason === 'clear') {
    //         setGpcList([]); // Clear the data list if there is no input
    //         return; // Do not perform search if the input is cleared or an option is selected
    //     }
    //     if (reason === 'option') {
    //         return // Do not perform search if the option is selected
    //     }

    //     if (!newInputValue || newInputValue.trim() === '') {
    //         // perform operation when input is cleared
    //         setGpcList([]);
    //         return;
    //     }


    //     setAutocompleteLoading(true);
    //     setOpen(true);


    //     console.log(newInputValue);
    //     // setSearchText(newInputValue);
    //     console.log("querying...")
    //     try {

    //         // Cancel any pending requests
    //         if (abortControllerRef.current) {
    //             abortControllerRef.current.abort();
    //         }

    //         // Create a new AbortController
    //         abortControllerRef.current = new AbortController();
    //         const res = await phpRequest.post("/search/gpc", {

    //             "term": newInputValue
    //         }, {

    //             signal: abortControllerRef.current.signal
    //         })

    //         console.log(res);
    //         setGpcList(res?.data?.gpc ?? []);
    //         setOpen(true);
    //         setAutocompleteLoading(false);
    //     }
    //     catch (error) {
    //         if (error?.name === 'CanceledError') {
    //             // Ignore abort errors
    //             setGpcList([]); // Clear the data list if there is no input
    //             setAutocompleteLoading(true);
    //             console.log(error)
    //             return;
    //         }
    //         console.error(error);
    //         console.log(error)
    //         setGpcList([]); // Clear the data list if an error occurs
    //         setOpen(false);
    //         setAutocompleteLoading(false);
    //     }

    // }

    const handleGPCAutoCompleteChange = (event, value) => {
        console.log(value);
        setGpc(value);
        setGpcCode(value?.gpcCode);
    }

    // testing add 
    const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
        // console.log(reason)
    }
    // const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
    //     console.log(reason)
    //     if (reason === 'reset' || reason === 'clear') {
    //         setHsCodeList([]); // Clear the data list if there is no input
    //         return; // Do not perform search if the input is cleared or an option is selected
    //     }
    //     if (reason === 'option') {
    //         return // Do not perform search if the option is selected
    //     }

    //     if (!newInputValue || newInputValue.trim() === '') {
    //         // perform operation when input is cleared
    //         setHsCodeList([]);
    //         return;
    //     }


    //     setAutocompleteLoadingForHsCode(true);
    //     setHsLoaderOpen(true);


    //     console.log(newInputValue);
    //     // setSearchText(newInputValue);
    //     try {

    //         // Cancel any pending requests
    //         if (abortControllerRef.current) {
    //             abortControllerRef.current.abort();
    //         }

    //         // Create a new AbortController
    //         abortControllerRef.current = new AbortController();
    //         const res = await phpRequest.get("/search/hs/codes", {

    //             "term": newInputValue
    //         }, {

    //             signal: abortControllerRef.current.signal
    //         })

    //         console.log(res);
    //         console.log(res?.data?.hsCodes);
    //         setHsCodeList(res?.data?.hsCodes ?? []);
    //         setHsLoaderOpen(true);
    //         setAutocompleteLoadingForHsCode(false);
    //     }
    //     catch (error) {
    //         if (error?.name === 'CanceledError') {
    //             // Ignore abort errors
    //             setHsCodeList([]); // Clear the data list if there is no input
    //             setAutocompleteLoadingForHsCode(true);
    //             console.log(error)
    //             return;
    //         }
    //         console.error(error);
    //         console.log(error)
    //         setHsCodeList([]); // Clear the data list if an error occurs
    //         setHsLoaderOpen(false);
    //         setAutocompleteLoadingForHsCode(false);
    //     }

    // }

    const handleHsCodeAutoCompleteChange = (event, value) => {
        console.log(value);
        setHsCode(value);


    }




    return (
        <>

            {isLoading &&

                <div className='loading-spinner-background'
                    style={{
                        zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'


                    }}
                >
                    <RiseLoader
                        size={18}
                        color={"#6439ff"}
                        // height={4}
                        loading={isLoading}
                    />
                </div>
            }

            {/* <SideBar /> */}

            <div className="p-0 h-full sm:ml-72  bg-slate-100">
              <div>
                <DashboardRightHeader title="Add Product" member={'Member: Binmar Property'}
                    gcp={'GCP: 62810000032'}
                />
              </div>

              <div className="flex flex-col justify-center items-center p-4">
                {" "}
                <div className="h-auto w-full p-5 bg-white">
                    <div className="popup-header">
                    <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
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

                    <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                      <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                         <label htmlFor="fields1" className="text-secondary">Product Name [English]</label>
                        <input
                          type="text"
                          id="fields1"
                          onChange={(e) => setProductNameEnglish(e.target.value)}
                          value={productNameEnglish}
                          className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                          placeholder="Product Name English"
                        />
                    </div>

                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                        <label htmlFor="fields2" className="text-secondary">Product Name [Arabic]</label>
                        <input
                          type="text"
                          id="fields2"
                          className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                          value={productNameArabic}
                          onChange={(e) => setProductNameArabic(e.target.value)}
                          placeholder="Product Name Arabic"
                        />
                    </div>
                  </div>

                  <div className="w-full h-[2px] bg-primary mb-6 mt-6"></div>
            
                  <div className="popup-form">
                    <form onSubmit={handleFormSubmit}>
                      <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field1" className="text-secondary">Brand Name [English] </label>
                            <input
                            type="text"
                            id="field1"
                            onChange={(e) => setBrandNameEnglish(e.target.value)}
                            value={brandNameEnglish}
                            placeholder="Brand Name [English]"
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"

                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field2" className="text-secondary">Brand Name [Arabic] </label>
                            <input
                            type="text"
                            id="field2"
                            onChange={(e) => setBrandNameArabic(e.target.value)}
                            value={brandNameArabic}
                            placeholder="Brand Name [Arabic]"
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"

                            />
                        </div>
                    </div>
                        
                        
                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field3" className="text-secondary">Unit Code</label>
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
                                    className="bg-gray-50 border border-gray-300 text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
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
                            {/* </div> */}
                        </div>

                        {/* <div className="form-row"> */}
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field4" className="text-secondary">Size</label>
                            <input
                            type="text"
                            id="field4"
                            onChange={(e) => setSize(e.target.value)}
                            value={size}
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                            placeholder="Size"
                            />
                        </div>
                        </div>
                        
                    
                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                    
                            <label htmlFor="field5" className="text-secondary">Region</label>
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

                
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field6" className="text-secondary">Country of Sale</label>
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

                    
                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field7" className="text-secondary">
                            Product Description Language{" "}
                            </label>
                            <Autocomplete
                                id="field7"
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


                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field8" className="text-secondary">Product Type</label>
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
                            {/* </div> */}
                        </div>
                        </div>

                    
                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field9" className="text-secondary">Package Type</label>
                            <Autocomplete
                                id="field9"
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

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field10" className="text-secondary">GPC</label>
                            <input
                            type="text"
                            id="field10"
                            value={gpc}
                            onChange={(e) => setGpc(e.target.value)}
                            placeholder="GPC"
                            />
                        </div>
                        </div>


                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="sm:w-[48%] w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field11" className="text-secondary">HS-Code</label>
                            <input
                            type="text"
                            id="field11"
                            onChange={(e) => setHsCode(e.target.value)}
                            value={hsCode}
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                            placeholder="HS-Code"
                            />
                        </div>
                        </div>
                        
                        {/* <div>
                        
                        </div> */}


                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field12" className="text-secondary">Description [English] </label>
                            <textarea
                            type="text"
                            onChange={(e) => setDescriptionEnglish(e.target.value)}
                            value={descriptionEnglish}
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                            id="field12"
                            />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field13" className="text-secondary">Description [Arabic] </label>
                            <textarea
                            type="text"
                            onChange={(e) => setDescriptionArabic(e.target.value)}
                            value={descriptionArabic}
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                            id="field13"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full sm:w-[49%] font-body sm:text-base text-sm flex flex-col gap-0">
                        <label htmlFor="field12" className="text-secondary">Product URL</label>
                            <input
                            type="text"
                            id="field12"
                            onChange={(e) => setProductUrl(e.target.value)}
                            value={productUrl}
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                            placeholder="Product URL"
                            />
                        </div>
                    </div>
                
                <div>
                {/* Image container */}
                   {/* <div className='flex justify-center items-center gap-7 flex-wrap mt-10'>
                      <div>
                         <span>Front Photo</span>
                           <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                              <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-blue-500 text-white font-body">
                                 <label htmlFor="imageInput" className="cursor-pointer whitespace-nowrap">
                                    Select Image
                                    <input
                                        type="file"
                                        id="imageInput"
                                        // accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                  </label>
                                </div>
                                {selectedImage && (
                                    <div className='h-56 flex justify-center items-center object-contain w-auto'>
                                        <img src={selectedImage} className='h-56 w-56' alt="Selected Image" />
                                    </div>
                                )}
                             </div>
                        </div>


                        <div>
                           <span>Back Photo</span>
                             <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                               <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-blue-500 text-white font-body">
                                    <label htmlFor="backImageInput" className="cursor-pointer whitespace-nowrap">
                                        Select Image
                                    <input
                                        type="file"
                                        id="backImageInput"
                                        onChange={handleBackImageChange}
                                        style={{ display: 'none' }}
                                    />
                                    </label>
                                </div>
                                {selectedBackImage && (
                                    <div className="h-56 flex justify-center items-center object-contain w-auto">
                                        <img src={selectedBackImage} className='h-56 w-56' alt="Selected Image" />
                                    </div>
                                )}
                            </div>
                        </div>




                    </div> */}
                    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16 sm:mt-20 mt-24">
                        <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <a href="#" class="block">
                                <div class="h-28">
                                    <div
                                        class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-[#C3E2DC] rounded-xl justify-items-center align-middle">
                                        <img src={Identify}
                                            class="w-36 h-36  mt-6 m-auto" alt="Automotive" title="Automotive" loading="lazy"
                                            width="200" height="200" />
                                    </div>
                                </div>
                                <div class="p-6 z-10 w-full">
                                    <p
                                        class="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                                        Identify
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <a href="#" class="block">
                                <div class="h-28">
                                    <div
                                        class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-[#C3E2DC] rounded-xl justify-items-center align-middle">
                                        <img src={capture}
                                            class="w-36 h-36  mt-6 m-auto" alt="Toys and Baby Products"
                                            title="Toys and Baby Products" loading="lazy" width="200" height="200" />
                                    </div>
                                </div>
                                <div class="p-6   z-10 w-full   ">
                                    <p
                                        class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                                        Capture
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <a href="#" class="block">
                                <div class="h-28">
                                    <div
                                        class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 bg-[#C3E2DC] rounded-xl justify-items-center align-middle">
                                        <img src={share}
                                            class="w-36 h-36  mt-6 m-auto" alt="Medical" title="Medical" loading="lazy" width="200"
                                            height="200" />
                                    </div>
                                </div>
                                <div class="p-6 z-10 w-full   ">
                                    <p
                                        class="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                                        Share
                                    </p>
                                </div>
                            </a>
                        </div>
                     </div>

                  </div>

                    <div className='footer-line'></div>

                    <div className="popup-footer">
                    {/* <button type='button' onClick={() => navigate(-1)} className="popup-close">Back</button>
                        <button type='submit' className="popup-save" id="gtin-form">Add</button> */}
                        <button onClick={() => navigate(-1)} className="popup-close">Back</button>
                        <button className="popup-save" id="gtin-form">Add</button>
                    </div>
                    </form>
                </div>


                    </div>
                </div>
            </div>
        </>
    )
}
export default GTINAddProducts;
