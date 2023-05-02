import React from 'react';
import getUserInfo from './decodeJwt';
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const auth = getUserInfo(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? children: <Navigate to="/" />;
}

export default PrivateRoute;