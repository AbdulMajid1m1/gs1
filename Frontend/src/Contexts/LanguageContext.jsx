// LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(sessionStorage.getItem('selectedLanguaged') || 'ar');

    useEffect(() => {
        sessionStorage.setItem('selectedLanguaged', selectedLanguage);
    }, [selectedLanguage]);

    return (
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
