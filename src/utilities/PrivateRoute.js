import React from 'react';
import getUserInfo from './decodeJwt';
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const auth = getUserInfo(); 
    return auth ? children: <Navigate to="/" />;
}

export default PrivateRoute;