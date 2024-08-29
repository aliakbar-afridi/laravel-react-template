import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Services/api";

// to manage the authentication state.
const AuthContext = createContext();

// To provide the authentication context to its child components
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });
    const [authenticated, setAuthenticated] = useState(getCookie('authenticated') == 'true' || false);
    const navigate = useNavigate();
    const loginAction = async (data, next = null) => {
        try {
            setUser(data.user);
            setAuthenticated(true);
            setCookie('authenticated', true, 2)
            localStorage.setItem('user', JSON.stringify(data.user))
            if (data.user.email_verified_at == null) {
                navigate("/verify-email");
            } else if (next) {
                navigate(next)
            }
            else {
                navigate("/dashboard");
            }
            return;
        } catch (err) {
            console.error(err);
        }
    };

    const logOutAction = () => {
        apiClient.post('/logout').then(response => {

        }).finally((error) => {
            setUser(null);
            setAuthenticated(false);
            deleteCookie('authenticated');
            localStorage.removeItem('user');
            sessionStorage.clear(); // clear Laravel session
            navigate("/login");
        })
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, loginAction, logOutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

// to access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};


function setCookie(name, value, hours) {
    var date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    // Set the cookie's expiration date to a time in the past
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default AuthProvider;

