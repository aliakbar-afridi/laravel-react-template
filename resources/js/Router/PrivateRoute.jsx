import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/AuthProvider";

const PrivateRoute = () => {
    const user = useAuth();
    if (!user.authenticated) return <Navigate to="/login" />;
    return <Outlet />;
};

export default PrivateRoute;
