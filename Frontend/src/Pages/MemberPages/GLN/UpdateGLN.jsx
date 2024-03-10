import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { DotLoader, RiseLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
import newRequest from '../../../utils/userRequest';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';



const UpdateGLN = () => {
    const navigate = useNavigate()
  let { productId } = useParams();
  const { t, i18n } = useTranslation();
    // console.log(productId);
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    // console.log(memberData);
    const glnDataString = sessionStorage.getItem('glnData');
    const glnData = JSON.parse(glnDataString);
    // console.log(glnData);


    const [locationEnglish, setLocationEnglish] = React.useState('')
    const [locationArabic, setLocationArabic] = React.useState('')
    const [addressEnglish, setAddressEnglish] = React.useState('')
    const [addressArabic, setAddressArabic] = React.useState('')
    const [po, setPo] = React.useState('')
    const [postal, setPostal] = React.useState('')
    const [longitude, setLongitude] = React.useState('')
    const [latitude, setLatitude] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [nationalAddress, setNationalAddress] = React.useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);





    
    useEffect(() => {
      setIsLoading(true);

        const fetchProductDetails = async () => {
            try {
                // const response = await newRequest.get(`/gln?id=${productId}`)
                // console.log(response.data[0]);

                // const productData = response.data[0];
                const productData = glnData;
                
                // Set the state variables with the fetched data
                setLocationEnglish(productData?.locationNameEn);
                setLocationArabic(productData?.locationNameAr);
                setAddressEnglish(productData?.AddressEn);
                setAddressArabic(productData?.AddressAr);
                setPo(productData?.pobox);
                setPostal(productData?.postal_code);
                setStatus(productData?.status);
                setLatitude(productData?.latitude);
                setLongitude(productData?.longitude);
                setNationalAddress(productData?.nationalAddress);
                // const frontImg = imagePath + "/" + productData?.image
                // setSelectedImage(frontImg);
                setSelectedImage(imageLiveUrl(productData?.image));
              
                setIsLoading(false);


            } catch (error) {
                // console.log(error);
                setIsLoading(false);
            }
        }
        fetchProductDetails();
    }, [productId]);


    
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
    
      const longitude = document.getElementById('longitude').value;
      const latitude = document.getElementById('Latitude').value;
    
      const imageFile = document.getElementById('imageInput').files[0];
    
      const formData = new FormData();
      // formData.append('product_id', '1');
      formData.append('user_id', memberData?.id);
      // formData.append('gcpGLNID', currentUser?.user?.gcpGLNID);
      formData.append('locationNameEn', locationEnglish);
      formData.append('locationNameAr', locationArabic);
      formData.append('AddressEn', addressEnglish);
      formData.append('AddressAr', addressArabic);
      formData.append('pobox', po);
      formData.append('postal_code', postal);
      formData.append('longitude', longitude);
      formData.append('latitude', latitude);
      formData.append('status', status);

      const imageOptional1Input = document.querySelector('#imageInput');
      if (imageOptional1Input.files && imageOptional1Input.files[0]) {
        formData.append('gln_image', imageFile);
      }
    
      newRequest
        .put(`/gln/${glnData?.id}`, formData)
        .then((response) => {
          // console.log(response.data);
       
          setIsLoading(false);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
  
          toast.success(response?.data?.message || `${t('GLN Updated Successfully')}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
  
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
  
          toast.error(err.response.data.error, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
    };
    

    
    // Image section
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage(imageUrl);
    };

    
  
  // Loaction section 
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const handleSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };
  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const newLocation = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
        };
        setSelectedLocation(newLocation);
      }
    }
  };
  // Current Loaction
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const RiyadhLocation = { lat: 24.7136, lng: 46.6753 }; // Riyadh, Saudi Arabia coordinates


  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          // console.log('Error getting current location:', error);
        }
      );
    } else {
      // console.log('Geolocation is not supported by this browser.');
    }
  }, []);



   // Marker drag and drop code
   const handleMarkerDragEnd = (event) => {
    const { latLng } = event;
    const latitude = latLng.lat();
    const longitude = latLng.lng();

    setMarkerPosition({ lat: latitude, lng: longitude });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        setSelectedLocation({ latitude, longitude, address });
        setCurrentLocation(null);
      }
    });
  };


  const handleMapClicked = (event) => {
    const { latLng } = event;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
  
    setMarkerPosition({ lat: latitude, lng: longitude });
  
    // Use the Geocoder service to get the address based on latitude and longitude
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        setSelectedLocation({ latitude, longitude, address });
        setCurrentLocation(null);
      }
    });
  };
  

// change the address when user selected on the map
  useEffect(() => {
    if (selectedLocation) {
      setAddressEnglish(selectedLocation.address);
      setAddressArabic(selectedLocation.address);
      setLatitude(selectedLocation.latitude);
      setLongitude(selectedLocation.longitude);
    }
  }, [selectedLocation]);

  const handleInputAddressChange = (e) => {
    setAddressEnglish(e.target.value);
    setAddressArabic(e.target.value);
    // setLatitude(e.target.value);
    // setLongitude(e.target.value);
  };


  const handleInputLatitudeChange = (e) => {
    setLatitude(e.target.value);
  }

  const handleInputLongitudeChange = (e) => {
    setLongitude(e.target.value);
  }




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

      <div className={`p-0 h-full bg-slate-100 ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
            <DashboardRightHeader title={`${t('Update GLN')}`}/>
        </div>

        <div className="flex flex-col justify-center items-center p-4">
                {" "}
                <div className="h-auto w-full p-5 bg-white">
                    <div className="">
                    <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5">
                      
                       <div className={`flex justify-start flex-col gap-2 text-xs sm:text-sm ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                  <p className="font-semibold"> {t('Complete Data')}</p>
                  <p>
                    {i18n.language === 'ar' ? (
                      <>
                          <span className="font-semibold">{memberData?.company_name_eng}</span>
                        :: {t('This number is registered to company')}
                      </>
                    ) : (
                      <>
                        {t('This number is registered to company')}: :{" "}
                       <span className="font-semibold">{memberData?.company_name_eng}</span>
                      </>
                    )}
                            {/* <span className="font-semibold">{memberData?.company_name_eng}</span> */}
                          
                        </p>
                        </div>
                    </div>
                    </div>

            {/* <div className='h-auto w-full p-6 shadow-xl'> */}
            <div className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button onClick={() => navigate(-1)} className="rounded-full bg-[#1E3B8B] font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                {i18n.language === 'ar' ? (
                  <>
                    {t('Back')} <i className="fas fa-arrow-right ml-1"></i>
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-left mr-1"></i> {t('Back')}
                  </>
                )}
                </button>
</div>

                {/* <form onSubmit={handleSubmit}> */}
                <form>
                    <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor='locationEnglish' className='text-secondary'>{t('Locations')} {t('Name[English]')}<span className='text-red-600'>*</span></label>
                            <input 
                            onChange={(e) => setLocationEnglish(e.target.value)}
                            value={locationEnglish}
                            id='locationEnglish' 
                            type='text' 
                            className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>


                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor='locationArabic' className='text-secondary'>{t('Locations')} {t('Name[Arabic]')}<span className='text-red-600'>*</span></label>
                            <input
                            onChange={(e) => setLocationArabic(e.target.value)} 
                            value={locationArabic}
                            id='locationArabic' 
                            type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>
                    </div>


              <div className={` flex flex-col sm:gap-8 gap-3  sm:justify-between mt-4 ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor='addressEnglish' className='text-secondary'>{t('Address')} {t('Name[English]')}<span className='text-red-600'>*</span></label>
                            <input
                            onChange={handleInputAddressChange} 
                            value={addressEnglish}
                            // onChange={(e) => setAddressEnglish(e.target.value)} 
                            // value={selectedLocation ? selectedLocation.address : ''}                  
                            id='addressEnglish' 
                            type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                            <label htmlFor='addressArabic' className='text-secondary'>{t('Address')} {t('Name[Arabic]')}<span className='text-red-600'>*</span></label>
                            <input
                            onChange={handleInputAddressChange} 
                            value={addressArabic}       
                            // onChange={(e) => setAddressArabic(e.target.value)} 
                            // value={addressArabic}
                            // value={selectedLocation ? selectedLocation.address : ''}                  
                            id='addressArabic' 
                            type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>
                    </div>

                   <div className={` flex flex-col sm:gap-8 gap-3  sm:justify-between mt-4 ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                          <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='po' className='text-secondary'>P.O.BOX<span className='text-red-600'>*</span></label>
                            <input
                            onChange={(e) => setPo(e.target.value)} 
                            value={po}
                            id='po' 
                            type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='postal' className='text-secondary'>{t('Postal Code')}<span className='text-red-600'>*</span></label>
                            <input
                            onChange={(e) => setPostal(e.target.value)} 
                            value={postal}
                            id='postal' 
                            type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>
                    </div>


              <div className={` flex flex-col sm:gap-8 gap-3  sm:justify-between mt-4 ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                       <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='longitude' className='text-secondary'>{t('Longitude')}<span className='text-red-600'>*</span></label>
                            <input
                             onChange={handleInputLongitudeChange} 
                             value={longitude}
                            id='longitude' 
                            type='number' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='Latitude' className='text-secondary'>{t('Latitude')}<span className='text-red-600'>*</span></label>
                            <input
                             onChange={handleInputLatitudeChange} 
                             value={latitude}
                            // value={selectedLocation ? selectedLocation.latitude : ''}
                            id='Latitude' 
                            type='text' className="border-1 w-full rounded-sm border-[#8E9CAB] p-2" />                      
                        </div>


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='status' className='text-secondary'>{t('Status')}<span className='text-red-600'>*</span></label>
                            <select 
                               onChange={(e) => setStatus(e.target.value)}
                                id='status' 
                                className="border-1 w-full rounded-sm border-[#8E9CAB] p-2"
                                value={status}
                                >
                                <option value=''>-{t('Select')}-</option>
                                <option value='active'>{t('Active')}</option>
                                <option value='inactive'>{t('Inactive')}</option>
                            </select>
                        </div>
                    </div>



                    <div className='flex justify-between items-center flex-wrap gap-5 mt-4'>
                     {/* Image container */}
                     <div className='flex justify-center items-center gap-7 flex-wrap mb-4'>
                            <div className="border-2 border-dashed h-56 w-56 relative flex justify-center">
                                <div className="absolute -bottom-4 flex justify-center items-center h-10 w-3/4 bg-secondary hover:bg-primary text-white font-body">
                                <label htmlFor="imageInput" className="cursor-pointer whitespace-nowrap">
                                     {t('Select Image')}
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
                </div>
              </form>
                

                  {/* Google Map Code inside the Form */}
                  <div style={{ height: '330px', width: '100%', marginTop: '40px' }}>
                    <GoogleMap
                      mapContainerStyle={{ height: '100%', width: '100%' }}
                      // center={
                      //   selectedLocation
                      //     ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude }
                      //     : currentLocation
                      // }
                      center={selectedLocation ? 
                        { lat: selectedLocation.latitude, lng: selectedLocation.longitude } 
                        : RiyadhLocation}
                   
                      zoom={12}
                      onClick={handleMapClicked}
                    >
                      <StandaloneSearchBox onLoad={handleSearchBoxLoad} onPlacesChanged={handlePlacesChanged}>
                        <input
                          type="text"
                          placeholder="Search for a location"
                          style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '240px',
                            height: '32px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-120px',
                          }}
                        />
                      </StandaloneSearchBox>

                      {currentLocation && <Marker position={currentLocation} />}

                      {/* {selectedLocation && (
                        <Marker
                          position={{
                            lat: selectedLocation.latitude,
                            lng: selectedLocation.longitude,
                          }}
                          address={selectedLocation.address}
                        />
                      )}    */}
                       {selectedLocation && (
                          <Marker
                            position={{
                              lat: selectedLocation.latitude,
                              lng: selectedLocation.longitude,
                            }}
                            draggable={true} // Enable marker dragging
                            onDragEnd={handleMarkerDragEnd} // Handle marker drag event
                            address={selectedLocation.address}
                          />
                        )}
                    </GoogleMap>
                  </div>

              {selectedLocation && (
                <>
                  <p>{localStorage.setItem('latitude', selectedLocation.latitude)}</p>
                  <p>{localStorage.setItem('longitude', selectedLocation.longitude)}</p>
                  <p>{localStorage.setItem('address', selectedLocation.address)}</p>
                </>
              )}

                {/* Submit Button */}     
                <form onSubmit={handleSubmit} className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                    <button type='submit' className="rounded-sm bg-secondary font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-primary">
                          <i className="fas fa-check-circle mr-1"></i> {t('SAVE CHANGES')}
                    </button>
                </form>             

            </div>
        </div>

      </div>
    </div>
  )
}

export default UpdateGLN