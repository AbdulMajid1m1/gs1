import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { GoogleMap, StandaloneSearchBox, Marker, OverlayView } from '@react-google-maps/api';
const drawerWidth = 220;
const MapEvents = ({ locations = [] }) => {
    const [selectedMarker, setSelectedMarker] = useState({ index: null, position: null });
    const [isGoogleLoaded, setGoogleLoaded] = useState(false);
    // Location section 
    const [selectedLocation, setSelectedLocation] = useState();
    const RiyadhLocation = { lat: 24.7136, lng: 46.6753 }; // Riyadh, Saudi Arabia coordinates
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

    // Current Location
    const [currentLocation, setCurrentLocation] = useState(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (window.google) {
                clearInterval(intervalId);
                setGoogleLoaded(true);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, []);
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
    if (!isGoogleLoaded) {
        return null;
    }

    const handleMapClicked = (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        // Use the Geocoder service to get the address based on latitude and longitude
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;
                setSelectedLocation({ latitude, longitude, address });
                setCurrentLocation(null);
            }
        });
    };

    return (
        <div className=''>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    className='fortrans'
                    position='fixed'
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                ></AppBar>
                <Box
                    className=''
                    sx={{
                        flexGrow: 1,
                        my: 5,
                        mx: 1,
                        width: { sm: `calc(100% - ${drawerWidth}px)` }
                    }}
                >
                    <div className="container mx-3 mt-5" style={{ width: "95%" }}>
                        <GoogleMap
                            mapContainerStyle={{ height: '400px', width: '100%' }}
                            center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : RiyadhLocation}
                            zoom={currentLocation ? 13 : 10}
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

                            {currentLocation && <Marker position={RiyadhLocation} />}

                            {locations.map((item, index) => (
                                item && item.latitude && item.longitude && (
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: parseFloat(item.latitude),
                                            lng: parseFloat(item.longitude),
                                        }}
                                        onMouseOver={() => setSelectedMarker({ index, position: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) } })}
                                        onMouseOut={() => setSelectedMarker({ index: null, position: null })}
                                    />
                                )
                            ))}

                            {selectedMarker.index !== null && (
                                <OverlayView
                                    position={selectedMarker.position}
                                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                >
                                    <div
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            border: '1px solid #ccc',
                                            padding: 10,
                                            borderRadius: 8,
                                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                                            minWidth: 200,
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold', marginBottom: 5 }}>GLN Location Details</p>
                                        <p>Address: {locations[selectedMarker.index].locationNameEn}</p>
                                        {/* <p>Longitude: {locations[selectedMarker.index].longitude}</p> */}
                                        <br />
                                        {/* <p className="font-semibold">EventID: {locations[selectedMarker.index].name}</p> */}
                                    </div>
                                </OverlayView>
                            )}
                        </GoogleMap>
                    </div>
                </Box>
            </Box>
        </div >
    )
}

export default MapEvents;
