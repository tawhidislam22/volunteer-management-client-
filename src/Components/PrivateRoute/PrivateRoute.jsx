import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { ColorRing } from 'react-loader-spinner'


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location=useLocation()
    
    if (user) {
        
        return children;
    }
    
    return (
        <Navigate to="/login" state={location?.pathname}></Navigate>
    );
};

export default PrivateRoute;