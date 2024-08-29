import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import FormInput from "@/Components/Form/FormInput";
import { Link } from 'react-router-dom'
import apiClient, { baseClient } from "../../Services/api";
import { useAuth } from "../../Hooks/AuthProvider";
export default function Register() {
    const auth = useAuth();

    const [processing, setProcessing] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: {}
    });

    const submit = (e) => {
        e.preventDefault();

        // Get CSRF token
        setProcessing(true);
        baseClient.get('/sanctum/csrf-cookie', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(() => {
            apiClient.post('/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            }).then((response) => {
                auth.loginAction(response.data);
            }).catch((error) => {
                setData({
                    ...data,
                    errors: error.response?.data?.errors ?? {}
                });

            });
        }).catch((error) => {
            setData({
                ...data,
                errors: error.response?.data?.errors ?? {}
            });
        }).finally(() => setProcessing(false));


    };

    const onChange = (name, value) => setData({
        ...data,
        [name]: value,
    });

    return (
        < >
            <p className="register-box-msg">Register your account</p>
            <form onSubmit={submit}>

                <FormInput
                    label="Name"
                    name="name"
                    id="name"
                    isRequired={true}
                    type="text"
                    message={data.errors.name}
                    onChange={onChange}
                    value={data.name}
                    groupClass="mb-0"
                    isFocused={true}
                />

                <FormInput
                    label="Email"
                    name="email"
                    id="email"
                    isRequired={true}
                    type="email"
                    message={data.errors.email}
                    onChange={onChange}
                    value={data.email}
                    groupClass="mb-0"
                />

                <div className="row">
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="Password"
                            name="password"
                            id="password"
                            isRequired={true}
                            type="password"
                            message={data.errors.password}
                            onChange={onChange}
                            value={data.password}
                            groupClass="mb-0"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="Confirm Password"
                            name="password_confirmation"
                            id="password_confirmation"
                            isRequired={true}
                            type="password"
                            message={data.errors.password_confirmation}
                            onChange={onChange}
                            value={data.password_confirmation}
                            groupClass="mb-0"
                        />
                    </div>
                </div>
                <div className="d-grid gap-3 mt-4">
                    <PrimaryButton processing={processing}>
                        Register
                    </PrimaryButton>
                    <Link
                        to={'/login'}
                        className=" text-center text-dark"
                    >
                        Already registered?
                    </Link>
                </div>
            </form>
        </>
    );
}
