import React, { useContext, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredPermission }) => {
    const { permissions } = useContext(AuthContext);
    const adminData = sessionStorage.getItem('adminData');
    console.log(adminData);
    // Check if admin data exists
    if (!adminData) {
        toast.error('Please log in to access this page');
        return <Navigate to="/admin/admin-login" />;
    }

    const parsedAdminData = JSON.parse(adminData);

    // Checking for super admin
    if (parsedAdminData.is_super_admin === 1) {
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
