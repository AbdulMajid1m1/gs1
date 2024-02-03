// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
    const { permissions } = useContext(AuthContext);
    
    console.log("Permissions:", permissions);
    console.log("Required Permission:", requiredPermission);
    if (!permissions.includes(requiredPermission)) {
        // Redirect user or show an unauthorized component
        return <Navigate to="/admin/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;



