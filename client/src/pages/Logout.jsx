import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../tokens/storeTokens";

export const Logout = () => {
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser();
    }, [logoutUser]);

    return <Navigate to="/login" />;
};
