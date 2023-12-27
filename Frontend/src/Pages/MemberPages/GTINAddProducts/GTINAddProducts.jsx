import React, { useContext, useEffect, useRef, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
import { DotLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import newRequest from '../../../utils/userRequest';


const GTINAddProducts = () => {
    const abortControllerRef = useRef(null);
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    // console.log(memberData);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBackImage, setSelectedBackImage] = useState(null);
    const [imageOptional1, setImageOptional1] = useState(null);
    const [imageOptional2, setImageOptional2] = useState(null);
    const [imageOptional3, setImageOptional3] = useState(null);
    const [unitCode, setUnitCode] = useState([]);
    const [region, setRegion] = useState([]);
    const [allCountryName, setAllCountryName] = useState([]);
    const [productDescriptionLanguage, setProductDescriptionLanguage] = useState([]);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const [productType, setProductType] = useState([]);
    const [packageType, setPackageType] = useState([
        'Box',
        'Carton',
    ]);
    const [brandNameEnglish, setBrandNameEnglish] = useState([]);
    const [brandNameArabic, setBrandNameArabic] = useState([]);
    const [open, setOpen] = useState(false);
    const [hsLoaderOpen, setHsLoaderOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const [autocompleteLoadingForHsCode, setAutocompleteLoadingForHsCode] = useState(false);
    const navigate = useNavigate();
    

    // set the all state values
    const [productNameEnglish, setProductNameEnglish] = useState('');
    const [productNameArabic, setProductNameArabic] = useState('');
    // const [brandNameEnglish, setBrandNameEnglish] = useState('');
    // const [brandNameArabic, setBrandNameArabic] = useState('');
    const [size, setSize] = useState('');
    const [gpc, setGpc] = useState(null);
    const [gpcCode, setGpcCode] = useState('');
    const [hsCode, setHsCode] = useState(null);
    const [hsCodeList, setHsCodeList] = useState([]); // hs code list
    const [descriptionEnglish, setDescriptionEnglish] = useState('');
    const [descriptionArabic, setDescriptionArabic] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [selectedBrandNameEnglish, setSelectedBrandNameEnglish] = useState('');
    const [selectedBrandNameArabic, setSelectedBrandNameArabic] = useState('');
    const [selectedUnitCode, setSelectedUnitCode] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProductDescription, setSelectedProductDescription] = useState('');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedPackageType, setSelectedPackageType] = useState('');
    const [selectedDigitalInformationType, setSelectedDigitalInformationType] = useState('');


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

    const handleImageOptional1Change = (event) => {
        const imageOptional1File = event.target.files[0];
        const imageOptional1Url = URL.createObjectURL(imageOptional1File);
        setImageOptional1(imageOptional1Url);
    };

    const handleImageOptional2Change = (event) => {
        const imageOptional2File = event.target.files[0];
        const imageOptional2Url = URL.createObjectURL(imageOptional2File);
        setImageOptional2(imageOptional2Url);
    };

    const handleImageOptional3Change = (event) => {
        const imageOptional3File = event.target.files[0];
        const imageOptional3Url = URL.createObjectURL(imageOptional3File);
        setImageOptional3(imageOptional3Url);
    };


     // All Countries Api
   

//  // Package type Api
//  userRequest.get('/getAllProductPackagings')
//      .then((response) => {
//          console.log(response.data)
//          const data = response.data;
//          const PackageName = data.map((country) => country.name);
//          setPackageType(PackageName);
//          console.log(PackageName);
//      })
//      .catch((error) => {
//          console.log(error);
//      }
//      );


    const handleCountryOfSales = async () => {
        try {
            const response = await newRequest.get('/getAllcountryofsale');
            console.log(response.data);
            const data = response.data;
            const countryName = data.map((country) => country.country_name);
            setAllCountryName(countryName);
            console.log(countryName);
        } catch (error) {
            console.log(error);
        }
    };


    const handleUnitCode = async () => {
        try {
            const response = await newRequest.get('/getAllunit');
            console.log(response.data);
            const data = response?.data;
            const unitNameList = data.map((unitData) => unitData?.unit_name);
            setUnitCode(unitNameList);
        } catch (error) {
            console.log(error);
        }
    };


    //  // Product type Api
    const handleProductTypeData = async () => {
        try {
            const response = await newRequest.get('/productTypes');
            console.log(response.data);
            const data = response.data;
            const name = data.map((country) => country.name);
            setProductType(name);
            console.log(name);
        } catch (error) {
            console.log(error);
        }
    };


    const handleBrandNamesEnglishArabic = async () => {
        try {
            const response = await newRequest.get(`/brands?user_id=${memberData?.id}`);
            console.log(response.data);
            const data = response.data;
            const name = data.map((country) => country.name);
            const name_ar = data.map((country) => country.name_ar);
            setBrandNameEnglish(name);
            setBrandNameArabic(name_ar);
            console.log(name);
        } catch (error) {
            console.log(error);
        }
    };


    const handleProductDescriptionLanguages = async () => {
        try {
            const response = await newRequest.get('/getAllprod_desc_languages');
            console.log(response.data);
            const data = response.data;
            const productlanguage = data.map((country) => country.language_name);
            setProductDescriptionLanguage(productlanguage);
            console.log(productlanguage);
        } catch (error) {
            console.log(error);
        }
    };


    const handleRegion = async () => {
        try {
            const response = await newRequest.get('/getAllcountryofsale');
            console.log(response.data);
            const data = response.data;
            const countryName = data.map((country) => country.country_name);
            setRegion(countryName);
            console.log(countryName);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        handleUnitCode();
        handleCountryOfSales();
        handleProductTypeData();
        handleBrandNamesEnglishArabic();
        handleProductDescriptionLanguages();
        handleRegion();
    }, []);



    // testing add
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    // }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('user_id', memberData?.id);
        // formData.append('gcpGLNID', memberData?.gcpGLNID);
        // formData.append('import_code', '12345');
        formData.append('productnameenglish', productNameEnglish);
        formData.append('productnamearabic', productNameArabic);
        formData.append('BrandName', selectedBrandNameEnglish);
        formData.append('ProductType', selectedProductType);
        formData.append('Origin', selectedRegion);
        formData.append('PackagingType', selectedPackageType);
        // formData.append('MnfCode', 'MNF123');
        // formData.append('MnfGLN', 'GLN123');
        formData.append('ProvGLN', memberData?.gln);
        formData.append('unit', selectedUnitCode);
        formData.append('size', size);
        // formData.append('childProduct', 'childProd123');
        // formData.append('quantity', '10');
        // formData.append('barcode', '0123456789012');
        formData.append('gpc', gpc?.value);
        // formData.append('gpc_code', 'GPC456');
        formData.append('countrySale', selectedCountry);
        formData.append('HSCODES', hsCode?.value);
        formData.append('HsDescription', descriptionEnglish);
        formData.append('gcp_type',  memberData.gcp_type || 'GCP');
        formData.append('prod_lang', productNameEnglish);
        formData.append('details_page', descriptionEnglish);
        formData.append('details_page_ar', descriptionArabic);
        // formData.append('status', '1');
        formData.append('memberID', memberData?.id);
        // formData.append('admin_id', '1');
        // formData.append('save_as', 'final');
        // formData.append('gtin_type', 'gtin');
        formData.append('product_url', productUrl);
        // formData.append('product_link_url', 'http://productlink.example.com');
        formData.append('BrandNameAr', selectedBrandNameArabic);
        // formData.append('digitalInfoType', '1');
        // formData.append('readyForGepir', '1');
        // formData.append('gepirPosted', '1');

        // Append back image file
        const backImageInput = document.querySelector('#backImageInput');
        if (backImageInput.files && backImageInput.files[0]) {
            formData.append('back_image', backImageInput.files[0]);
        }

        // Append front image file
        const imageInput = document.querySelector('#imageInput');
        if (imageInput.files && imageInput.files[0]) {
            formData.append('front_image', imageInput.files[0]);
        }

        // Append optional image 1 file
        const imageOptional1Input = document.querySelector('#imageOptional1Input');
        if (imageOptional1Input.files && imageOptional1Input.files[0]) {
            formData.append('image_1', imageOptional1Input.files[0]);
        }

        // Append optional image 2 file
        const imageOptional2Input = document.querySelector('#imageOptional2Input');
        if (imageOptional2Input.files && imageOptional2Input.files[0]) {
            formData.append('image_2', imageOptional2Input.files[0]);
        }

        // Append optional image 3 file
        const imageOptional3Input = document.querySelector('#imageOptional3Input');
        if (imageOptional3Input.files && imageOptional3Input.files[0]) {
            formData.append('image_3', imageOptional3Input.files[0]);
        }

        try {


            const response = await newRequest.post(
                '/products',
                formData
            );

            console.log(response);
            // openSnackbar('Product Added Successfully', 'success');
            setSelectedImage(null);
            setSelectedBackImage(null);
            setSelectedUnitCode('');
            setSelectedRegion('');
            setSelectedCountry('');
            setSelectedProductDescription('');
            setSelectedProductType('');
            setSelectedPackageType('');
            setGpc(null);
            setGpcCode('');
            setHsCode(null);
            setDescriptionEnglish('');
            setDescriptionArabic('');
            setProductUrl('');
            setSize('');
            setBrandNameEnglish('');
            setBrandNameArabic('');
            setProductNameEnglish('');
            setProductNameArabic('');
            setIsLoading(false);
            toast.success(response?.data?.message || 'Product created Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 

            setTimeout(() => {
                navigate(-1);
            }, 2000);

        }
        catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error || "Error", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
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

    const handleBrandNameEnglish = (event, value) => {
        console.log(value);
        setSelectedBrandNameEnglish(value);
    };

    const handleBrandNameArabic = (event, value) => {
        console.log(value);
        setSelectedBrandNameArabic(value);
    };

    const handleDigitalInformationType = (event, value) => {
        console.log(value);
        setSelectedDigitalInformationType(value);
    };


    // Testing add
    // const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
    //     // console.log(reason)
    // }

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
            const res = await newRequest.get(`/gpc/search?term=${newInputValue}`, 
            {
                signal: abortControllerRef.current.signal
            })

            console.log(res);
            setGpcList(res?.data);
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
        setGpcCode(value);
    }

    // testing add 
    // const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
    //     // console.log(reason)
    // }

    const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
        console.log(reason)
        if (reason === 'reset' || reason === 'clear') {
            setHsCodeList([]); // Clear the data list if there is no input
            return; // Do not perform search if the input is cleared or an option is selected
        }
        if (reason === 'option') {
            return // Do not perform search if the option is selected
        }

        if (!newInputValue || newInputValue.trim() === '') {
            // perform operation when input is cleared
            setHsCodeList([]);
            return;
        }


        setAutocompleteLoadingForHsCode(true);
        setHsLoaderOpen(true);


        console.log(newInputValue);
        // setSearchText(newInputValue);
        try {

            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create a new AbortController
            abortControllerRef.current = new AbortController();
            const res = await newRequest.get(`/hsCode/searchHsCodes?term=${newInputValue}`,
            {
                signal: abortControllerRef.current.signal
            })

            console.log(res);
            console.log(res?.data);
            setHsCodeList(res?.data);
            setHsLoaderOpen(true);
            setAutocompleteLoadingForHsCode(false);
        }
        catch (error) {
            if (error?.name === 'CanceledError') {
                // Ignore abort errors
                setHsCodeList([]); // Clear the data list if there is no input
                setAutocompleteLoadingForHsCode(true);
                console.log(error)
                return;
            }
            console.error(error);
            console.log(error)
            setHsCodeList([]); // Clear the data list if an error occurs
            setHsLoaderOpen(false);
            setAutocompleteLoadingForHsCode(false);
        }

    }

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
                    display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


                }}
            >
                <DotLoader
                    size={45}
                    color={"#FF693A"}
                    // height={4}
                    loading={isLoading}
                />
            </div>
            }

            {/* <SideBar /> */}

            <div className="p-0 h-full sm:ml-72  bg-slate-100">
              <div>
                <DashboardRightHeader title="Add GTIN Products"
                />
              </div>

              <div className="flex flex-col justify-center items-center p-4">
                {" "}
                <div className="h-auto w-full p-5 bg-white">
                    <div className="">
                    <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
                        <div className="flex justify-start flex-col gap-2 text-xs sm:text-sm">
                        <p className="font-semibold">Complete Data</p>
                        <p>
                            This number is registered to company: :{" "}
                            <span className="font-semibold">{memberData?.company_name_eng}</span>
                            {/* <span className="font-semibold">Hasnain, Majid</span> */}
                        </p>
                        </div>
                    </div>
                    </div>

                    <form onSubmit={handleFormSubmit}>
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
            
                   <div className="">
                      <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mb-3">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="field1" className="text-secondary">Brand Name [English] </label>
                            <Autocomplete
                                id="field1"
                                options={brandNameEnglish}
                                getOptionLabel={(option) => option}
                                onChange={handleBrandNameEnglish}
                                value={selectedBrandNameEnglish}
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
                                    placeholder="Brand Name English"
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
                            <label htmlFor="field2" className="text-secondary">Brand Name [Arabic] </label>
                            <Autocomplete
                                id="field2"
                                options={brandNameArabic}
                                getOptionLabel={(option) => option}
                                onChange={handleBrandNameArabic}
                                value={selectedBrandNameArabic}
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
                                    placeholder="Brand Name Arabic"
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
                                <Autocomplete
                                    id="field10"
                                    required
                                    options={gpcList}
                                    getOptionLabel={(option) => (option && option?.value) ? option?.value : ''}
                                    onChange={handleGPCAutoCompleteChange}
                                    value={gpc}
                                    onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                                    loading={autocompleteLoading}
                                    // sx={{ marginTop: '10px' }}
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


                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                            <div className="sm:w-[48%] w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                <label htmlFor="field11" className="text-secondary">HS-Code</label>
                                {/* <input
                                type="text"
                                id="field11"
                                onChange={(e) => setHsCode(e.target.value)}
                                value={hsCode}
                                className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                                placeholder="HS-Code"
                                /> */}
                                  <Autocomplete
                                    id="serachGpc"
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


                       
                        {/* </div> */}
                        
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
                        <label htmlFor="field14" className="text-secondary">Product URL</label>
                            <input
                            type="text"
                            id="field14"
                            onChange={(e) => setProductUrl(e.target.value)}
                            value={productUrl}
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                            placeholder="Product URL"
                            />
                        </div>
                    </div>
                
                <div>
                {/* Image container */}
                   <div className='flex justify-between items-center gap-7 flex-wrap mt-10'>
                      <div>
                         <span className='text-secondary font-body sm:text-base text-sm'>Front Photo</span>
                           <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                              <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
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
                           <span className='text-secondary font-body sm:text-base text-sm'>Back Photo</span>
                             <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                               <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
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




                    </div>


                    {/* optional images code */}
                    <div className="flex justify-center">
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16 sm:mt-20 mt-24">
                            <div>
                                <span className='text-secondary font-body sm:text-base text-sm'>Optional Photo 1</span>
                                <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                                    <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
                                        <label htmlFor="imageOptional1Input" className="cursor-pointer whitespace-nowrap">
                                            Select Image
                                        <input
                                                type="file"
                                                id="imageOptional1Input"
                                                onChange={handleImageOptional1Change}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    {imageOptional1 && (
                                        <div className='h-56 flex justify-center items-center object-contain w-auto'>
                                            <img src={imageOptional1} className='h-56 w-56' alt="Selected Image" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className='text-secondary font-body sm:text-base text-sm'>Optional Photo 2</span>
                                <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                                    <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
                                        <label htmlFor="imageOptional2Input" className="cursor-pointer whitespace-nowrap">
                                            Select Image
                                        <input
                                                type="file"
                                                id="imageOptional2Input"
                                                onChange={handleImageOptional2Change}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    {imageOptional2 && (
                                        <div className='h-56 flex justify-center items-center object-contain w-auto'>
                                            <img src={imageOptional2} className='h-56 w-56' alt="Selected Image" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className='text-secondary font-body sm:text-base text-sm'>Optional Photo 3</span>
                                <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                                    <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary text-white font-body">
                                        <label htmlFor="imageOptional3Input" className="cursor-pointer whitespace-nowrap">
                                            Select Image
                                        <input
                                                type="file"
                                                id="imageOptional3Input"
                                                onChange={handleImageOptional3Change}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                    {imageOptional3 && (
                                        <div className='h-56 flex justify-center items-center object-contain w-auto'>
                                            <img src={imageOptional3} className='h-56 w-56' alt="Selected Image" />
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>


                  </div>

                    <div className='footer-line'></div>

                    <div className="popup-footer">
                        <button type='button' onClick={() => navigate(-1)} className="bg-secondary text-white py-2 px-3 rounded-sm">Back</button>
                        <button type='submit' className="bg-green-500 hover:bg-primary text-white py-2 px-3 rounded-sm" id="gtin-form">Add</button>
                    </div>
                </div>
            </form>


                    </div>
                </div>
            </div>
        </>
    )
}
export default GTINAddProducts;
