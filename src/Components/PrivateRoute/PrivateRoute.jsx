import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { ColorRing } from 'react-loader-spinner'


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        )
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to="/login"></Navigate>
    );
};

export default PrivateRoute;