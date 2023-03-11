import getUserInfo from "./decodeJwt";
import { Navigate } from "react-router-dom";

const requireAuth = ({children}) => {
    if(!getUserInfo()){
        return <Navigate to='/login'/>
    }

    return children
}

export default requireAuth