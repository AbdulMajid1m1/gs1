import React, { useState } from 'react'
import visitFrontend from "../../../../Images/visitFrontend.png"
import profileICon from "../../../../Images/profileICon.png"
import { Autocomplete, TextField } from "@mui/material";

const MemberProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    // const { currentUser, updateCurrentUser } = useContext(CurrentUserContext);
    // const [selectedBackImage, setSelectedBackImage] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    // const [selectedBackImageFile, setSelectedBackImageFile] = useState(null);
    const [selectedBackImageFile, setSelectedBackImageFile] = useState(null);
    const [selectedBackImage, setSelectedBackImage] = useState(null);
  
    const [country, setCountry] = useState([]);
    const [companyNameEnglish, setCompanyNameEnglish] = useState("");
    const [companyNameArabic, setCompanyNameArabic] = useState("");
    const [mobile, setMobile] = useState("");
    const [extension, setExtension] = useState("");
    const [countryShortName, setCountryShortName] = useState("");
    const [countryShortNameList, setCountryShortNameList] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [zip, setZip] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [otherMobileNumber, setOtherMobileNumber] = useState("");
    const [otherLandlineNumber, setOtherLandlineNumber] = useState("");
    const [district, setDistrict] = useState("");
    const [website, setwebsite] = useState("");
    const [staff, setStaff] = useState("");
    const [building, setBuilding] = useState("");
    const [unit, setUnit] = useState("");
    const [qrcode, setQrcode] = useState("");
    const [company, setCompany] = useState("");
  
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
  
    // const { openSnackbar } = useContext(SnackbarContext);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setSelectedImageFile(imageFile);
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    };
  
    const handleBackImageChange = (event) => {
      const backImageFile = event.target.files[0];
      setSelectedBackImageFile(backImageFile);
      const backImageUrl = URL.createObjectURL(backImageFile);
      setSelectedBackImage(backImageUrl);
    };
  
  
  
    const handleCountryName = (event, value) => {
      console.log(value);
      setSelectedCountry(value);
    };
  
    const handleCountryShortName = (event, value) => {
      console.log(value);
      setCountryShortName(value);
    };
  
    const handleCity = (event, value) => {
      console.log(value);
      setSelectedCity(value);
    };
  
    const handleState = (event, value) => {
      console.log(value);
      setSelectedState(value);
    };
  
    // all get Apis
    // useEffect(() => {
    //   phpRequest
    //     .get("/countries/list")
    //     .then((response) => {
    //       console.log(response.data);
    //       const countryNames = response.data.countries.map(
    //         (country) => country.name_en
    //       );
    //       setCountry(countryNames);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  
    //   phpRequest
    //     .get("/countries/list")
    //     .then((response) => {
    //       console.log(response.data);
    //       const countryShortNamesValues = response.data.countries.map(
    //         (countryShort) => countryShort.country_shortName
    //       );
    //       setCountryShortNameList(countryShortNamesValues);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);
  
    // useEffect(() => {
    //   const dataBody = {
    //     country_id: 17,
    //   };
  
    //   phpRequest
    //     .post("/states/by/country", dataBody)
    //     .then((response) => {
    //       console.log(response.data);
    //       const stateNames = response.data.states.map((state) => state.name);
    //       setState(stateNames);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  
    //   const citiesStateBody = {
    //     state_id: 28,
    //   };
  
    //   phpRequest
    //     .post("/cities/by/state", citiesStateBody)
    //     .then((response) => {
    //       console.log(response.data);
    //       const cityNames = response.data.city.map((city) => city.name);
    //       setCity(cityNames);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);
  
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setIsLoading(true);
    //   console.log(
    //     currentUser,
    //     selectedCountry,
    //     countryShortName,
    //     selectedCity,
    //     selectedState,
    //     zip,
    //     addressLine1,
    //     addressLine2,
    //     district,
    //     building,
    //     otherMobileNumber,
    //     otherLandlineNumber,
    //     website,
    //     staff,
    //     unit,
    //     qrcode,
    //     mobile,
    //     extension,
    //     companyNameEnglish,
    //     companyNameArabic,
    //     selectedImageFile,
    //     selectedBackImageFile
    //   );
  
    //   // Create a FormData object to store the form data including the image files
    //   const formData = new FormData();
    //   formData.append("user_id", currentUser?.user?.id);
    //   formData.append("country", selectedCountry);
    //   formData.append("country_shortName", countryShortName);
    //   formData.append("city", selectedCity);
    //   formData.append("state", selectedState);
    //   formData.append("zip", zip);
    //   formData.append("address1", addressLine1);
    //   formData.append("address2", addressLine2);
    //   formData.append("district", district);
    //   formData.append("building_no", building);
    //   formData.append("additional_number", otherMobileNumber);
    //   formData.append("mbl_extension", extension);
    //   formData.append("other_landline", otherLandlineNumber);
    //   formData.append("website", website);
    //   formData.append("no_of_staff", staff);
    //   formData.append("unit_number", unit);
    //   formData.append("qr_corde", qrcode);
    //   formData.append("mobile", mobile);
    //   formData.append("company_name_eng", companyNameEnglish);
    //   formData.append("company_name_arabic", companyNameArabic);
    //   if (selectedImageFile !== null) {
  
    //     formData.append("image", selectedImageFile);
    //   }
    //   if (selectedBackImageFile !== null) {
    //     formData.append("address_image", selectedBackImageFile);
    //   }
  
    //   phpRequest
    //     .post("/member/profile/update", formData)
    //     .then((response) => {
    //       console.log(response.data);
    //       openSnackbar(response.data.message);
    //       sessionStorage.setItem("currentUser", JSON.stringify(response?.data?.memberData));
    //       updateCurrentUser(response?.data?.memberData);
  
    //       setIsLoading(false);
    //       e.target.reset();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       openSnackbar("Something is Wrong");
    //       setIsLoading(false);
    //     });
    // };
  
    // useEffect(() => {
    //   setIsLoading(true);
  
    //   const fetchData = async () => {
    //     try {
    //       const response = await phpRequest.post("/member/profile", {
    //         user_id: currentUser?.user?.id,
    //       });
  
    //       const { memberProfile } = response.data;
    //       console.log(memberProfile);
  
    //       setSelectedImage(
    //         memberProfile?.image_path + "/" + memberProfile?.image
    //       );
    //       setSelectedBackImage(
    //         memberProfile?.image_path + "/" + memberProfile.address_image
    //       );
    //       setCompanyNameEnglish(memberProfile.company_name_eng);
    //       setCompanyNameArabic(memberProfile.company_name_arabic);
    //       setMobile(memberProfile.mobile);
    //       setExtension(memberProfile.mbl_extension);
    //       setCountryShortName(memberProfile.address.country_shortName);
    //       setSelectedCountry(memberProfile?.address?.countryName);
    //       setSelectedState(memberProfile?.address?.stateName)
    //       setSelectedCity(memberProfile?.address?.cityName)
    //       setZip(memberProfile.address.zip);
    //       setAddressLine1(memberProfile.address1);
    //       setAddressLine2(memberProfile.address2);
    //       setOtherMobileNumber(memberProfile.additional_number);
    //       setOtherLandlineNumber(memberProfile.other_landline);
    //       setDistrict(memberProfile.district);
    //       setwebsite(memberProfile.website);
    //       setStaff(memberProfile.no_of_staff);
    //       setBuilding(memberProfile.building_no);
    //       setUnit(memberProfile.unit_number);
    //       setQrcode(memberProfile.qr_corde);
    //       setCompany(memberProfile.companyID);
  
    //       setIsLoading(false);
  
    //     } catch (error) {
    //       console.log("Error fetching API data:", error);
    //       setIsLoading(false);
  
    //     }
    //   };
  
    //   fetchData();
    // }, []);
  
  return (
    <div>
      <div className="p-1 h-full sm:ml-72 bg-[#DAF2EE]">
          <div className='h-32 w-full flex justify-end items-start p-3 bg-primary -mt-3 sm:gap-7 gap-4'>
            <div className='flex justify-center items-center mt-1 cursor-pointer'>
                <img src={visitFrontend} 
                    alt='logo'
                      style={{ filter: 'invert(1)' }}
                         className='h-7 w-7 text-white mr-4' />
                <p className='text-white font-sans font-normal sm:text-2xl text-sm'>Vist Frontend</p>
            </div>

            <div className='flex justify-center items-center'>
                <img src={profileICon} alt='logo' className='h-10 w-10 text-white mr-5' />
            </div>
          </div>
          
            <div className='flex justify-center items-center'>
                <div className="h-20 w-[97%] bg-white shadow-xl rounded-md -mt-10 flex justify-start items-center px-10">
                    <p className="sm:text-3xl text-secondary text-sm font-sans font-semibold">Profile</p>
                </div>
            </div>



            {/* Profile Phase */}
        <div className='flex justify-center items-center bg-[#DAF2EE]'>
         <div className="h-auto w-[97%] px-0 pt-4">
          <div className="h-auto w-full p-6 bg-white shadow-xl rounded-md">
            <form onSubmit={handleSubmit}>
              Image
              <div className="flex justify-between items-center flex-wrap gap-5 mb-6">
                {/* Image container */}
                <div className="flex justify-center items-center gap-7 flex-wrap mb-4">
                  <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                    <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-[#345ECC] text-white font-sans rounded-sm">
                      <label
                        htmlFor="imageInput"
                        className="cursor-pointer whitespace-nowrap"
                      >
                        Choose File
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
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="companyname">
                    Company Name[English]<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={companyNameEnglish}
                    onChange={(e) => setCompanyNameEnglish(e.target.value)}
                    id="companyname"
                    type="text"
                    readOnly
                    className="border-2 bg-[#C3E2DC] border-[#DAF2EE] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="companyarabic">
                    Company Name[Arabic]<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={companyNameArabic}
                    onChange={(e) => setCompanyNameArabic(e.target.value)}
                    id="companyarabic"
                    type="text"
                    readOnly
                    className="border-2 bg-[#C3E2DC] border-[#DAF2EE] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="mobile">
                    Mobile<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    id="mobile"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="entension">
                    Extension<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={extension}
                    onChange={(e) => setExtension(e.target.value)}
                    id="entension"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="country">
                    Country<span className="text-red-600">*</span>
                  </label>
                  <Autocomplete
                    id="country"
                    options={country}
                    value={selectedCountry}
                    getOptionLabel={(option) => option}
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
                        className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
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

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="short">
                    Country Short Name<span className="text-red-600">*</span>
                  </label>
                  <Autocomplete
                    id="short"
                    options={countryShortNameList}
                    value={countryShortName}
                    getOptionLabel={(option) => option}
                    onChange={handleCountryShortName}
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
                        placeholder="Country Short Name"
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
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-5">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="state">
                    State<span className="text-red-600">*</span>
                  </label>
                  <Autocomplete
                    id="state"
                    options={state}
                    value={selectedState}
                    getOptionLabel={(option) => option}
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
                        className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
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

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="short">
                    City<span className="text-red-600">*</span>
                  </label>
                  <Autocomplete
                    id="city"
                    options={city}
                    value={selectedCity}
                    getOptionLabel={(option) => option}
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
                        className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
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
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="zip">
                    Zip<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    id="zip"
                    // disabled
                    type="text"
                    placeholder="37000"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="address1">
                    Address Line1<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    id="address1"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="address2">
                    Address Line2
                  </label>
                  <input
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    id="address2"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="mobile">
                    Other Mobile Number<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={otherMobileNumber}
                    onChange={(e) => setOtherMobileNumber(e.target.value)}
                    id="mobile"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="othernumber">
                    Other Landline Number<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={otherLandlineNumber}
                    onChange={(e) => setOtherLandlineNumber(e.target.value)}
                    id="othernumber"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="district">
                    District<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    id="district"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="website">
                    Website<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={website}
                    onChange={(e) => setwebsite(e.target.value)}
                    id="website"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="staff">
                    No Of Staff<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    id="staff"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="building">
                    Building No<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    id="building"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="unitnumber">
                    Unit Number<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    id="unitnumber"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-3">
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="qrcode">
                    QR Code No<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={qrcode}
                    onChange={(e) => setQrcode(e.target.value)}
                    id="qrcode"
                    type="text"
                    className="border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label htmlFor="compnayid">
                    Company ID<span className="text-red-600">*</span>
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    id="compnayid"
                    placeholder="companyID"
                    type="text"
                    readOnly
                    className="border-2 bg-gray-200 border-[#e4e4e4] w-full rounded-lg p-2 mb-3"
                  />
                </div>
              </div>
              {/* Image  */}
              <div className="flex justify-between items-center flex-wrap gap-5 mt-6">
                {/* Image container  */}
                <div className="flex justify-center items-center gap-7 flex-wrap mb-4">
                  <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                    <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-[#345ECC] text-white font-sans rounded-sm">
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
                        // value={backImageFile}
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
              </div>
              <div className="flex justify-end">
                {/* <button
                  type="button"
                  className="rounded-full bg-[#e49515] font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700"
                >
                  <i className="fas fa-download mr-1"></i> Download
                </button> */}

                <button
                  type="submit"
                  className="rounded-full bg-[#1E3B8B] font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700"
                >
                  <i className="fas fa-check-circle mr-1"></i> Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default MemberProfile