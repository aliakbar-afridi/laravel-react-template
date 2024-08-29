import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/AuthProvider";

const VerifiedRoute = () => {
    const auth = useAuth();
    if (!auth.user.email_verified_at) return <Navigate to="/verify-email" />;
    return <Outlet />;
};

export default VerifiedRoute;
