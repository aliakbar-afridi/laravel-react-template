import PrimaryButton from "@/Components/PrimaryButton";
import FormInput from "@/Components/Form/FormInput";
import { useState } from "react";
import apiClient from "../../Services/api";

export default function ForgotPassword() {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        email: "",
        errors: null,
        status: null,
    });

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true)
        apiClient.get('/sanctum/csrf-cookie', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(() => {
            apiClient.post('/forgot-password', {
                email: data.email,
            }).then((response) => {
                setData({
                    ...data,
                    status: response.data?.status
                })
            }).catch((error) => setData({
                ...data,
                errors: error.response?.data?.errors
            }))
        }).finally(() => setProcessing(false));
    };

    return (
        <div className="login-card-body">
            <p>Forgot your password? Enter your Email.</p>
            <form onSubmit={submit}>
                <FormInput
                    label="Email"
                    name="email"
                    id="email"
                    isRequired={true}
                    type="email"
                    message={data.errors?.email}
                    onChange={(name, value) => setData({
                        ...data,
                        email: value,
                    })}
                    value={data.email}
                    groupClass="mb-0"
                    isFocused={true}
                />
                <div className="d-flex justify-content-center">
                    <PrimaryButton disabled={processing} processing={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
            {data.status &&
                (<div className=" mt-3 alert alert-primary p-1" role="alert">
                    {data.status}
                </div>)}
        </div>
    );
}
