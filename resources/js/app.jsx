import './bootstrap';
import "../scss/app.scss";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "overlayscrollbars/overlayscrollbars.css";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';
import Login from './Pages/Auth/Login';
import Guest from './Layouts/GuestLayout';
import Register from './Pages/Auth/Register';
import AuthProvider from "./Hooks/AuthProvider";
import PrivateRoute from './Router/PrivateRoute';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import VerifyEmail from './Pages/Auth/VerifyEmail';
import VerifiedRoute from './Router/VerifiedRoute';
import Verified from './Pages/Auth/Verified';
import UsersIndex from './Pages/Users/UsersIndex';
import { ToastContainer } from 'react-toastify';
import ProfileEdit from './Pages/Profile/ProfileEdit';
import UserShow from './Pages/Users/UserShow';
import RolesIndex from './Pages/Roles/Index';
import RoleEdit from './Pages/Roles/Edit';
import RoleCreate from './Pages/Roles/Create';

const MyApp = () => {
    return (
        <BrowserRouter basename="/">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Guest />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/password-reset" element={<ForgotPassword />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/verified" element={<Verified />} />
                        <Route path="/profile" element={<ProfileEdit />} />
                        <Route element={<VerifiedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/users" >
                                <Route path="/users" index={true} element={<UsersIndex />} />
                                <Route path="/users/:id" index={true} element={<UserShow />} />
                            </Route>
                            <Route path="/roles" >
                                <Route path="/roles" index={true} element={<RolesIndex />} />
                                <Route path="/roles/edit/:id" index={true} element={<RoleEdit />} />
                                <Route path="/roles/create" index={true} element={<RoleCreate />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            {/* Same as */}
            <ToastContainer />
        </BrowserRouter>
    );
}
const root = createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode><MyApp /></React.StrictMode>);
