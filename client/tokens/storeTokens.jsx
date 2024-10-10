import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokens = (serverToken) => {
        setToken(serverToken); 
        localStorage.setItem('token', serverToken); 
    };

    const isLoggedIn = !!token; 
    console.log('isLoggedIn : ', isLoggedIn);

    const logoutUser = () => {
        setToken(null); 
        localStorage.removeItem("token"); 
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokens, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
}
