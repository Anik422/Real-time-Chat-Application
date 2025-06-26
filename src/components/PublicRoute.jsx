import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const isLoggedin = useAuth();
    return (
        !isLoggedin ? children : <Navigate to="/inbox" />
    )

}

export default PublicRoute