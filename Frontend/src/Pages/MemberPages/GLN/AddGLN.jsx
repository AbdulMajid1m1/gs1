import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { RiseLoader } from 'react-spinners';

const AddGLN = () => {
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
    const navigate = useNavigate()

  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  
  //   const longitude = document.getElementById('longitude').value;
  //   const latitude = document.getElementById('Latitude').value;
  
  //   const imageFile = document.getElementById('imageInput').files[0];
  
  //   const formData = new FormData();
  //   formData.append('product_id', '1');
  //   // formData.append('gcpGLNID', currentUser?.user?.gcpGLNID);
  //   formData.append('locationNameEn', locationEnglish);
  //   formData.append('locationNameAr', locationArabic);
  //   formData.append('AddressEn', selectedLocation ? selectedLocation.address : '');
  //   formData.append('AddressAr', selectedLocation ? selectedLocation.address : '');
  //   formData.append('pobox', po);
  //   formData.append('postal_code', postal);
  //   formData.append('longitude', longitude);
  //   formData.append('latitude', latitude);
  //   // formData.append('user_id', currentUser?.user?.id);
  //   formData.append('status', status);
  //   formData.append('image', imageFile);
  
  //   phpRequest
  //     .post("/member/create/GLN", formData)
  //     .then((response) => {
  //       console.log(response.data);
     
  //       setIsLoading(false);
  //       setTimeout(() => {
  //         navigate(-1);
  //       }, 1500);
  
  //       e.target.reset();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };
  

    
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
          console.log('Error getting current location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
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
  

  return (
    <div>

            {isLoading &&

            <div className='loading-spinner-background'
            style={{
                zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


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

        <div className="p-3 h-full sm:ml-72">

        <div className='h-auto w-full p-1'>
            <div className='h-16 w-full shadow-xl flex justify-start items-center px-10 border-l-2 border-[#e49515]'>
                <p className='sm:text-2xl text-sm font-body'>Add GLN</p>
            </div>
        </div>

        <div className='h-auto w-full px-0 pt-2 shadow-xl'>
            <div className='h-auto w-full p-6 shadow-xl'>
                <button onClick={() => navigate(-1)} className="rounded-full bg-secondary font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    <i className="fas fa-arrow-left mr-1"></i> Back
                </button>


                {/* <form onSubmit={handleSubmit}> */}
                  <form>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='locationEnglish'>Location Name [English]<span className='text-red-600'>*</span></label>
                            <input 
                            onChange={(e) => setLocationEnglish(e.target.value)}
                            id='locationEnglish' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='locationArabic'>Location Name [Arabic]<span className='text-red-600'>*</span></label>
                            <input
                            onChange={(e) => setLocationArabic(e.target.value)} 
                            id='locationArabic' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='addressEnglish'>Address [English]<span className='text-red-600'>*</span></label>
                            <input
                              value={selectedLocation ? selectedLocation.address : ''}
                            onChange={(e) => setAddressEnglish(e.target.value)} 
                            id='addressEnglish' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='addressArabic'>Address [Arabic]<span className='text-red-600'>*</span></label>
                            <input
                              value={selectedLocation ? selectedLocation.address : ''}
                            onChange={(e) => setAddressArabic(e.target.value)} 
                            id='addressArabic' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='po'>P.O.BOX<span className='text-red-600'>*</span></label>
                            <input
                            onChange={(e) => setPo(e.target.value)} 
                            id='po' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='postal'>Postal Code<span className='text-red-600'>*</span></label>
                            <input
                            onChange={(e) => setPostal(e.target.value)} 
                            id='postal' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='longitude'>Longitude<span className='text-red-600'>*</span></label>
                            <input
                            // value={localStorage.getItem('longitude')}
                            value={selectedLocation ? selectedLocation.longitude : ''}                  
                            id='longitude' 
                            type='number' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='Latitude'>Latitude<span className='text-red-600'>*</span></label>
                            <input
                            //  value={localStorage.getItem('latitude')}
                            value={selectedLocation ? selectedLocation.latitude : ''}
                            id='Latitude' 
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='status'>Status<span className='text-red-600'>*</span></label>
                            <select 
                               onChange={(e) => setStatus(e.target.value)}
                                id='status' 
                                className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3'
                                value={status}
                                >
                                <option value=''>-select-</option>
                                <option value='1'>Active</option>
                                <option value='0'>Inactive</option>
                            </select>
                        </div>
                    </div>



                    <div className='flex justify-between items-center flex-wrap gap-5'>
                     {/* Image container */}
                     <div className='flex justify-center items-center gap-7 flex-wrap mb-4'>
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
                </div>

                </form>


            {/* Google Map Code  */}
          <div style={{ height: '330px', width: '100%', marginTop: '30px' }}>
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              // center={
              //   selectedLocation
              //     ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude }
              //     : currentLocation
              // }
              center={selectedLocation ? 
                { lat: selectedLocation.latitude, lng: selectedLocation.longitude } 
                : 
                RiyadhLocation}

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
          <p>{localStorage.setItem('postal', selectedLocation.postal)}</p>
        </>
      )}

            {/* <form onSubmit={handleSubmit}> */}
                <button type='submit' className="rounded-full bg-secondary font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-primary">
                    <i className="fas fa-check-circle mr-1"></i> Submit
                </button>
            {/* </form> */}
           </div>
        </div>

      </div>
    </div>
  )
}

export default AddGLN