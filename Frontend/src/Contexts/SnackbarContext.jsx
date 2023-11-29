import React, { createContext, useState, useCallback } from 'react';
import CustomSnakebar from '../utils/CustomSnackbar';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbarData, setSnackbarData] = useState(null);

    const openSnackbar = useCallback((message, severity) => {
        setSnackbarData({ message, severity });
    }, []);

    const closeSnackbar = useCallback(() => {
        setSnackbarData(null);
    }, []);

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}
            {snackbarData && (
                <CustomSnakebar
                    message={snackbarData.message}
                    severity={snackbarData.severity}
                    onClose={closeSnackbar}
                />
            )}
        </SnackbarContext.Provider>
    );
};
