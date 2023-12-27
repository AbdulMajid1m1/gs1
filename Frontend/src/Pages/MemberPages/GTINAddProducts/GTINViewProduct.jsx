import React, { useContext, useEffect, useState } from "react";
import "./GTINAddProducts.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver';
import DashboardRightHeader from "../../../components/DashboardRightHeader/DashboardRightHeader";
import newRequest from "../../../utils/userRequest";
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';

const GTINViewProduct = () => {
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
  const [region, setRegion] = useState([
      'Asia',
      'Europe',
  ]);
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
  let { productId } = useParams();


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
 
  useEffect(() => {
    setIsLoading(true);
    const fetchProductDetails = async () => {
      try {
        const response = await newRequest.get(`/products?id=${productId}`);
        console.log(response.data[0]);

        const productData = response.data[0];
        setProductNameEnglish(productData?.productnameenglish);
        setProductNameArabic(productData?.productnamearabic);
        setSelectedBrandNameEnglish(productData?.BrandName);
        setSelectedBrandNameArabic(productData?.BrandNameAr);
        setSelectedProductType(productData?.ProductType);
        setSelectedRegion(productData?.Origin);
        setSelectedPackageType(productData?.PackagingType);
        setSelectedUnitCode(productData?.unit);
        setSize(productData?.size);
        setSelectedCountry(productData?.countrySale);
        setGpcCode(productData?.gpc_code);
        setDescriptionEnglish(productData?.details_page);
        setDescriptionArabic(productData?.details_page_ar); // Assuming HsDescriptionAr is present in your API response
        setProductUrl(productData?.product_url);
        setSelectedDigitalInformationType(productData?.digitalInfoType);
        setSelectedProductDescription(productData?.prod_lang);
        setGpc(productData?.gpc);
        setHsCode(productData?.HSCODES);
        // setSelectedImage(productData?.front_image);
        // setSelectedBackImage(productData?.back_image);
        // setImageOptional1(productData?.image_1);
        // setImageOptional2(productData?.image_2);
        // setImageOptional3(productData?.image_3);

        // Construct live URLs for images
        setSelectedImage(imageLiveUrl(productData?.front_image));
        setSelectedBackImage(imageLiveUrl(productData?.back_image));
        setImageOptional1(imageLiveUrl(productData?.image_1));
        setImageOptional2(imageLiveUrl(productData?.image_2));
        setImageOptional3(imageLiveUrl(productData?.image_3));


        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);

      }
    };
    fetchProductDetails();
  }, [productId]);


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

  const handleGPCAutoCompleteChange = (event, value) => {
    console.log(value);
    setGpc(value);
    setGpcCode(value);
  }

  const handleHsCodeAutoCompleteChange = (event, value) => {
    console.log(value);
    setHsCode(value);


  }



const handleDigitalInformationType = (event, value) => {
    console.log(value);
    setSelectedDigitalInformationType(value);
};

 const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        // console.log(reason)
    }

  const handleHsCodeAutoCompleteInputChange = async (event, newInputValue, reason) => {
        // console.log(reason)
    }



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
          <div className="p-0 h-full sm:ml-72  bg-slate-100">
              <div>
                <DashboardRightHeader title="Update GTIN Products"
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
                            {/* <span className="font-semibold">{memberData?.company_name_eng}</span> */}
                            {/* <span className="font-semibold">Hasnain, Majid</span> */}
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* <form onSubmit={handleFormSubmit}> */}
                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor="fields1" className="text-secondary">Product Name [English]</label>
                            <input
                            type="text"
                            id="fields1"
                            disabled={true}
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
                            disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                            disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
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
                                        disabled={true}
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
                                        disabled={true}
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
                                                disabled={true}
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
                                                disabled={true}
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
                                                disabled={true}
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

                    {/* <div className="popup-footer">
                        <button type='button' onClick={() => navigate(-1)} className="bg-secondary text-white py-2 px-3 rounded-sm">Back</button>
                        <button type='submit' className="bg-green-500 hover:bg-primary text-white py-2 px-3 rounded-sm" id="gtin-form">Add</button>
                    </div> */}
                </div>
            {/* </form> */}


                    </div>
                </div>
            </div>
    </>
  );
};
export default GTINViewProduct;