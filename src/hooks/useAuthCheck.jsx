


import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

function useAuthCheck() {

    const [authChecked, setAuthChecked] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const localAuth = localStorage?.getItem('auth');
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user
                }));
            }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}

export default useAuthCheck