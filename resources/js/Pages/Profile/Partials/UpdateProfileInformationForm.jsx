import FormInput from "@/Components/Form/FormInput";
import FormSelect from "@/Components/Form/FormSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import showToast from "../../../Services/toast";
import { useAuth } from "../../../Hooks/AuthProvider";
import apiClient from "../../../Services/api";

export default function UpdateProfileInformation({
    className = ""
}) {
    const auth = useAuth();
    const user = auth.user;
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        parent: user.profile.parent,
        gender: user.profile.gender,
        education: user.profile.education,
        state: user.profile.state,
        city: user.profile.city,
        phone: user.profile.phone,
        skills: user.profile.skills,
        about: user.profile.about,
        errors: null,
        processing: false,
    });

    const submit = (e) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, processing: true, errors: {} }));

        apiClient.patch('/profile', new FormData(e.target)).then((response) => {
            showToast(response.data?.message)
            setState({
                ...state,
                users: response.data,
                processing: false,
            })
            auth.loginAction({
                user: {
                    ...user,
                    name: state.name,
                    email: state.email,
                    parent: state.parent,
                    gender: state.gender,
                    education: state.education,
                    state: state.state,
                    city: state.city,
                    phone: state.phone,
                    skills: state.skills,
                    about: state.about,
                }
            }, "/profile")
        }).catch((error) => {
            showToast(error.response?.data.message);
            setState({
                ...state,
                errors: error.response?.data.errors,
                processing: false,
            });
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg fs-4">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            {user.email_verified_at === null && (
                <div>
                    <p className="alert alert-warning">
                        Your email address is unverified.
                        <Link
                            href={route("verification.send")}
                            method="post"
                            as="button"
                            className=" btn btn"
                        >
                            Click here to re-send the verification email. <i className="bi bi-arrow-clockwise"></i>
                        </Link>
                    </p>
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="Name"
                            name="name"
                            id="name"
                            isRequired={true}
                            type="text"
                            message={state.errors?.name}
                            onChange={(name, value) => setState({
                                ...state,
                                name: value
                            })
                            }
                            value={state.name}
                            groupClass="mb-0"
                            isFocused={true}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="Parent"
                            name="parent"
                            id="parent"
                            message={state.errors?.parent}
                            onChange={(parent, value) =>
                                setState({
                                    ...state,
                                    parent: value
                                })
                            }
                            value={state.parent}
                            groupClass="mb-0"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <FormSelect
                            label="Gender"
                            name="gender"
                            id="gender"
                            message={state.errors?.gender}
                            onChange={(gender, value) =>
                                setState({
                                    ...state,
                                    gender: value
                                })
                            }
                            value={state.gender}
                            groupClass="mb-0"
                            options={[
                                {
                                    title: "Male",
                                    value: "male",
                                },
                                {
                                    title: "Female",
                                    value: "female",
                                },
                            ]}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="Phone"
                            name="phone"
                            id="phone"
                            message={state.errors?.phone}
                            onChange={(phone, value) => setState({
                                ...state,
                                phone: value
                            })}
                            value={state.phone}
                            groupClass="mb-0"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="State"
                            name="state"
                            id="state"
                            message={state.errors?.state}
                            onChange={(state, value) => setState({
                                ...state,
                                state: value
                            })}
                            value={state.state}
                            groupClass="mb-0"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <FormInput
                            label="City"
                            name="city"
                            id="city"
                            message={state.errors?.city}
                            onChange={(city, value) => setState({
                                ...state,
                                city: value
                            })}
                            value={state.city}
                            groupClass="mb-0"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FormInput
                            label="Education (comma separated)"
                            name="education"
                            id="education"
                            message={state.errors?.education}
                            onChange={(education, value) =>
                                setState({
                                    ...state,
                                    education: value
                                })
                            }
                            value={state.education}
                            groupClass="mb-0"
                        />
                    </div>
                    <div className="col-12">
                        <FormInput
                            label="Skills (comma separated)"
                            name="skills"
                            id="skills"
                            message={state.errors?.skills}
                            onChange={(skills, value) =>
                                setState({
                                    ...state,
                                    skills: value
                                })
                            }
                            value={state.skills}
                            groupClass="mb-0"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FormInput
                            label="About"
                            name="about"
                            id="about"
                            message={state.errors?.about}
                            onChange={(about, value) => setState({
                                ...state,
                                about: value
                            })}
                            value={state.about}
                            groupClass="mb-0"
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <FormInput
                            label="Email"
                            name="email"
                            id="email"
                            isRequired={true}
                            type="email"
                            message={state.errors?.email}
                            onChange={(name, value) => setState({
                                ...state,
                                email: value
                            })}
                            value={state.email}
                            groupClass="mb-0"
                            isFocused={true}
                        >
                            <PrimaryButton
                                className="text-nowrap"
                                disabled={state.processing}
                                processing={state.processing}
                            >
                                Save Profile
                            </PrimaryButton>
                        </FormInput>
                    </div>
                </div>
            </form>
        </section >
    );
}
