// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredPermission }) => {
    const { permissions } = useContext(AuthContext);

    console.log("Permissions:", permissions);
    console.log("Required Permission:", requiredPermission);
    // in session storage adminData.is_super_admin is 1 then user is super admin and can access all the routes
    if (sessionStorage.getItem('adminData') && JSON.parse(sessionStorage.getItem('adminData')).is_super_admin === 1) {
        return children;
    }

    if (!permissions.includes(requiredPermission)) {
        // Redirect user or show an unauthorized component
        // show toast with proper message that you 
        toast.error(`You don't have permission ${requiredPermission} to access this page`);
        return <Navigate to="/admin/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;



