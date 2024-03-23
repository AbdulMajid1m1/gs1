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
import { useTranslation } from 'react-i18next';
import CompanyNamePopUp from './CompanyNamePopUp';
import CompanyArabicPopUp from './CompanyArabicPopUp';
import CrActivityPopUp from './CrActivityPopUp';
import CrNumberPopUp from './CrNumberPopUp';
import TermsAndCondition from './TermsAndCondition';
import { useLanguage } from '../../../Contexts/LanguageContext';
const MemmberRegisteration = () => {
  // const sessionData = sessionStorage.getItem('saveCrNumberData');
  const selectedCr = JSON.parse(sessionStorage.getItem('selectedCr'));
  const { t, i18n } = useTranslation();
  const { selectedLanguage } = useLanguage();
  const sesstionDocumentData = sessionStorage.getItem('saveDocumentData');
  const location = sessionStorage.getItem('location');
  const navigate = useNavigate();
  // console.log("Get the Cr Number", sessionData);
  // console.log("Get the Document Data", sesstionDocumentData);
  const [country, setCountry] = React.useState([])
  const [state, setState] = React.useState([])
  const [city, setCity] = useState([]);
  const [gtinNumber, setGtinNumber] = useState([])
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


  const fetchCategories = async () => {
    try {
      const response = await newRequest.get('/productCategories');
      // only get name and id from the response
      const data = response.data;
      const categories = data.map((category) => ({
        id: category.id,
        name: category.name,
        namesa: i18n.language === "ar" ? category.name_ar : category.name,

      }));

      setCategories(categories);
      handleOptionChange(categories);
      console.log("datadata", data);
    }
    catch (error) {
      console.error('Error fetching on product Categories Api:', error);
    }
  };

  // Search GPC Api
  const fetchIndustryTypes = async () => {
    try {
      const response = await newRequest.get('/productTypes');
      // only get name and id from the response
      const data = response.data;
      console.log('aaaaaa',data);
      const industryTypes = data.map((industryType) => ({
        id: industryType.id,
        name: industryType.name,
        name_ar_en: i18n.language === "ar" ? industryType.name_ar : industryType.name,
      }));
      setIndustryTypes(industryTypes);
    }
    catch (error) {
      console.error('Error fetching on Search GPC Api:', error);
    }
  };

  // Other Products Api (GLN, SSCC, UDI)
  const handleOtherProductsData = async () => {
    try {
      const response = await newRequest.get('/otherProducts');
      setOtherProductsOptions(response.data);
      console.log("response.data", response.data);
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
        //   name: country.name_en,
        name: i18n.language === "ar" ? country.name_ar : country.name_en,
      }));

      const states = getStatesdata.map((state) => ({
        id: state.id,
        name: i18n.language === "ar" ? state.name_ar : state.name,
        country_id: state.country_id,
      }));

      setCountry(countries);
      setState(states);
      // setCountry(countries);
      const defaultCountry = countries.find(country => country.name == 'Saudi Arabia');
      setSelectedCountry(defaultCountry);
      const filteredStates = states.filter((state) => state.country_id == defaultCountry?.id);
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
      //   setCity(data);

      const Citydata = data.map((city) => ({
        id: city.id,
        name_ar: i18n.language === "ar" ? city.name_ar : city.name,
        name: city.name,
        state_id: city.state_id,
      }));

      console.log("Citydata", Citydata);
      //  console.log("Citydata", data);
      setCity(Citydata);

    }
    catch (error) {
      console.error('Error fetching states:', error);
    }
  }



  const selectedBusinessType = JSON.parse(sessionStorage.getItem('selectedBusinessType'));

  // Function to handle option selection
  const handleOptionChange = (categories) => {
    // setEntityType(newValue);
    console.log(selectedBusinessType.value)
    if (selectedBusinessType.value === 'individual/family business') {
      const nonMedicalCategory = categories.find(category => category.name === 'non-medical');
      setSelectedCategories(nonMedicalCategory);
      // Assuming 'Category 10' is a specific GTIN number or represents a condition to pre-fill the GTIN field
      const category10Gtin = gtinNumber.find(gtin => gtin.total_no_of_barcodes === 10);
      setSelectedGtinNumber(category10Gtin);
      setSelectedOtherProducts([]); // Disabling the selection for OTHER PRODUCTS
    } else {
      setSelectedCategories(null);
      setSelectedGtinNumber(null);
    }
  };



  useEffect(() => {
    fetchIndustryTypes();
    fetchCategories()

    handleCountryAndState();
    handleGetAllCities();
    handleOtherProductsData();

  }, [i18n.language]);



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

    // Check if the selected option is GLN (20 Locations), GLN (10 Location), or GLN (30 Locations)
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
    console.log(subscriptionData)
    if (subscriptionData.length === 0) {
      toast.error(`${t('Please select a GTIN Product')}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      return;
    }

    /// if gtin proudct slected is having id 1 then user should select at least one other product

    if (subscriptionData[0].productId === '1' && otherSubscriptionData.length === 0) {
      toast.error(`${t('Please select at least one other product')}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      return;
    }

    setIsLoading(true);

    console.log(subscriptionData)
    console.log(selectedOtherProducts)

    let cart_items = []
    // add subscription data to cart_items and then add other products to cart_items

    subscriptionData.forEach((item) => {
      cart_items.push({
        "productID": item.productId,
        "productName": item.product,
        "registration_fee": item.registrationFee.toString(), // Convert to string
        "yearly_fee": item.yearlyFee.toString(), // Convert to string
        "price": item.price.toString(),
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

    // if entity selected is organization then make cr number and cr activity required

    if (selectedBusinessType?.value === 'organization') {
      if (!addCrNumber) {
        setIsLoading(false);
        toast.error(`${t('Please enter Cr Number')}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        return;
      }
      if (!crActivity) {
        setIsLoading(false);
        toast.error(`${t('Please enter Cr Activity')}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        return;
      }
    }

    const requestBody = {
      ...(addCrNumber && { "cr_number": addCrNumber }),
      ...(crActivity && { "cr_activity": crActivity }),
      "email": email,
      "contactPerson": contactPerson,
      "company_name_eng": companyEnglish,
      "company_name_arabic": companyArabic,
      ...(companyLandLine && { "companyLandLine": companyLandLine }),
      "mobile": mobileNumber,
      // Conditionally include zip_code based on user input
      ...(zipCode && { "zip_code": zipCode }),

      "industryTypes": selectedIndustries.map(item => ({ id: item.id, name: item.name })),
      "country": selectedCountry?.name,
      "state": selectedState?.name,
      "city": selectedCity?.name,
      "membership_category": selectedCategories.name === 'non-medical' ? 'non_med_category' : 'med_category',
      // "other_products": selectedOtherProducts.map(product => product.product_name).join(', '),


      "cart": {
        "cart_items": cart_items,
      },

    };


    console.log(selectedLanguage);

    newRequest

      .post("/users?selectedLanguage=" + selectedLanguage, requestBody)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 1500);

        toast.success(`${t('Member Registered Successfully')}`, {
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

        toast.error(err?.response?.data?.error || `${t('Something went wrong!')}`, {
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
    console.log("value", value);
    setSelectedCategories(value);
    // Reset selectedGtinNumber when category changes
    // check if user cancelled the selection then reset the selectedGtinNumber as well as other products
    if (!value) {
      setSelectedGtinNumber(null);
      setSelectedOtherProducts([]);
    }
  };

  const handleGtinNumberChange = (event, value) => {
    console.log(value)
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
        setCompanyLandlineError(`${t('Number must be a maximum of 12 digits')}`);
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
        const gtinProductsData = response.data;

        //                 const gtinProducts = gtinProductsData.map((product) => ({
        //                     ...product,
        //                     member_category_description: i18n.language === "ar" ? product.member_category_description_ar : product.member_category_description
        // ,
        //                 }));

        // setGtinNumber(gtinProducts);
        setGtinNumber(gtinProductsData);
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

  const [isCompanyNamePopUpVisible, setIsCompanyNamePopUpVisible] = useState(false);
  const [isCompanyArabicPopUpVisible, setIsCompanyArabicPopUpVisible] = useState(false);
  const [isCrActivityPopUpVisible, setIsCrActivityPopUpVisible] = useState(false);
  const [isCrNumberPopUpVisible, setIsCrNumberPopUpVisible] = useState(false);
  const [isTermsAndConditionPopUp, setIsTermsAndConditionPopUp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCompanyNamePopUp = () => {
    setIsCompanyNamePopUpVisible(true);
  };

  const handleInputFocus = () => {
    setIsCompanyNamePopUpVisible(true);
  };

  const handleInputBlur = () => {
    setIsCompanyNamePopUpVisible(false);
  };

  const handleInputFocusArabic = () => {
    setIsCompanyArabicPopUpVisible(true);
  };

  const handleInputBlurArabic = () => {
    setIsCompanyArabicPopUpVisible(false);
  };

  const handleInputFocusCrActivity = () => {
    if (selectedBusinessType?.value === 'organization') {
      setIsCrActivityPopUpVisible(true);
    }
  };

  const handleInputBlurCrActivity = () => {
    setIsCrActivityPopUpVisible(false);
  };

  const handleInputFocusCrNumber = () => {
    if (selectedBusinessType?.value === 'organization') {
      setIsCrNumberPopUpVisible(true);
    }
  };

  const handleInputBlurCrNumber = () => {
    setIsCrNumberPopUpVisible(false);
  };

  const handleTermsAndCondition = () => {
    setIsTermsAndConditionPopUp(true);
  };

  const handleAccept = () => {
    setIsChecked(true);
    setIsTermsAndConditionPopUp(false);
  };

  const handleClose = () => {
    setIsChecked(false);
    setIsTermsAndConditionPopUp(false);
  };


  // handleOptionChange 
  return (
    <div>
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
            position: "fixed",
          }}
        >
          <DotLoader
            size={45}
            color={"#FF693A"}
            // height={4}
            loading={isLoading}
          />
        </div>
      )}

      {/* <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div> */}
      <div className="flex flex-col justify-center items-center">
        <div className="h-auto w-full sm:w-2/3 border-l border-r border-primary">
          <div className="h-5 w-full bg-primary rounded-t-md"></div>
          <div className="h-auto w-full flex justify-between items-center px-5 py-2">
            <p
              className={`sm:text-2xl w-full font-semibold text-sm text-secondary ${
                i18n.language === "ar" ? "text-end" : "text-start"
              }`}
            >
              {" "}
              {t("Member Registration")}{" "}
            </p>
            {/* <p className='w-full text-right font-semibold text-sm text-secondary'>{selectedCr?.activity} - {selectedCr?.cr}</p> */}
          </div>

          <p
            className={`text-red-500 text-lg font-body font-medium ml-3 pt-3 ${
              i18n.language === "ar" ? "text-end" : "text-start"
            }`}
          >
            {selectedBusinessType?.value === "organization"
              ? `** ${t("Provide Your company Certificate of Registration")} **`
              : `** ${t("Provide Your Business License")} **`}
          </p>
        </div>

        <div className="h-auto w-full sm:w-2/3 p-6 shadow-xl border-l border-r border-b border-primary">
          <form onSubmit={handleSubmit}>
            {/* <div className="w-full font-body sm:text-base text-sm flex flex-col">
              <label
                className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                htmlFor="entityType"
              >
                {t("Business Type")}
                <span className="text-red-600">*</span>
              </label>
              <Autocomplete
                id="entityType"
                options={options}
                value={selectedBusinessType}
                getOptionLabel={(option) => option.label}
                onChange={handleOptionChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="bg-gray-50 border border-gray-300 text-black text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                    placeholder={t("Select Business Type")}
                    InputProps={{
                      ...params.InputProps,
                      className: "text-black",
                    }}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      style: { color: "black" },
                    }}
                  />
                )}
              />
            </div> */}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                <label
                  htmlFor="field1"
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {selectedBusinessType?.value === "organization"
                    ? t("Cr Number")
                    : t("License Ref. No")}
                  <span className="text-red-600"> *</span>
                </label>
                <input
                  type="number"
                  id="field1"
                  value={addCrNumber}
                  onChange={handleInputChange}
                  placeholder={
                    selectedBusinessType?.value === "organization"
                      ? t("Enter Cr Number")
                      : t("Enter License Ref. No.")
                  }
                  onFocus={handleInputFocusCrNumber}
                  onBlur={handleInputBlurCrNumber}
                  className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                    i18n.language === "ar" ? "text-right" : "text-start"
                  }`}
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                <label
                  htmlFor="field2"
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {selectedBusinessType?.value === "organization"
                    ? t("Cr Activity")
                    : t("License Name")}
                  <span className="text-red-600"> *</span>
                </label>
                <input
                  type="text"
                  id="field2"
                  //  value={addCrNumber}
                  onChange={(e) => setCrActivity(e.target.value)}
                  placeholder={
                    selectedBusinessType?.value === "organization"
                      ? t("Enter Cr Activity")
                      : t("Enter License Name")
                  }
                  onFocus={handleInputFocusCrActivity}
                  onBlur={handleInputBlurCrActivity}
                  className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                    i18n.language === "ar" ? "text-right" : "text-start"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
              <div className="w-full sm:w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="email"
                >
                  {" "}
                  {t("Email")}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder={`${t("Enter")} ${t("Email")}`}
                  required
                  type="text"
                  className={`border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3 ${
                    i18n.language === "ar" ? "text-right" : "text-start"
                  }`}
                />
              </div>

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="contactperson"
                >
                  {" "}
                  {t("Contact Person")}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) => setContactPerson(e.target.value)}
                  id="contactperson"
                  placeholder={`${t("Enter")} ${t("Contact Person")}`}
                  required
                  type="text"
                  className={`border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3 ${
                    i18n.language === "ar" ? "text-right" : "text-start"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="companyEnglish"
                >
                  {t("Company Name [English]")}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) => setCompanyEnglish(e.target.value)}
                  // id='companyEnglish'
                  placeholder={`${t("Enter")} ${t("Company Name [English]")}`}
                  required
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  type="text"
                  className={`border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3 ${
                    i18n.language === "ar" ? "text-right" : "text-start"
                  }`}
                />
              </div>

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="companyArabic"
                >
                  {" "}
                  {t("Company Name [Arabic]")}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) => setCompanyArabic(e.target.value)}
                  // id='companyArabic'
                  placeholder={`${t("Enter")} ${t("Company Name [Arabic]")}`}
                  required
                  onFocus={handleInputFocusArabic}
                  onBlur={handleInputBlurArabic}
                  type="text"
                  className="border-1 border-[#8E9CAB] w-full text-right rounded-sm p-2 mb-3"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="mobile"
                >
                  {" "}
                  {t("Company Landline")}
                </label>
                <div className="flex items-center border-[1px] border-[#8E9CAB] w-full rounded-sm ">
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
                    country={"sa"}
                    defaultCountry={"sa"}
                    value={companyLandLine}
                    // onChange={setCompanyLandLine}
                    onChange={handlecompanyLandLine}
                    inputProps={{
                      id: "landline",
                      placeholder: "Company Landline",
                    }}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "0px",
                      border: "none",
                    }}
                    // required
                  />
                </div>
                {companyLandlineError && (
                  <p className="text-red-600">{companyLandlineError}</p>
                )}
              </div>

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="mobile"
                >
                  {" "}
                  {t("Mobile Number")} <span> {t("(Omit Zero)")}</span>
                  <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center border-[1px] border-[#8E9CAB] w-full rounded-sm">
                  <PhoneInput
                    international
                    country={"sa"}
                    defaultCountry={"sa"}
                    value={mobileNumber}
                    onChange={handleMobileNumber}
                    inputProps={{
                      id: "mobile",
                      placeholder: "Mobile Number",
                    }}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "0px",
                      border: "none",
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

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
              <div className="w-full font-body sm:text-base text-sm flex flex-col">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="country"
                >
                  {" "}
                  {t("Country")}
                  <span className="text-red-600">*</span>
                </label>
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
                        dir: i18n.language === "ar" ? "rtl" : "ltr",
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        style: { color: "white" },
                      }}
                      className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      placeholder={`${t("Enter")} ${t("Country")}`}
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

              <div className="w-full font-body sm:text-base text-sm flex flex-col">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="state"
                >
                  {" "}
                  {t("State")}
                  <span className="text-red-600">*</span>
                </label>
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
                        dir: i18n.language === "ar" ? "rtl" : "ltr",
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        style: { color: "white" },
                      }}
                      className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      placeholder={`${t("Enter")} ${t("State")}`}
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

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
              <div className="w-full font-body sm:text-base text-sm flex flex-col">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="city"
                >
                  {" "}
                  {t("City")}
                  <span className="text-red-600">*</span>
                </label>
                <Autocomplete
                  id="city"
                  options={filteredCities}
                  value={selectedCity}
                  required
                  getOptionLabel={(option) => option?.name_ar || ""}
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
                        dir: i18n.language === "ar" ? "rtl" : "ltr",
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        style: {
                          color: "white",
                          textAlign: i18n.language === "ar" ? "end" : "left",
                        },
                      }}
                      className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      placeholder={`${t("Enter")} ${t("City")}`}
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

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="zipcode"
                >
                  {" "}
                  {t("Zip Code")}
                </label>
                <input
                  onChange={(e) => setZipCode(e.target.value)}
                  id="zipcode"
                  placeholder={`${t("Enter")} ${t("Zip Code")}`}
                  // required
                  type="text"
                  className={`border-1 border-[#8E9CAB] w-full rounded-sm p-2 mb-3 ${
                    i18n.language === "ar" ? "text-right" : "text-start"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6">
              {/* <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='website'>Website</label>
                                <input
                                    onChange={(e) => setWebsite(e.target.value)}
                                    id='website'
                                    placeholder='Website'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div> */}

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="industriesTypes"
                >
                  {" "}
                  {t("Select Industries Releated to your Business")}
                  <span className="text-red-600">*</span>
                </label>
                <Autocomplete
                  multiple
                  id="industriesTypes"
                  options={industryTypes}
                  getOptionLabel={(option) => option.name_ar_en}
                  value={selectedIndustries}
                  onChange={handleIndustryTypeChange}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      autoComplete="off"
                      {...params}
                      label={`${t("Select matching industries")}`}
                      placeholder={`${t("select industries types")}`}
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        dir: i18n.language === "ar" ? "rtl" : "ltr", // Set direction based on language
                      }}
                    />
                  )}
                  required
                />
              </div>

              <div className="w-full font-body sm:text-base text-sm flex flex-col mt-0">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="category"
                >
                  {" "}
                  {t("Membership category")}
                  <span className="text-red-600">*</span>
                </label>
                <Autocomplete
                  id="category"
                  options={categories}
                  // disable option selection if entity type is Individual/Family Business
                  disabled={
                    selectedBusinessType.value === "individual/family business"
                  }
                  value={selectedCategories}
                  required
                  getOptionLabel={(option) => option.namesa || ""}
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
                        dir: i18n.language === "ar" ? "rtl" : "ltr",
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

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start mt-6">
              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-3">
                <label
                  className={`flex items-center text-secondary font-semibold -mt-5 ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  }`}
                  htmlFor="GTIN"
                >
                  GTIN {t("Barcode")}
                  <span className="text-red-600">*</span>
                  <img src={barcodeImage} className="h-10 w-auto" alt="" />
                </label>

                <Autocomplete
                  id="GTIN"
                  disabled={!selectedCategories}
                  options={
                    selectedCategories &&
                    selectedBusinessType.value === "individual/family business"
                      ? gtinNumber.filter(
                          (option) =>
                            option?.member_category_description ===
                            "Category B - ( 100 Barcodes )"
                        )
                      : selectedCategories
                      ? gtinNumber.filter(
                          (option) => option?.total_no_of_barcodes !== 10
                        )
                      : []
                  }
                  value={selectedGtinNumber}
                  getOptionLabel={(option) => {
                    if (i18n.language === "ar") {
                      return option?.member_category_description_ar || "";
                    } else {
                      return option?.member_category_description || "";
                    }
                  }}
                  onChange={handleGtinNumberChange}
                  onInputChange={(event, value) => {
                    if (!value) {
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
                        dir: i18n.language === "ar" ? "rtl" : "ltr",
                      }}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        style: { color: "white" },
                      }}
                      className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      placeholder="GTIN"
                    />
                  )}
                  required
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

              <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 mt-1">
                <label
                  className={`text-secondary font-semibold ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                  htmlFor="other"
                >
                  {" "}
                  {t("Other Products")}
                  <span className="font-normal"> (GLN,SSCC,UDI)</span>
                </label>
                <Autocomplete
                  multiple
                  id="other"
                  // Disable this field if no GTIN number is selected or if the entity type is Individual/Family Business
                  disabled={
                    !selectedGtinNumber ||
                    selectedGtinNumber.length === 0 ||
                    selectedBusinessType.value === "individual/family business"
                  }
                  options={otherProductsOptions}
                  required
                  // getOptionLabel={(option) => option.product_name}
                  getOptionLabel={(option) => {
                    if (i18n.language === "ar") {
                      return option?.name_ar || "";
                    } else {
                      return option?.product_name || "";
                    }
                  }}
                  value={selectedOtherProducts}
                  onChange={handleOtherProductsChange}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      autoComplete="off"
                      {...params}
                      label={`${t("Other Products")}`}
                      placeholder={`${t("Enter")} ${t("Other Products")}`}
                      variant="outlined"
                    />
                  )}
                  getOptionDisabled={getOptionDisabled}
                />
              </div>
            </div>

            <div
              className={`mt-2 ${
                i18n.language === "ar" ? "text-right" : "text-start"
              }`}
            >
              {i18n.language === "ar" ? (
                <>
                  <label
                    className="text-secondary font-body pl-2 cursor-pointer"
                    htmlFor="terms"
                  >
                    {i18n.language === "ar" ? (
                      <>
                        {t("(Download Terms & Conditions)")}{" "}
                        {t("Accept Term & Conditions")}
                      </>
                    ) : (
                      <>
                        {t("Accept Term & Conditions")}{" "}
                        {t("(Download Terms & Conditions)")}
                      </>
                    )}
                  </label>
                  <span className="text-red-600 -ml-1"></span>
                  <input
                    id="terms"
                    type="checkbox"
                    onChange={handleTermsAndCondition}
                    checked={isChecked}
                    className="bg-[#8E9CAB] rounded-sm transform scale-150"
                  />
                </>
              ) : (
                <>
                  <input
                    id="terms"
                    type="checkbox"
                    onChange={handleTermsAndCondition}
                    checked={isChecked}
                    className="bg-[#8E9CAB] rounded-sm transform scale-150"
                  />
                  <label
                    className="text-secondary font-body pl-2 cursor-pointer"
                    htmlFor="terms"
                  >
                    {i18n.language === "ar" ? (
                      <>
                        {t("(Download Terms & Conditions)")}{" "}
                        {t("Accept Term & Conditions")}
                      </>
                    ) : (
                      <>
                        {t("Accept Term & Conditions")}{" "}
                        {t("(Download Terms & Conditions)")}
                      </>
                    )}
                  </label>
                  <span className="text-red-600 -ml-1"></span>
                </>
              )}
            </div>

            <div
              className={` ${
                i18n.language === "ar" ? "text-end" : "text-start"
              }`}
            >
              <div className="mt-6">
                <label className="text-secondary text-3xl font-sans font-bold">
                  {" "}
                  {t("Your Subscription")}
                </label>
                <div className="table-Bintobin-Axapta px-4">
                  <p className="text-secondary text-2xl font-sans font-bold text-center mb-4 mt-4">
                    {" "}
                    {t("Subscription Summary")}
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th>{t("PRODUCT")}</th>
                        <th> {t("REGISTRATION FEE")}</th>
                        <th> {t("YEARLY FEE")}</th>
                        <th> {t("PRICE")}</th>
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
                        <td colSpan="3" className="text-right font-bold">
                          {" "}
                          {t("Total")}:
                        </td>

                        <td>{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* add one radio button */}
            <div
              className={`flex flex-col gap-3  mt-6 ${
                i18n.language === "ar"
                  ? "sm:flex-row sm:justify-end"
                  : "sm:flex-row sm:justify-start"
              }`}
            >
              <div className="w-full sm:w-[18%] font-body sm:text-base text-sm flex flex-col gap-1">
                <div
                  className={`flex items-center gap-3 ${
                    i18n.language === "ar" ? "row-reverse" : "row"
                  }`}
                >
                  <input
                    // onChange={(e) => setLocationArabic(e.target.value)}
                    id="radio"
                    placeholder="radio"
                    defaultChecked
                    type="radio"
                    className="border-1 border-[#8E9CAB] w-5 h-5 rounded-sm p-2 mb-3"
                  />
                  <p
                    className={`text-secondary font-semibold ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                  >
                    {t("Bank Transfer")}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`sm:w-[30%] w-full rounded bg-primary hover:bg-secondary font-sans px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 ${
                i18n.language === "ar" ? "float-right" : "float-left"
              }`}
            >
              <i className="fas fa-check-circle mr-1"></i> {t("Submit")}
            </button>
          </form>
        </div>

        {isCompanyNamePopUpVisible && (
          <CompanyNamePopUp
            isVisible={isCompanyNamePopUpVisible}
            setVisibility={setIsCompanyNamePopUpVisible}
          />
        )}

        {isCompanyArabicPopUpVisible && (
          <CompanyArabicPopUp
            isVisible={isCompanyArabicPopUpVisible}
            setVisibility={setIsCompanyArabicPopUpVisible}
          />
        )}

        {isCrActivityPopUpVisible && (
          <CrActivityPopUp
            isVisible={isCrActivityPopUpVisible}
            setVisibility={setIsCrActivityPopUpVisible}
          />
        )}

        {isCrNumberPopUpVisible && (
          <CrNumberPopUp
            isVisible={isCrNumberPopUpVisible}
            setVisibility={setIsCrNumberPopUpVisible}
          />
        )}

        {isTermsAndConditionPopUp && (
          <TermsAndCondition
            isVisible={isTermsAndConditionPopUp}
            handleClose={handleClose}
            handleAccept={handleAccept}
          />
        )}
        {/* </div> */}
      </div>

      {/* Footer */}
      {/* <div div className="mt-6">
        <Footer />
      </div> */}
      {/* End Footer */}
    </div>
  );
}

export default MemmberRegisteration