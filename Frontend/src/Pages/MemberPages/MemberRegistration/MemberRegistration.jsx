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
        // setSelectedOtherProducts(value);

        // const names = value.map((option) => option.product_name);
        // // Join the array elements into a single string
        // const joinedNames = names.join(', ');
        // console.log(joinedNames);
        // setSelectProducts(joinedNames);

        // // Check if the selected option is GLN (20 Locations), GLN (10 Locations), or GLN (30 Locations)
        const selectedGLN = value.find(
            (option) =>
                option.product_name === 'GLN ( 20 Locations)' ||
                option.product_name === 'GLN ( 10 Locations)' ||
                option.product_name === 'GLN (30 Locations)'
        );

        setSelectedGLNOption(selectedGLN);
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
                productType: selectedGtinNumber.type,
            }];
        }

        if (selectedOtherProducts.length) {
            newSelectedOtherProducts = selectedOtherProducts.map(product => ({
                ...product,
                price: selectedCategories?.name === "medical"
                    ? product.med_subscription_fee
                    : product.product_subscription_fee,
            }));
        }

        setSubscriptionData(newSubscriptionData);
        setSelectedOtherProducts(newSelectedOtherProducts);
    }, [selectedCategories, selectedGtinNumber, selectedOtherProducts]);


    // Calculate total price
    const totalPrice = subscriptionData.reduce((total, item) => total + item.price, 0) +
        selectedOtherProducts.reduce((total, item) => total + item.price, 0);

    // Image section
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const [errorMessage, setErrorMessage] = useState('');
    const handleDocUpload = (event) => {
        // setUpload(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            if (file.size <= 500 * 1024) {
                setUpload(file);
                setErrorMessage(''); // Clear any previous error message
            } else {
                setErrorMessage('File size should be 500KB or less');
                event.target.value = null;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();

        // User data
        formData.append('user_type', 'new');
        // formData.append('slug', 'user-slug');
        if (location) {
            formData.append('location_uk', location);
        }
        formData.append('have_cr', selectedCr ? 'yes' : 'no');

        // formData.append('document_number', 'doc-67890');
        // formData.append('fname', 'John');
        // formData.append('lname', 'Doe');
        formData.append('email', email);
        formData.append('mobile', mobileNumber);
        formData.append('country', selectedCountry?.name);
        formData.append('state', selectedState?.name);
        formData.append('city', selectedCity?.name);
        formData.append('zip_code', zipCode);
        formData.append('mbl_extension', extension);
        if (website) {
            formData.append('website', website);
        }
        // formData.append('no_of_staff', '50');
        // formData.append('district', 'Central');
        // formData.append('building_no', '12A');
        // formData.append('additional_number', '202');
        // formData.append('other_landline', '0987654321');
        // formData.append('unit_number', 'Unit 5');
        // formData.append('qr_corde', 'QRCode123');
        // formData.append('email_verified_at', '2023-03-15T00:00:00.000Z');
        // formData.append('verification_code', '123456');
        if (selectedCr?.cr && selectedCr?.activity) {
            formData.append('cr_number', selectedCr?.cr);
            formData.append('cr_activity', selectedCr?.activity);
            formData.append('cr_documentID', selectedCr?.crId || '0');

        }

        formData.append('company_name_eng', companyEnglish);
        formData.append('company_name_arabic', companyArabic);
        // formData.append('bussiness_activity', 'Trading');
        // formData.append('other_products', selectProducts);
        formData.append('image', selectedImage);
        formData.append('document', upload);
        // formData.append('product_addons', 'AddonABC');

        formData.append('contactPerson', contactPerson);
        formData.append('companyLandLine', companyLandLine);
        // formData.append('online_payment', 'Enabled');
        
        // formData.append('remember_token', 'TokenXYZ');
        // formData.append('parent_memberID', '100');
        formData.append('membership_category_id', selectedCategories.id)
        // formData.append('invoice_file', 'https://example.com/invoice.pdf');
        // formData.append('otp_status', '1');
        // formData.append('gcpGLNID', 'GLN123');
        // formData.append('gln', '123456');
        // formData.append('gcp_type', 'Type1');
        // formData.append('memberID', 'MID123');

        // formData.append('assign_to', '5');

        formData.append('membership_category', selectedCategories.name === 'non-medical' ? 'non_med_category' : 'med_category');
        if (selectedCategories.name !== 'non-medical') {
            formData.append('membership_otherCategory', selectedCategories.name);
        }
        // formData.append('upgradation_disc', '10');
        // formData.append('upgradation_disc_amount', '100.00');
        // formData.append('renewal_disc', '5');
        // formData.append('renewal_disc_amount', '50.00');
        // formData.append('activityID', selectedActivity?.id);
        formData.append('registration_type', 'New');
        // formData.append('industryTypes', JSON.stringify(selectedIndustries));
        selectedIndustries.forEach((item, index) => {
            formData.append(`industryTypes[${index}][id]`, item.id);
            formData.append(`industryTypes[${index}][name]`, item.name);
        });


        let currentIndex = 0;

        subscriptionData.forEach((item) => {
            formData.append(`cart[cart_items][${currentIndex}][productID]`, item.productId); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][productName]`, item.product); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][registration_fee]`, item.registrationFee); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][yearly_fee]`, item.yearlyFee); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][price]`, item.price); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][product_type]`, item.productType); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][quotation]`, item.quotation); // Adjust as per your actual property
            currentIndex++;
        });

        selectedOtherProducts.forEach((otherProduct) => {
            formData.append(`cart[cart_items][${currentIndex}][productID]`, otherProduct.id); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][productName]`, otherProduct.product_name); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][registration_fee]`, otherProduct.price); // Assuming 'price' is already calculated based on the selected category
            formData.append(`cart[cart_items][${currentIndex}][yearly_fee]`, otherProduct.yearly_fee || 0); // Adjust if there's a separate yearly fee
            formData.append(`cart[cart_items][${currentIndex}][price]`, otherProduct.price); // Using the calculated price
            formData.append(`cart[cart_items][${currentIndex}][product_type]`, otherProduct.product_type); // Adjust as per your actual property
            formData.append(`cart[cart_items][${currentIndex}][quotation]`, otherProduct.quotation); // Adjust as per your actual property
            currentIndex++;
        });

        formData.append('cart[total]', totalPrice);

        console.log(selectedOtherProducts)
        console.log(subscriptionData)
        newRequest
            .post("/users", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
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
        console.log("Value")
        console.log(value)
        setSelectedCategories(value);
        // Reset selectedGtinNumber when category changes
        setSelectedGtinNumber(null);
    };

    const handleGtinNumberChange = (event, value) => {

        setSelectedGtinNumber(value);
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
                <div className='h-auto sm:w-[85%] w-full border-l border-r border-primary'>
                    <div className='h-5 w-full bg-primary rounded-t-md'></div>
                    <div className='h-16 w-full flex justify-between items-center px-5'>
                        <p className='sm:text-2xl font-semibold text-sm text-secondary'>Member Registration</p>
                    </div>
                </div>

                <div className='h-auto sm:w-[85%] w-full p-6 shadow-xl border-l border-r border-primary'>
                    <form>
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
                            <div className='w-full sm:w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='email'>Email<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email'
                                    placeholder='Email'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='companyEnglish'>Company Name [English]<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setCompanyEnglish(e.target.value)}
                                    id='companyEnglish'
                                    placeholder='Company Name English'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='companyArabic'>Company Name [Arabic]<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setCompanyArabic(e.target.value)}
                                    id='companyArabic'
                                    placeholder='Company Name Arabic'
                                    type='text' className='border-2 border-[#e4e4e4] w-full text-right rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='contactperson'>Contact Person<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    id='contactperson'
                                    placeholder='Contact Person'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>

                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Company Landline<span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-2 border-[#e4e4e4] w-full rounded-sm '>
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
                                        onChange={(e) => setCompanyLandLine(e)}
                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Company Landline',
                                        }}

                                        inputStyle={{
                                            width: '100%',
                                            borderRadius: '0px',
                                            border: 'none'
                                        }}
                                    />

                                </div>
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Mobile Number <span>(Omit Zero)</span><span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-2 border-[#e4e4e4] w-full rounded-sm'>
                                    {/* <PhoneInput
                                        international
                                        country={'sa'}
                                        defaultCountry={'sa'}
                                        value={mobileNumber}
                                        onChange={setMobileNumber}
                                        containerStyle={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Mobile Number',
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
                                        value={mobileNumber}
                                        onChange={setMobileNumber}
                                        // onChange={(e) => setCompanyLandLine(e)}
                                        inputProps={{
                                            id: 'mobile',
                                            placeholder: 'Mobile Number',
                                        }}

                                        inputStyle={{
                                            width: '100%',
                                            borderRadius: '0px',
                                            border: 'none',
                                        }}
                                    />


                                </div>
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='extension'>Extension no.</label>
                                <input
                                    onChange={(e) => setExtension(e.target.value)}
                                    id='extension'
                                    placeholder='Extension no.'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>

                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='zipcode'>Zip Code<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={(e) => setZipCode(e.target.value)}
                                    id='zipcode'
                                    placeholder='Zip Code*'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='website'>Website</label>
                                <input
                                    onChange={(e) => setWebsite(e.target.value)}
                                    id='website'
                                    placeholder='Website'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


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
                                />
                            </div>

                        </div>



                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-3'>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='country'>Country<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="country"
                                    options={country}
                                    value={selectedCountry}
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


                            <div className='w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='city'>City<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="city"
                                    options={filteredCities}
                                    value={selectedCity}
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

                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-6'>
                            <div className='sm:w-[32.5%] w-full font-body sm:text-base text-sm flex flex-col'>
                                <label className='text-secondary font-semibold' htmlFor='category'>Membership category<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    id="category"
                                    options={categories}
                                    value={selectedCategories}
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

                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label className='text-secondary font-semibold' htmlFor='GTIN'>GTIN<span className='text-red-600'>*</span></label>
                                {/* <Autocomplete
                                    id="GTIN"
                                    options={gtinNumber}
                                    value={selectedGtinNumber}
                                    getOptionLabel={(option) => option?.member_category_description || ""}
                                    onChange={handleGtinNumber}
                                    onInputChange={(event, value) => {
                                        if (!value) {
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
                                            placeholder="GTIN"
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
                                /> */}
                                {/* {selectedCategories ? ( // Render GTIN Autocomplete only if a category is selected */}
                                <Autocomplete
                                    id='GTIN'
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
                                    classes={{
                                        endAdornment: 'text-white',
                                    }}
                                    sx={{
                                        '& .MuiAutocomplete-endAdornment': {
                                            color: 'white',
                                        },
                                    }}
                                />
                                {/* // ) : (
                                //     // You can add any placeholder or message when no category is selected
                                //     <p>Please select a Membership category to enable GTIN selection.</p>
                                // )} */}
                            </div>


                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label className='text-secondary font-semibold' htmlFor='other'>Other Products<span className='font-normal'> (GLN,SSCC,UDI)</span></label>
                                <Autocomplete
                                    multiple
                                    id='other'
                                    options={otherProductsOptions}
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

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-start mt-6'>
                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='upload'>Upload Company Documents<span className='text-red-600'>*</span></label>
                                <input
                                    onChange={handleDocUpload}
                                    id='upload'
                                    accept=".pdf,.doc,.docx"
                                    placeholder='Upload Company Documents'
                                    type='file' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label classNa me='text-secondary font-semibold' htmlFor='uploadNational'>Upload National Address <span className='font-normal'> (QR Code photo)</span><span className='text-red-600 font-normal'>*</span></label>
                                <input
                                    onChange={handleImageChange}
                                    accept="image/*"

                                    // onChange={(e) => setUploadNationalAddress(e.target.value)}
                                    id='uploadNational'
                                    type='file' className='border-2 border-[#e4e4e4] w-full text-right rounded-sm p-2 mb-3' />
                            </div>
                        </div>
                        {errorMessage && (
                            <p className='text-red-600'>{errorMessage}</p>
                        )}


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
                                            {selectedOtherProducts.map((item, index) => (
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
                            <div className='w-full sm:w-[15%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        // onChange={(e) => setLocationArabic(e.target.value)}
                                        id='radio'
                                        placeholder='radio'
                                        defaultChecked
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold'>Bank Transfer</p>
                                </div>

                            </div>
                        </div>

                        <button onClick={handleSubmit} type='button' className="sm:w-[30%] w-full rounded bg-primary hover:bg-secondary font-sans px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200">
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