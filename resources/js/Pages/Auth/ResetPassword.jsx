import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import FormInput from "@/Components/Form/FormInput";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <FormInput
                    label="Email"
                    name="email"
                    id="email"
                    isRequired={true}
                    type="email"
                    message={errors.email}
                    onChange={(name, value) => setData("email", value)}
                    value={data.email}
                    groupClass="mb-0"
                    isFocused={true}
                />

                <FormInput
                    label="Password"
                    name="password"
                    id="password"
                    isRequired={true}
                    type="password"
                    message={errors.password}
                    onChange={(name, value) => setData("password", value)}
                    value={data.password}
                    groupClass="mb-0"
                />

                <FormInput
                    label="Confirm Password"
                    name="password_confirmation"
                    id="password_confirmation"
                    isRequired={true}
                    type="password"
                    message={errors.password_confirmation}
                    onChange={(name, value) =>
                        setData("password_confirmation", value)
                    }
                    value={data.password_confirmation}
                    groupClass="mb-0"
                />

                <div className="d-flex justify-content-center">
                    <PrimaryButton disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
