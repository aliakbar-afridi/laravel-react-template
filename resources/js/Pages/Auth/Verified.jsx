import PrimaryButton from "@/Components/PrimaryButton";
import apiClient from "../../Services/api";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from "../../Hooks/AuthProvider";
import { LOGO_URL } from "../../Constants/Constants";

export default function Verified() {
    const auth = useAuth();
    const [state, setState] = useState({
        processing: true,
        status: null,
        errors: null,
    });
    useEffect(() => {
        apiClient.get('/user').then((response) => {
            auth.loginAction(response.data)
        }).catch((error) => setState({
            ...state,
            errors: error.response?.data?.errors
        })).finally(() => setState({
            ...state,
            processing: false
        }));
    }, []);

    return (
        <div className="login-page" >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 ">
                    <div className="login-logo">
                        <img className="rounded-circle shadow-sm mb-2 p-2" src={LOGO_URL} width={100} />
                    </div>
                    <div className="card">
                        {state.processing ? (
                            <div className="d-flex justify-content-center w-100 flex-column align-items-center">
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <p className='mt-2'>Verifying...</p>
                            </div>
                        ) : (
                            <div className="email-container container my-5 p-4 border rounded text-center">
                                <h2 className="fw-bold">Email Verified</h2>
                                <div className="email-icon my-3">
                                    <i className="bi bi-envelope-check-fill" style={{ fontSize: '50px', color: '#0d6efd' }}></i>
                                </div>
                                <p className="fw-bold">Hello {auth.user.name},</p>
                                <p>Thank you, your email has been verified. Your account is now active.</p>
                                <p>Please use the link below to open dashboard.</p>
                                <Link to={"/dashboard"}>Dashboard</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
