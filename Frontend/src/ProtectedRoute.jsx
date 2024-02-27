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
        const toastShownKey = `toastShown_${requiredPermission}`;
        if (!sessionStorage.getItem(toastShownKey)) {
            toast.error(`You don't have permission ${requiredPermission} to access this page`);
            sessionStorage.setItem(toastShownKey, 'true');
        }
        return <Navigate to="/admin/dashboard" />;
    }
    

    return children;
};

export default ProtectedRoute;
