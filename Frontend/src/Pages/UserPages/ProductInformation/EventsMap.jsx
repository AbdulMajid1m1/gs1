import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { GoogleMap, StandaloneSearchBox, Marker, Polyline, DirectionsRenderer, OverlayView, InfoWindow } from '@react-google-maps/api';

const style = {
    width: '95%',
    height: '80%'
}
const containerStyle = {
    // position: 'relative',
    width: '95%',
    height: '80%'
}

const drawerWidth = 220

const EventsMap = ({ google, selectedBatch, selectedSerial }) => {

    const barcodeData = JSON.parse(sessionStorage.getItem("barcodeData"));
    const [directions, setDirections] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState({ index: null, position: null });
    // import { GoogleMap, StandaloneSearchBox, Marker, Polyline } from '@react-google-maps/api';
    const [locationsapi, setlocationsapi] = useState([]);
    const gtin = sessionStorage.getItem("gtin");
    console.log(gtin);

    const [lineCoordinates, setLineCoordinates] = useState([]);
    const filterLocationsBySelection = (locations) => {
        return locations.filter(item => {
            if (!selectedBatch && !selectedSerial) return true;
            if (selectedBatch && !selectedSerial) return true;
            if (!selectedBatch && selectedSerial) return item.serial === selectedSerial;
            return item.serial === selectedSerial;
        });
    }
    useEffect(() => {
        fetchLocations();
        // getCurrentLocation();
    }, [selectedBatch, selectedSerial]);
    const fetchLocations = async () => {
        const bodyData = {
            gtin: barcodeData?.gtin,
        };
        console.log(selectedBatch, selectedSerial)
        if (selectedBatch) bodyData.batch = selectedBatch;
        if (selectedSerial) bodyData.serial = selectedSerial;


        console.log(bodyData)
        try {
            // const res = await axios.get(`https://gs1ksa.org/api/search/event/gtin/with/maps`, {
            const res = await newRequest.get("/foreignGtin/searchGTINwithMap", {
                params: bodyData
            });
            const locations = res.data?.googleMap?.locations;
            console.log(locations)

            if (Array.isArray(locations)) {
                const allLocations = locations
                    .filter(location => location.latitude && location.longitude)
                    .map(location => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        name: location?.name,
                        locationName: location?.locationName,
                        serial: location?.serial,
                        description: location?.description,
                        type: location?.type,
                    }));

                setlocationsapi(allLocations);

                const filteredLocations = filterLocationsBySelection(allLocations);

                // Break the locations into blocks of up to 10
                const blocks = [];
                let k = 0;
                for (let i = 0; i < filteredLocations.length; i++) {
                    if (i !== 0 && i % 10 === 0) {
                        k++;
                    }
                    if (typeof blocks[k] === 'undefined') {
                        blocks[k] = [];
                    }
                    blocks[k].push(filteredLocations[i]);
                }

                const ds = new window.google.maps.DirectionsService();
                const fetchedDirections = [];

                const promiseArr = blocks.map(block => {
                    return new Promise((resolve, reject) => {
                        const waypts = [];
                        for (let j = 1; j < block.length - 1; j++) {
                            waypts.push({
                                location: `${block[j].latitude},${block[j].longitude}`,
                                stopover: false
                            });
                        }

                        ds.route({
                            origin: `${block[0].latitude},${block[0].longitude}`,
                            destination: `${block[block.length - 1].latitude},${block[block.length - 1].longitude}`,
                            waypoints: waypts,
                            travelMode: 'DRIVING'
                        }, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                fetchedDirections.push(result);
                                resolve(result);
                            } else if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
                                console.warn("No route found for the following data, ignoring this route:");
                                console.warn("Origin:", `${block[0].latitude},${block[0].longitude}`);
                                console.warn("Destination:", `${block[block.length - 1].latitude},${block[block.length - 1].longitude}`);
                                console.warn("Waypoints:", waypts);
                                resolve();  // Resolve without adding to fetchedDirections
                            } else {
                                console.error("Other error fetching directions for block:", block);
                                console.error("Status:", status);
                                reject(status);
                            }
                        });


                    });
                });

                Promise.all(promiseArr)
                    .then(() => {
                        setDirections(fetchedDirections);
                    })
                    .catch(error => {
                        console.error("Error fetching some directions:", error);
                    });

                sessionStorage.setItem("mapsResponse", JSON.stringify(res?.data));
            } else {
                console.log('Invalid API response');
            }
        } catch (err) {
            console.log(err);
        }
    };






    // Loaction section 
    const [selectedLocation, setSelectedLocation] = useState();
    const RiyadhLocation = { lat: 24.7136, lng: 46.6753 }; // Riyadh, Saudi Arabia coordinates
    const [searchBox, setSearchBox] = useState(null);
    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
        // setSearchBox(new window.google.maps.places.SearchBox(map.getDiv()));

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
    useEffect(() => {
        const apiKey = 'AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU';
        console.log(apiKey);
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
                console.log(address, latitude, longitude);
                setCurrentLocation(null);
            }

        });
    };

    return (
        <div className=''>
            <Box sx={{ display: 'flex' }}>
                {/* <Sidebard /> */}
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

                            {filterLocationsBySelection(locationsapi).map((item, index) => (
                                item && item.latitude && item.longitude && (
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: parseFloat(item.latitude),
                                            lng: parseFloat(item.longitude),
                                        }}
                                        icon={
                                            item.serial === barcodeData?.serial ? {
                                                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                                                scaledSize: new window.google.maps.Size(40, 40)
                                            } :
                                                item.type === 'brand_owner' ? {
                                                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                                    scaledSize: new window.google.maps.Size(40, 40)
                                                } :
                                                    {
                                                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                                        scaledSize: new window.google.maps.Size(40, 40)
                                                    }
                                        }
                                        address={item.address}
                                        onMouseOver={() => setSelectedMarker({ index, position: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) } })}
                                        onMouseOut={() => setSelectedMarker({ index: null, position: null })}
                                    />
                                )
                            ))}
                            {directions && directions.map((direction, index) => (
                                <DirectionsRenderer
                                    key={index}
                                    directions={direction}
                                    options={{ suppressMarkers: true }}
                                />
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
                                        <p style={{ fontWeight: 'bold', marginBottom: 5 }}>Gtrack Product Location Details</p>
                                        <p>Latitude: {locationsapi[selectedMarker.index].latitude}</p>
                                        <p>Longitude: {locationsapi[selectedMarker.index].longitude}</p>
                                        <br />
                                        <p className="font-semibold">EventID: {locationsapi[selectedMarker.index].name}</p>
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


export default EventsMap