import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../components/ui/Spinner';

const PrivateRoute = ({children}) => {
    const { user, loading } = use(AuthContext)

    const location = useLocation();

    if(loading) {
        return <Spinner/>
    }

    if(!user) {
        return <Navigate state={location?.pathname} to ='/signin'/>
    }

    return children 
    
};

export default PrivateRoute;