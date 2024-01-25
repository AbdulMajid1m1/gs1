import React, { createContext, useState } from 'react';

export const MapContext = createContext();

const MapProvider = ({ children }) => {
    const [locationsapi, setLocationsapi] = useState([]);
    const [directions, setDirections] = useState([]);

    return (
        <MapContext.Provider value={{
            locationsapi,
            setLocationsapi,
            directions,
            setDirections
        }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
