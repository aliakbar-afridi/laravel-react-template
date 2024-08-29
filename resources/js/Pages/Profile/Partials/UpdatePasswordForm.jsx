import { useState, useRef } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import FormInput from "@/Components/Form/FormInput";
import apiClient from "../../../Services/api";
import showToast from "../../../Services/toast";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [state, setState] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
        errors: {},
        processing: false,
        recentlySuccessful: false,
    });

    const updatePassword = (e) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, processing: true, errors: {} }));

        apiClient.put('/password', {
            current_password: state.current_password,
            password: state.password,
            password_confirmation: state.password_confirmation,
        }).then((response) => {
            setState({
                current_password: "",
                password: "",
                password_confirmation: "",
                errors: {},
                processing: false,
                recentlySuccessful: true,
            });
            showToast(response.data?.message);
        }).catch((error) => {
            const responseErrors = error.response?.data.errors || {};
            setState((prevState) => ({
                ...prevState,
                processing: false,
                errors: responseErrors,
            }));
            showToast("Failed to update password");
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg fs-4">Update Password</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <FormInput
                    label="Current Password"
                    name="current_password"
                    id="current_password"
                    isRequired={true}
                    type="password"
                    message={state.errors.current_password}
                    onChange={(name, value) => setState({ ...state, current_password: value })}
                    value={state.current_password}
                    groupClass="mb-0"
                    isFocused={true}
                    inputRef={currentPasswordInput}
                />

                <FormInput
                    label="New Password"
                    name="password"
                    id="password"
                    isRequired={true}
                    type="password"
                    message={state.errors.password}
                    onChange={(name, value) => setState({ ...state, password: value })}
                    value={state.password}
                    groupClass="mb-0"
                    inputRef={passwordInput}
                />

                <FormInput
                    label="Confirm Password"
                    name="password_confirmation"
                    id="password_confirmation"
                    isRequired={true}
                    type="password"
                    message={state.errors.password_confirmation}
                    onChange={(name, value) => setState({ ...state, password_confirmation: value })}
                    value={state.password_confirmation}
                    groupClass="mb-0"
                />

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={state.processing}>Save</PrimaryButton>
                    {state.recentlySuccessful && (
                        <p className="text-sm text-gray-600">Saved.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
