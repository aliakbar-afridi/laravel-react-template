import PrimaryButton from "@/Components/PrimaryButton";
import apiClient from "../../Services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from "../../Hooks/AuthProvider";
import Guest from "../../Layouts/GuestLayout";
import { LOGO_URL } from "../../Constants/Constants";

export default function VerifyEmail({ status }) {
    const auth = useAuth();

    const [state, setState] = useState({
        processing: false,
        status: null,
        errors: null,
    });

    const submit = (e) => {
        e.preventDefault();
        setState({
            ...state,
            processing: true
        })
        apiClient.post('/email/verification-notification').then((response) => {
            setState({
                ...state,
                status: response.data?.message
            })
        }).catch((error) => setState({
            ...state,
            errors: error.response?.data?.errors
        })).finally(() => setState({
            ...state,
            processing: false
        }));

    };

    return (
        <div className="login-page" >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 ">
                    <div className="login-logo">
                        <img className="rounded-circle shadow-sm mb-2 p-2" src={LOGO_URL} width={100} />
                    </div>
                    <div className="card  ">
                        <div className="card-body">
                            <div className="mb-4 text-sm text-gray-600">
                                Thanks for signing up! Before getting started, could you verify
                                your email address by clicking on the link we just emailed to
                                you? If you didn't receive the email, we will gladly send you
                                another.
                            </div>

                            {status === "verification-link-sent" && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    A new verification link has been sent to the email address
                                    you provided during registration.
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mt-4 d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                    <PrimaryButton
                                        className="text-nowrap"
                                        disabled={state.processing}
                                        processing={state.processing}
                                    >
                                        Resend Verification Email
                                    </PrimaryButton>
                                    <Link
                                        to={"profile/edit"}
                                        as="button"
                                        className="btn btn-secondary"
                                    >
                                        Profile
                                    </Link>
                                    <PrimaryButton
                                        onClick={auth.logOutAction}
                                        method="post"
                                        as="button"
                                        className="btn btn-secondary text-nowrap"
                                    >
                                        Log Out
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
