import {  useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Form/Checkbox";
import FormInput from "@/Components/Form/FormInput";
import { Link } from "react-router-dom";
import apiClient from "../../Services/api";
import { useAuth } from "../../Hooks/AuthProvider";
// TODO: Password input not found

export default function Login() {
    const auth = useAuth();
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
        errors: {},
    });

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        apiClient.get('/sanctum/csrf-cookie', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(() => {

            apiClient.post('/login', {
                email: data.email,
                password: data.password
            }, {

            }).then((response) => {
                auth.loginAction(response.data);
            }).catch((error) => setData({
                ...data,
                errors: error.response?.data?.errors
            }))
        }).catch((error) => setData({
            ...data,
            errors: error
        })).finally(() => setProcessing(false));


    };
    const onChange = (name, value) => setData({
        ...data,
        [name]: value
    });
    return (

        <div className="login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form method="post" onSubmit={submit}>
                <div className="row">
                    <div className="col-12">
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
                            isFocused={true}
                        />
                    </div>
                </div>
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
                    isFocused={true}
                />
                <div className="row">
                    <div className="col-8">
                        <Checkbox
                            label="Remember me"
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-4">
                        <PrimaryButton
                            className="w-100"
                            processing={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </div>
            </form>
            {/* <PrimaryButton onClick={(e) => {
                apiClient.get('/user').then((response) => {
                    console.log(response.data)
                }).catch((error) => console.log(error))
            }}>
                dd
            </PrimaryButton> */}
            <Link to={'/password-reset'}>
                Forgot your password?
            </Link>
            <p className="mb-0">
                <Link to={"/register"}>
                    Register a new account
                </Link>

            </p>
        </div>
    );
}
