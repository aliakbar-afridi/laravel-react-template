import { Navigate, Outlet } from "react-router-dom";
import { LOGO_URL } from "../Constants/Constants";
import { useAuth } from "../Hooks/AuthProvider";

export default function Guest() {
    const user = useAuth();
    if (user.authenticated) return <Navigate to="/dashboard" />;
    return (
        <div className="login-page" >
            <div className="login-logo">
                <img className="rounded-circle shadow-sm mb-2 p-2" src={LOGO_URL} width={100} />
            </div>
            <div className="card" style={{ minWidth: 400 }}>
                <div className="card-body"><Outlet /></div>
            </div>
        </div>
    );
}
