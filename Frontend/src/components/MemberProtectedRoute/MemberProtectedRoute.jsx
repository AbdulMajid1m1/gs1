import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MemberProtectedRoute = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    useEffect(() => {
        const login = sessionStorage.getItem('memberData');
        if (!login) {
            navigate('/email-address');
            toast.error('Please login first');
        }
    }, []);
  return (
    <div>
        <Component />
    </div>
  )
}

export default MemberProtectedRoute