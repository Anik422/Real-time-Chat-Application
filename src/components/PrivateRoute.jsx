import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const isLoggedin = useAuth();
    return (
        isLoggedin ? children : <Navigate to="/" />
    )

}

export default PrivateRoute