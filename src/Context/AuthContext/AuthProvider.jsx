import AuthContext from "./AuthContext";


const AuthProvider = ({children}) => {
    const info={}
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;