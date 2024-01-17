import React, { useEffect, useState } from 'react'
// import PhoneInput from 'react-phone-number-input';
// import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Autocomplete, Button, TextField } from '@mui/material';
import newRequest from '../../../utils/userRequest';
import './MemberRegistration.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { DotLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import barcodeImage from "../../../Images/barcodeImage.png"


const MemmberRegisteration = () => {
    // const sessionData = sessionStorage.getItem('saveCrNumberData');
    const selectedCr = JSON.parse(sessionStorage.getItem('selectedCr'));

    const sesstionDocumentData = sessionStorage.getItem('saveDocumentData');
    const location = sessionStorage.getItem('location');
    const navigate = useNavigate();
    // console.log("Get the Cr Number", sessionData);
    // console.log("Get the Document Data", sesstionDocumentData);
    const [country, setCountry] = React.useState([])
    const [state, setState] = React.useState([])
    const [city, setCity] = useState([]);
    const [gtinNumber, setGtinNumber] = useState('')
    const [companyLandLine, setCompanyLandLine] = React.useState('')
    const [mobileNumber, setMobileNumber] = React.useState('')
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedGtinNumber, setSelectedGtinNumber] = useState("");
    // const [selectedActivity, setSelectedActivity] = React.useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('')
    const [companyEnglish, setCompanyEnglish] = useState('')
    const [companyArabic, setCompanyArabic] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [extension, setExtension] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [website, setWebsite] = useState('')
    const [upload, setUpload] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);


    // multple select 
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [industryTypes, setIndustryTypes] = useState([]);
    const [selectedOtherProducts, setSelectedOtherProducts] = useState([]);
    const [otherProductsOptions, setOtherProductsOptions] = useState([]);
    const [selectedGLNOption, setSelectedGLNOption] = useState(null);
    // const [selectProducts, setSelectProducts] = useState('');

    const [categories, setCategories] = useState([]);
    const [addCrNumber, setAddCrNumber] = useState("");
    const [crActivity, setCrActivity] = useState("");
    const [error, setError] = useState("");
    const [companyLandlineError, setCompanyLandlineError] = useState("");
    const [mobileError, setMobileError] = useState("");


    useEffect(() => {

        // Search GPC Api
        const fetchIndustryTypes = async () => {
            try {
                const response = await newRequest.get('/productTypes');
                // only get name and id from the response
                const data = response.data;
                const industryTypes = data.map((industryType) => ({
                    id: industryType.id,
                    name: industryType.name,
                }));
                setIndustryTypes(industryTypes);
            }
            catch (error) {
                console.error('Error fetching on Search GPC Api:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await newRequest.get('/productCategories');
                // only get name and id from the response
                const data = response.data;
                const categories = data.map((category) => ({
                    id: category.id,
                    name: category.name,
                }));
                setCategories(categories);
            }
            catch (error) {
                console.error('Error fetching on product Categories Api:', error);
            }
        };



        // Other Products Api (GLN, SSCC, UDI)
        const handleOtherProductsData = async () => {
            try {
                const response = await newRequest.get('/otherProducts');
                setOtherProductsOptions(response.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        // all Countries Api
        const handleCountryAndState = async () => {
            try {
                const response = await newRequest.get('/address/getAllCountries');
                const statesData = await newRequest.get(`/address/getAllStates`);
                const getStatesdata = statesData.data;
                const data = response.data;

                const countries = data.map((country) => ({
                    id: country.id,
                    name: country.name_en,
                }));

                setCountry(countries);
                setState(getStatesdata);
                // setCountry(countries);
                const defaultCountry = countries.find(country => country.name == 'Saudi Arabia');
                setSelectedCountry(defaultCountry);
                const filteredStates = getStatesdata.filter((state) => state.country_id == defaultCountry?.id);
                setFilteredStates(filteredStates);


            }
            catch (error) {
                console.error('Error fetching data:', error);
            }


        }


        const handleGetAllCities = async () => {
            try {
                const response = await newRequest.get(`/address/getAllCities`);
                const data = response.data;
                setCity(data);
            }
            catch (error) {
                console.error('Error fetching states:', error);
            }
        }


        // handleGetAllActivities();
        fetchIndustryTypes();
        fetchCategories()
        // handleGetAllCountries();
        // handleGetAllStates();
        handleCountryAndState();
        handleGetAllCities();
        handleOtherProductsData();

    }, []);



    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    // Handle country selection
    const handleCountryName = (event, value) => {
        setSelectedCountry(value);
        console.log(value)
        const filteredStates = state.filter((state) => state.country_id == value?.id);
        setFilteredStates(filteredStates);
        setSelectedState(null);
        setFilteredCities([]);
        setSelectedCity(null);
        console.log(filteredStates)
    };

    // Handle state selection
    const handleState = (event, value) => {
        setSelectedState(value);
        const filteredCities = city.filter((city) => city.state_id == value?.id);
        setFilteredCities(filteredCities);
        setSelectedCity(null);
    };


    const handleCity = (event, value) => {
        setSelectedCity(value);
        console.log('Selected State ID:', value.id);
    };



    const handleIndustryTypeChange = (event, value) => {
        setSelectedIndustries(value);
        console.log(value);
    };


    const handleOtherProductsChange = (event, value) => {

        // Check if the selected option is GLN (20 Locations), GLN (10 Locations), or GLN (30 Locations)
        const selectedGLN = value.find(
            (option) =>
                option.product_name === 'GLN (30 Locations)' ||
                option.product_name === 'GLN (10 Location)' ||
                option.product_name === 'GLN (20 Locations)'
        );

        setSelectedGLNOption(selectedGLN);
        console.log(value);
        setSelectedOtherProducts(value);

    };

    const getOptionDisabled = (option) => {
        return (
            selectedGLNOption &&
            option.product_name.startsWith('GLN') &&
            option.product_name !== selectedGLNOption.product_name
        );
    };


    const [subscriptionData, setSubscriptionData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [otherSubscriptionData, setOtherSubscriptionData] = useState([]);
    useEffect(() => {
        let newSubscriptionData = [];
        let newSelectedOtherProducts = [];

        if (selectedGtinNumber) {
            // console.log(selectedGtinNumber)
            const registrationFee = selectedCategories?.name === "medical"
                ? selectedGtinNumber.med_registration_fee
                : selectedGtinNumber.member_registration_fee;

            const yearlyFee = selectedGtinNumber.gtin_yearly_subscription_fee || 0; // Assuming this value is constant

            newSubscriptionData = [{
                product: selectedGtinNumber.member_category_description,
                registrationFee: registrationFee || 0,
                yearlyFee: yearlyFee,
                price: registrationFee + yearlyFee,
                productId: selectedGtinNumber.id,
                product_type: 'gtin',
            }];
        }

        if (selectedOtherProducts.length) {
            console.log(selectedOtherProducts)
            newSelectedOtherProducts = selectedOtherProducts.map(product => ({
                ...product,
                price: selectedCategories?.name === "medical"
                    ? product.med_subscription_fee
                    : product.product_subscription_fee,
                registrationFee: selectedCategories?.name === "medical"
                    ? product.med_subscription_fee
                    : product.product_subscription_fee,
                product_type: 'other_products',
            }));
        }
        console.log(newSubscriptionData)
        console.log(newSelectedOtherProducts)
        setSubscriptionData(newSubscriptionData);
        // Calculate total price
        const newTotalPrice = newSubscriptionData.reduce((total, item) => total + item.price, 0) +
            newSelectedOtherProducts.reduce((total, item) => total + item.price, 0);
        setOtherSubscriptionData(newSelectedOtherProducts);
        setTotalPrice(newTotalPrice);
    }, [selectedCategories, selectedGtinNumber, selectedOtherProducts]);


    // Calculate total price
    // const totalPrice = subscriptionData.reduce((total, item) => total + item.price, 0) +
    //     selectedOtherProducts.reduce((total, item) => total + item.price, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log(subscriptionData)
        console.log(selectedOtherProducts)

        let cart_items = []
        // add subscription data to cart_items and then add other products to cart_items
        console.log(subscriptionData)
        subscriptionData.forEach((item) => {
            cart_items.push({
                "productID": item.productId,
                "productName": item.product,
                "registration_fee": item.registrationFee.toString(), // Convert to string
                "yearly_fee": item.yearlyFee.toString(), // Convert to string
                "price": item.price.toString(), // Convert to string
                "product_type": item.product_type,
            })

        });
        console.log(otherSubscriptionData)

        otherSubscriptionData?.forEach((otherProduct) => {
            cart_items.push({
                "productID": otherProduct.id,
                "productName": otherProduct.product_name,
                "registration_fee": "0",
                "yearly_fee": otherProduct?.price?.toString(), // Convert to string
                "price": otherProduct?.price?.toString(), // Convert to string
                "product_type": otherProduct.product_type,
            })
        });






        const requestBody = {
            "cr_number": addCrNumber,
            "cr_activity": crActivity,
            "email": email,
            "contactPerson": contactPerson,
            "company_name_eng": companyEnglish,
            "company_name_arabic": companyArabic,
            "companyLandLine": companyLandLine,
            "mobile": mobileNumber,
            "zip_code": zipCode,
            "industryTypes": selectedIndustries.map(item => ({ id: item.id, name: item.name })),
            "country": selectedCountry?.name,
            "state": selectedState?.name,
            "city": selectedCity?.name,
            "membership_category": selectedCategories.name === 'non-medical' ? 'non_med_category' : 'med_category',
            "other_products": selectedOtherProducts.map(product => product.product_name).join(', '),


            "cart": {
                "cart_items": cart_items,
            },
            //   "total": totalPrice,

            //   "request_type": "New Membership",
            //   "payment_type": "Credit Card",  // You may need to replace this with your actual payment type
            //   "receipt": "Receipt123",
            //   "receipt_path": "/receipts/receipt123.pdf",
            //   "admin_id": 1,
            //   "assign_to": null,
            //   "discount": 50
        };




        newRequest
            // .post("/users", formData, {
            .post("/users", requestBody)
            .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setTimeout(() => {
                    navigate('/');
                }, 1500);

                toast.success('Member Registered Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });



            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);

                toast.error(err?.response?.data?.error || "Something went wrong!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            });
    };




    const handleCategoryChange = (event, value) => {
        console.log(value)
        setSelectedCategories(value);
        // Reset selectedGtinNumber when category changes
        // check if user cancelled the selection then reset the selectedGtinNumber as well as other products
        if (!value) {
            setSelectedGtinNumber(null);
            setSelectedOtherProducts([]);
        }
    };

    const handleGtinNumberChange = (event, value) => {

        setSelectedGtinNumber(value);
        if (!value) {
            setSelectedOtherProducts([]);
        }
    };



    const handlecompanyLandLine = (value) => {
        // Reset error message
        setCompanyLandlineError('');

        // Check if the country code is for Saudi Arabia
        if (value.startsWith('966')) {
            // Check for mobile number (should start with '9665')
            // if (value.length > 1 && value[3] !== '5') {
            //     setCompanyLandlineError('Mobile number must start with 9665');
            // }

            // Check for maximum length (12 digits including country code)
            if (value.length > 12) {
                setCompanyLandlineError('Number must be a maximum of 12 digits');
            }
        }

        // Set the mobile number
        setCompanyLandLine(value);
    };

    const handleMobileNumber = (value) => {
        // Reset error message
        setMobileError('');

        // Check if the country code is for Saudi Arabia
        if (value.startsWith('966')) {
            // Check for mobile number (should start with '9665')
            if (value.length > 1 && value[3] !== '5') {
                setMobileError('Mobile number must start with 9665');
            }

            // Check for maximum length (12 digits including country code)
            if (value.length > 12) {
                setMobileError('Number must be a maximum of 12 digits');
            }
        }

        // Set the mobile number
        setMobileNumber(value);
    };



    useEffect(() => {
        const handleGtinNumber = async () => {
            try {
                // const response = await newRequest.get(`/gtinProducts?category=${selectedCategories}`);
                const response = await newRequest.get(`/gtinProducts`);
                setGtinNumber(response.data);
            } catch (error) {
                console.error('Error fetching GTIN products:', error);
            }
        };


        // Set initial value of gtinNumber to an empty array
        setGtinNumber([]);

        handleGtinNumber();
    }, [selectedCategories]);


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 10) {
            setError("Cr Number should be 10 digits");
        } else {
            setError("");
        }
        setAddCrNumber(inputValue.slice(0, 10));  // Limit input to 10 characters
    };

    // console.log("company", companyLandLine)

    return (
        <div>
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

            <div className='sticky top-0 z-50 bg-white'>
                {/* Headers */}
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className='h-auto w-full sm:w-2/3 border-l border-r border-primary'>
                    <div className='h-5 w-full bg-primary rounded-t-md'></div>
                    <div className='h-auto w-full flex justify-between items-center px-5 py-2'>
                        <p className='sm:text-2xl w-full font-semibold text-sm text-secondary'>Member Registration</p>
                        {/* <p className='w-full text-right font-semibold text-sm text-secondary'>{selectedCr?.activity} - {selectedCr?.cr}</p> */}
                    </div>
                </div>

                <div className='h-auto w-full sm:w-2/3 p-6 shadow-xl border-l border-r border-b border-primary'>
                    <form onSubmit={handleSubmit}>
                        {/* <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                            <label className='text-secondary font-semibold' htmlFor='activty'>CR Activities<span className='text-red-600'>*</span></label>
                            <Autocomplete
                                id="activty"
                                // options={getAllActivities}
                                options={getAllActivities}
                                value={selectedActivity}
                                getOptionLabel={(option) => option?.activity || ""}
                                onChange={handleSelectedActivityData}
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
                                        className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                        placeholder="CR Activities"
                                    // required
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
                    </div> */}

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-6'>
                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field1" className="text-secondary font-semibold">Cr Number<span className='text-red-600'> *</span></label>
                                <input
                                    type="number"
                                    id="field1"
                                    value={addCrNumber}
                                    onChange={handleInputChange}
                                    //    onChange={(e) => setAddCrNumber(e.target.value)}
                                    placeholder="Cr Number"
                                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                <label htmlFor="field2" className="text-secondary font-semibold">Cr Activity<span className='text-red-600'> *</span></label>
                                <input
                                    type="text"
                                    id="field2"
                                    //  value={addCrNumber}
                                    onChange={(e) => setCrActivity(e.target.value)}
                                    placeholder="Cr Activity"
                                    className="border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full sm:w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='email'>Email<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    placeholder='Email'
                                    required
                                    type='text' className='border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='contactperson'>Contact Person<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    id='contactperson'
                                    placeholder='Contact Person'
                                    required
                                    type='text' className='border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3' />
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='companyEnglish'>Company Name [English]<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setCompanyEnglish(e.target.value)}
                                    id='companyEnglish'
                                    placeholder='Company Name English'
                                    required
                                    type='text' className='border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='companyArabic'>Company Name [Arabic]<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setCompanyArabic(e.target.value)}
                                    id='companyArabic'
                                    placeholder='Company Name Arabic'
                                    required
                                    type='text' className='border-1 border-[#8E9CAB] w-full text-right rounded-sm p-2 mb-3' />
                            </div>

                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Company Landline</label>
                                <div className='flex items-center border-[1px] border-[#8E9CAB] w-full rounded-sm '>
                                    {/* <PhoneInput
                                        international
                                        defaultCountry="SA"
                                        value={companyLandLine}
                                        onChange={setCompanyLandLine}
                                        containerStyle={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Company Landline',
                                        }}
                                        style={{
                                            width: '100%',
                                            border: '#e4e4e4',
                                            borderRadius: '8px',
                                            padding: '2px',
                                            marginBottom: '3px',
                                        }}
                                    /> */}
                                    <PhoneInput
                                        international
                                        country={'sa'}
                                        defaultCountry={'sa'}
                                        value={companyLandLine}
                                        // onChange={setCompanyLandLine}
                                        onChange={handlecompanyLandLine}
                                        inputProps={{
                                            id: 'landline',
                                            placeholder: 'Company Landline',
                                        }}

                                        inputStyle={{
                                            width: '100%',
                                            borderRadius: '0px',
                                            border: 'none'
                                        }}
                                    // required
                                    />
                                </div>
                                {companyLandlineError && <p className="text-red-600">{companyLandlineError}</p>}
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Mobile Number <span>(Omit Zero)</span><span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-[1px] border-[#8E9CAB] w-full rounded-sm'>

                                    <PhoneInput
                                        international
                                        country={'sa'}
                                        defaultCountry={'sa'}
                                        value={mobileNumber}
                                        onChange={handleMobileNumber}

                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Mobile Number',
                                        }}

                                        inputStyle={{
                                            width: '100%',
                                            borderRadius: '0px',
                                            border: 'none',
                                        }}
                                        required
                                    />


                                </div>
                                {mobileError && <p className="text-red-600">{mobileError}</p>}
                            </div>

                            {/* <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='extension'>Extension no.</label>
                                <input
                                    onChange={(e) => setExtension(e.target.value)}
                                    id='extension'
                                    placeholder='Extension no.'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div> */}

                        </div>



                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='country'>Country<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="country"
                                    options={country}
                                    value={selectedCountry}
                                    required
                                    getOptionLabel={(option) => option?.name || ""}
                                    onChange={handleCountryName}
                                    onInputChange={(event, value) => {
                                        if (!value) {
                                            // perform operation when input is cleared
                                            console.log("Input cleared");
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            autoComplete="off"
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                className: "text-white",
                                            }}
                                            InputLabelProps={{
                                                ...params.InputLabelProps,
                                                style: { color: "white" },
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="Country"
                                        // required
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


                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='state'>State<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="state"
                                    options={filteredStates}
                                    value={selectedState}
                                    required
                                    getOptionLabel={(option) => option?.name || ""}
                                    onChange={handleState}
                                    onInputChange={(event, value) => {
                                        if (!value) {
                                            // perform operation when input is cleared
                                            console.log("Input cleared");
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            autoComplete="off"
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                className: "text-white",
                                            }}
                                            InputLabelProps={{
                                                ...params.InputLabelProps,
                                                style: { color: "white" },
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="State"
                                        // required
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


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-6'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='city'>City<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="city"
                                    options={filteredCities}
                                    value={selectedCity}
                                    required
                                    getOptionLabel={(option) => option?.name || ""}
                                    onChange={handleCity}
                                    onInputChange={(event, value) => {
                                        if (!value) {
                                            // perform operation when input is cleared
                                            console.log("Input cleared");
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            autoComplete="off"
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                className: "text-white",
                                            }}
                                            InputLabelProps={{
                                                ...params.InputLabelProps,
                                                style: { color: "white" },
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="City"
                                        // required
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


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='zipcode'>Zip Code</label>
                                <input
                                    onChange={(e) => setZipCode(e.target.value)}
                                    id='zipcode'
                                    placeholder='Zip Code*'
                                    // required
                                    type='text' className='border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3' />
                            </div>


                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-6'>



                            {/* <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='website'>Website</label>
                                <input
                                    onChange={(e) => setWebsite(e.target.value)}
                                    id='website'
                                    placeholder='Website'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div> */}


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='industriesTypes'>Select Industries Releated to your Business<span className='text-red-600'>*</span></label>
                                <Autocomplete

                                    multiple
                                    id='industriesTypes'
                                    options={industryTypes}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedIndustries}
                                    onChange={handleIndustryTypeChange}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField


                                            autoComplete="off"
                                            {...params}
                                            label='Select matching industries'
                                            placeholder='select industries types'
                                            variant='outlined'
                                        />
                                    )}
                                    required
                                />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col mt-0'>
                                <label className='text-secondary font-semibold' htmlFor='category'>Membership category<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="category"
                                    options={categories}
                                    value={selectedCategories}
                                    required
                                    getOptionLabel={(option) => option.name || ""}
                                    onChange={handleCategoryChange}
                                    onInputChange={(event, value) => {
                                        if (!value) {
                                            // perform operation when input is cleared
                                            console.log("Input cleared");
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            autoComplete="off"
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                className: "text-white",
                                            }}
                                            InputLabelProps={{
                                                ...params.InputLabelProps,
                                                style: { color: "white" },
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                            placeholder="medical/Non-medical"
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


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-3'>
                                <label
                                    className='flex justify-start items-center text-secondary font-semibold -mt-5' htmlFor='GTIN'
                                >GTIN
                                    <span className='text-red-600'>*</span>
                                    (Barcode)
                                    <img src={barcodeImage} className='h-10 w-auto' alt='' />
                                </label>

                                <Autocomplete
                                    id='GTIN'
                                    disabled={!selectedCategories}
                                    // options={gtinNumber}
                                    options={selectedCategories ? gtinNumber : []}
                                    value={selectedGtinNumber}
                                    getOptionLabel={(option) => option?.member_category_description || ''}
                                    onChange={handleGtinNumberChange}
                                    onInputChange={(event, value) => {
                                        if (!value) {
                                            console.log('Input cleared');
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            autoComplete="off"

                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                className: 'text-white',
                                            }}
                                            InputLabelProps={{
                                                ...params.InputLabelProps,
                                                style: { color: 'white' },
                                            }}
                                            className='bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full'
                                            placeholder='GTIN'
                                        />
                                    )}
                                    required
                                    classes={{
                                        endAdornment: 'text-white',
                                    }}
                                    sx={{
                                        '& .MuiAutocomplete-endAdornment': {
                                            color: 'white',
                                        },
                                    }}
                                />

                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-1'>
                                <label className='text-secondary font-semibold' htmlFor='other'>Other Products<span className='font-normal'> (GLN,SSCC,UDI)</span></label>
                                <Autocomplete
                                    multiple
                                    id='other'
                                    disabled={!selectedGtinNumber || selectedGtinNumber.length === 0}
                                    options={otherProductsOptions}
                                    required
                                    getOptionLabel={(option) => option.product_name}
                                    value={selectedOtherProducts}
                                    onChange={handleOtherProductsChange}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            autoComplete="off"
                                            {...params}
                                            label='Search Other Products'
                                            placeholder='Search Other Products'
                                            variant='outlined'
                                        />
                                    )}
                                    getOptionDisabled={getOptionDisabled}
                                />

                            </div>

                        </div>


                        <div>
                            <div className='mt-6'>
                                <label className='text-secondary text-3xl font-sans font-bold'>Your Subscription</label>
                                <div className="table-Bintobin-Axapta px-4">
                                    <p className='text-secondary text-2xl font-sans font-bold text-center mb-4 mt-4'>Subscription Summary</p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>PRODUCT</th>
                                                <th>REGISTRATION FEE</th>
                                                <th>YEARLY FEE</th>
                                                <th>PRICE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscriptionData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.product}</td>
                                                    <td>{item.registrationFee}</td>
                                                    <td>{item.yearlyFee}</td>
                                                    <td>{item.price}</td>
                                                </tr>
                                            ))}
                                            {otherSubscriptionData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.product_name}</td>
                                                    <td>0</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.price}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3" className="text-right font-bold">Total:</td>

                                                <td>
                                                    {totalPrice}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* add one radio button */}
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>
                            <div className='w-full sm:w-[18%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        defaultChecked
                                        type='radio' className='border-1 border-[#8E9CAB] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold'>Bank Transfer</p>
                                </div>

                            </div>
                        </div>

                        <button type='submit' className="sm:w-[30%] w-full rounded bg-primary hover:bg-secondary font-sans px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200">
                            <i className="fas fa-check-circle mr-1"></i> Submit
                        </button>

                    </form>

                </div>
                {/* </div> */}
            </div >


            {/* Footer */}
            <div div className='mt-6' >
                <Footer />
            </div >
            {/* End Footer */}
        </div >
    )
}

export default MemmberRegisteration