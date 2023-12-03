import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import { Autocomplete, TextField } from '@mui/material';
import newRequest from '../../../utils/userRequest';
import './MemberRegistration.css';
import Header from '../../../components/Header/Header';
import Swal from 'sweetalert2';
import Footer from '../../../components/Footer/Footer';
import { DotLoader } from 'react-spinners'


const MemmberRegisteration = () => {
    const sessionData = sessionStorage.getItem('saveCrNumberData');
    const sesstionDocumentData = sessionStorage.getItem('saveDocumentData');
    console.log("Get the Cr Number", sessionData);
    console.log("Get the Document Data", sesstionDocumentData);
    const [country, setCountry] = React.useState([])
    const [state, setState] = React.useState([])
    const [city, setCity] = useState([]);
    const [gtinNumber, setGtinNumber] = useState('')
    const [getAllActivities, setGetAllActivities] = React.useState([])
    const [companyLandLine, setCompanyLandLine] = React.useState('')
    const [mobileNumber, setMobileNumber] = React.useState('')
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedGtinNumber, setSelectedGtinNumber] = useState("");
    const [selectedActivity, setSelectedActivity] = React.useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('')
    const [companyEnglish, setCompanyEnglish] = useState('')
    const [companyArabic, setCompanyArabic] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [extension, setExtension] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [website, setWebsite] = useState('')
    const [upload, setUpload] = useState('')
    const [uploadCompanyDocuments, setUploadCompanyDocuments] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
   

    // multple select 
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeOptions, setAttributeOptions] = useState([]);
    const [selectedOtherProducts, setSelectedOtherProducts] = useState([]);
    const [otherProductsOptions, setOtherProductsOptions] = useState([]);
    const [selectedGLNOption, setSelectedGLNOption] = useState(null);
    const [selectProducts, setSelectProducts] = useState('');
    const [gpcSelected, setGpcSelected] = useState('');



    useEffect(() => {
        //All Activities Api
        const handleGetAllActivities = async () => {
            try {
                // const response = await newRequest.get(`/crs/getCrsById/${sessionData}`);
                const response = await newRequest.get('/crs/getCrsById/452819');
               
                const activity = response.data;
                //   const Activities = data.map((activity) => ({
                //     id: activity.id,
                //     name: activity.activity,
                //   }));
                console.log(activity);
                setGetAllActivities(activity);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        // Search GPC Api
        const handleSearchGPC = async () => {
            try {
                const response = await newRequest.get('/attributes/113');
                setAttributeOptions(response.data);
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
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        // all Countries Api
        const handleGetAllCountries = async () => {
            try {
                const response = await newRequest.get('/address/getAllCountries');
                const data = response.data;
                const countries = data.map((country) => ({
                    id: country.id,
                    name: country.name_en,
                }));
                setCountry(countries);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
       

        handleGetAllActivities();
        handleSearchGPC();
        handleGetAllCountries();
        // handleGtinNumber();
        handleOtherProductsData();
  
    }, []);



    const handleAttributeChange = (event, value) => {
        setSelectedAttributes(value);
        const attributesValue = value.map((option) => option.attributes_title);
        
        // Join the array elements into a single string
        const joinedAttributes = attributesValue.join(', ');
        console.log(joinedAttributes);
        setGpcSelected(joinedAttributes);
    };

    
    const handleOtherProductsChange = (event, value) => {
        setSelectedOtherProducts(value);
     
        const names = value.map((option) => option.product_name);
        // Join the array elements into a single string
        const joinedNames = names.join(', ');
        console.log(joinedNames);
        setSelectProducts(joinedNames);

        // Check if the selected option is GLN (20 Locations), GLN (10 Locations), or GLN (30 Locations)
        const selectedGLN = value.find(
          (option) =>
            option.product_name === 'GLN ( 20 Locations)' ||
            option.product_name === 'GLN ( 10 Locations)' ||
            option.product_name === 'GLN (30 Locations)'    
        );
    
        setSelectedGLNOption(selectedGLN);
      };
    
      const getOptionDisabled = (option) => {
        return (
          selectedGLNOption &&
          option.product_name.startsWith('GLN') &&
          option.product_name !== selectedGLNOption.product_name
        );
      };

      const handleCountryName = (event, value) => {
        setSelectedCountry(value);
        console.log(value?.id);
    }
  

     // state Api   
    useEffect(() => {
        if (selectedCountry) {
           const handleGetAllStates = async () => {
              try {
                const response = await newRequest.get(`/address/getStateByCountryId/${selectedCountry.id}`);
                const data = response.data;
                const states = data.map((state) => ({
                    id: state.id,
                    name: state.name,
                }));
                setState(states);
            }
            catch (error) {
                console.error('Error fetching states:', error);
            }
        };
            handleGetAllStates();

        } else {
            setState([]);
        }
      }, [selectedCountry]);

      const handleState = (event, value) => {
        setSelectedState(value);
        console.log('Selected Country ID:', value.id);
      };
    

     // City Api   
      useEffect(() => {
        if (selectedState) {
            const handleGetAllCities = async () => {
                try {
                    const response = await newRequest.get(`/address/getCityByStateId/${selectedState.id}`);
                    const data = response.data;
                    const states = data.map((state) => ({
                        id: state.id,
                        name: state.name,
                    }));
                    setCity(states);
                }
                catch (error) {
                    console.error('Error fetching states:', error);
                }
            };
            handleGetAllCities();
        } else {
            setState([]);
        }
      }, [selectedState]);
      
      const handleCity = (event, value) => {
        setSelectedCity(value);
        console.log('Selected State ID:', value.id);
      };


    //   console.log('Selected Country:', selectedCountry?.name);
    //     console.log('Selected State:', selectedState?.name);
    //     console.log('Selected City:', selectedCity?.name);


    const handleSelectedActivityData = (event, value) => {
        setSelectedActivity(value);
    }

    const handleGtinNumber = (event, value) => {
        setSelectedGtinNumber(value);
    }

      // Image section
    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage(imageUrl);
    };



    // Submit All Data    
     const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        const formData = new FormData();
        formData.append('user_type', 'admin');
        formData.append('slug', 'user-slug');
        formData.append('location_uk', 'London');
        formData.append('have_cr', 'yes');
        formData.append('cr_documentID', '12345');
        formData.append('document_number', 'doc-67890');
        formData.append('fname', 'John');
        formData.append('lname', 'Doe');
        formData.append('email', email);
        formData.append('mobile', mobileNumber);
        // formData.append('image', 'https://example.com/user-image.jpg');
        formData.append('address', '123 Street, City');
        formData.append('address1', 'Address Line 1');
        formData.append('address2', 'Address Line 2');
        formData.append('po_box', 'PO Box 1001');
        formData.append('mbl_extension', extension);
        formData.append('website', website);
        formData.append('no_of_staff', '50');
        formData.append('companyID', 'company-001');
        formData.append('district', 'Central');
        formData.append('building_no', '12A');
        formData.append('additional_number', '202');
        formData.append('other_landline', '0987654321');
        formData.append('unit_number', 'Unit 5');
        formData.append('qr_corde', 'QRCode123');
        formData.append('email_verified_at', '2023-03-15T00:00:00.000Z');
        formData.append('code', 'Code12345');
        formData.append('verification_code', '123456');
        formData.append('cr_number', sessionData);
        formData.append('cr_activity', selectedActivity);
        formData.append('company_name_eng', companyEnglish);
        formData.append('company_name_arabic', companyArabic);
        formData.append('bussiness_activity', 'Trading');
        formData.append('membership_type', 'Premium');
        formData.append('member_category', 'Category A');
        formData.append('other_products', selectProducts);
        formData.append('gpc', gpcSelected);
        formData.append('product_addons', 'Addon ABC');
        formData.append('total', '1500.50');
        formData.append('contactPerson', contactPerson);
        formData.append('companyLandLine', companyLandLine);
        formData.append('documents', 'https://example.com/documents.pdf');
        formData.append('address_image', 'https://example.com/address-image.jpg');
        formData.append('status', 'active');
        formData.append('payment_type', 'Credit Card');
        formData.append('payment_status', '1');
        formData.append('online_payment', 'Enabled');
        formData.append('remember_token', 'TokenXYZ');
        formData.append('parent_memberID', '100');
        formData.append('member_type', 'Type A');
        formData.append('invoice_file', 'https://example.com/invoice.pdf');
        formData.append('otp_status', '1');
        formData.append('transaction_id', '2001');
        formData.append('created_at', '2023-03-15T00:00:00.000Z');
        formData.append('updated_at', '2023-03-15T00:00:00.000Z');
        formData.append('gcpGLNID', 'GLN123');
        formData.append('gln', '123456');
        formData.append('gcp_type', 'Type 1');
        formData.append('deleted_at', '2023-03-20T00:00:00.000Z');
        formData.append('gcp_expiry', '2024-03-15T00:00:00.000Z');
        formData.append('memberID', 'MID123');
        formData.append('user_id', 'UID123');
        formData.append('remarks', 'Sample remarks');
        formData.append('assign_to', '5');
        formData.append('membership_category', 'Category B');
        formData.append('upgradation_disc', '10');
        formData.append('upgradation_disc_amount', '100.00');
        formData.append('renewal_disc', '5');
        formData.append('renewal_disc_amount', '50.00');
        formData.append('membership_otherCategory', 'Other Category');
        formData.append('activityID', '123');
        formData.append('registration_type', 'Online');
        // formData.append('document', sesstionDocumentData);
        formData.append('image', selectedImage);

      
        newRequest
          .post("/users", formData)
          .then((response) => {
            console.log(response.data);
            setIsLoading(false);
            setTimeout(() => {
              navigate(-1);
            }, 1500);

            // Add Swal message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Member Registered Successfully',
                footer: '<a href="#">Why do I have this issue?</a>'
            })

      
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err?.response?.data?.error || "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            })

          });
      };


    const [selectedCategory, setSelectedCategory] = useState('nonMedical');
    const [subscriptionData, setSubscriptionData] = useState([]);
    

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.id);
        // Reset selectedGtinNumber when category changes
        setSelectedGtinNumber(null);
    };

    const handleGtinNumberChange = (event, value) => {
        setSelectedGtinNumber(value);
        if (value) {
        const selectedGtinData = gtinNumber.find((item) => item.id === value.id);
        const newItem = {
            product: selectedGtinData.member_category_description,
            registrationFee: selectedGtinData.member_registration_fee || 0,
            yearlyFee: selectedGtinData.gtin_yearly_subscription_fee || 0,
            price: selectedGtinData.member_registration_fee || 0 + selectedGtinData.gtin_yearly_subscription_fee || 0,
        };
        setSubscriptionData(prevData => [...prevData, newItem]);
        }
    };


    useEffect(() => {
        const handleGtinNumber = async () => {
          try {
            const response = await newRequest.get(`/gtinProducts?category=${selectedCategory}`);
            setGtinNumber(response.data);
          } catch (error) {
            console.error('Error fetching GTIN products:', error);
          }
        };
    
        handleGtinNumber();
      }, [selectedCategory]);


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
                <div className='h-auto w-[85%] border-l border-r border-primary'>
                    <div className='h-5 w-full bg-primary'></div>
                    <div className='h-16 w-full flex justify-between items-center px-5'>
                        <p className='sm:text-2xl font-semibold text-sm text-secondary'>Member Registration</p>
                    </div>
                </div>

                <div className='h-auto sm:w-[85%] w-full p-6 shadow-xl border-l border-r border-primary'>
                    <form>
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='activty'>CR Activities<span className='text-red-600'>*</span></label> 
                                <Autocomplete
                                    id="activty"
                                    // options={getAllActivities}
                                    options={[getAllActivities]}
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
                        </div>

                        {/* Add Five Radio Buttons  */}
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between mt-6 mb-6'>
                            <div className='w-full font-sans sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                      <input
                                        id='nonMedical'
                                        name='category'
                                        type='radio'
                                        className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3'
                                        checked={selectedCategory === 'nonMedical'}
                                        onChange={handleCategoryChange}
                                    />
                                    <label htmlFor='nonMedical' className='text-secondary font-semibold text-xs'>
                                        Non-Medical Category
                                    </label>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        id='medical'
                                        name='category'
                                        type='radio'
                                        className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3'
                                    />
                                    <label htmlFor='medical' className='text-secondary font-semibold text-xs'>
                                        Medical Category
                                    </label>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        id='tobacco'
                                        name='category'
                                        type='radio'
                                        className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3'
                                    />
                                    <label htmlFor='tobacco' className='text-secondary font-semibold text-xs'>
                                        Tobacco Category
                                    </label>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        id='cosmetics'
                                        name='category'
                                        type='radio'
                                        className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3'
                                    />
                                    <label htmlFor='cosmetics' className='text-secondary font-semibold text-xs'>
                                        Cosmetics Category
                                    </label>
                                </div>
                            </div>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        id='pharma'
                                        name='category'
                                        type='radio'
                                        className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3'
                                    />
                                    <label htmlFor='pharma' className='text-secondary font-semibold text-xs'>
                                        Pharma Category
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
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
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Comapny Landline<span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-2 border-[#e4e4e4] w-full rounded-sm '>
                                    <PhoneInput
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
                                    />


                                </div>
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='mobile'>Mobile Number <span>(Omit Zero)</span><span className='text-red-600'>*</span></label>
                                <div className='flex items-center border-2 border-[#e4e4e4] w-full rounded-sm'>
                                    <PhoneInput
                                        international
                                        defaultCountry="SA"
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
                                    />


                                </div>
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='extension'>Extension no.<span className='text-red-600'>*</span></label>
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
                                <label className='text-secondary font-semibold' htmlFor='website'>Website<span className='text-red-600 font-normal'>* Please enter a valid URL</span></label>
                                <input
                                    onChange={(e) => setWebsite(e.target.value)}
                                    id='website'
                                    placeholder='Website'
                                    type='text' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='searchgpc'>Search GPC<span className='text-red-600'>*</span></label>
                                <Autocomplete
                                    multiple
                                    id='searchgpc'
                                    options={attributeOptions}
                                    getOptionLabel={(option) => option.attributes_title}
                                    value={selectedAttributes}
                                    onChange={handleAttributeChange}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Search GPC'
                                        placeholder='Search GPC'
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
                                    options={state}
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
                                    options={city}
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


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>

                           
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
                                <Autocomplete
                                    id='GTIN'
                                    options={gtinNumber}
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
                                        {...params}
                                        label='Search GPC'
                                        placeholder='Search GPC'
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
                                    onChange={(e) => setUpload(e.target.value)}
                                    id='upload'
                                    placeholder='Upload Company Documents'
                                    type='file' className='border-2 border-[#e4e4e4] w-full rounded-sm p-2 mb-3' />
                            </div>


                            <div className='w-full sm:w-[34%] font-body sm:text-base text-sm flex flex-col gap-1'>
                                <label className='text-secondary font-semibold' htmlFor='uploadNational'>Upload National Address <span className='font-normal'> (QR Code photo)</span><span className='text-red-600 font-normal'>*</span></label>
                                <input
                                    onChange={handleImageChange}
                                    // onChange={(e) => setUploadNationalAddress(e.target.value)}
                                    id='uploadNational'
                                    type='file' className='border-2 border-[#e4e4e4] w-full text-right rounded-sm p-2 mb-3' />
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
                                </tbody>
                                <tfoot>
                                    <tr>
                                    <td colSpan="3" className="text-right font-bold">Total:</td>
                                    <td>
                                        {/* Calculate the total price for all selected rows */}
                                        {subscriptionData.reduce((total, item) => total + item.price, 0)}
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
                                        type='radio' className='border-2 border-[#e4e4e4] w-5 h-5 rounded-sm p-2 mb-3' />
                                    <p className='text-secondary font-semibold'>Bank Transfer</p>
                                </div>
                                
                            </div>
                         </div>
                        
                        <button onClick={handleSubmit} type='submit' className="sm:w-[30%] w-full rounded bg-primary hover:bg-secondary font-sans px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200">
                                <i className="fas fa-check-circle mr-1"></i> Submit
                        </button>

                    </form>

                </div>
                {/* </div> */}
            </div>

            
             {/* Footer */}
             <div className='mt-6'>
                <Footer />
             </div>
            {/* End Footer */}
        </div>
    )
}

export default MemmberRegisteration