import React, { useContext, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredPermission }) => {
    const { permissions } = useContext(AuthContext);
    const toastShownRef = useRef(false); // useRef to track if the toast has been shown

    // Checking for super admin
    if (sessionStorage.getItem('adminData') && JSON.parse(sessionStorage.getItem('adminData')).is_super_admin === 1) {
        return children;
    }

    if (!permissions.includes(requiredPermission)) {
        // Only show the toast if it hasn't been shown before
        if (!toastShownRef.current) {
            toast.error(`You don't have permission ${requiredPermission} to access this page`);
            toastShownRef.current = true; // Mark the toast as shown
        }
        // Redirect user or show an unauthorized component
        return <Navigate to="/admin/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
