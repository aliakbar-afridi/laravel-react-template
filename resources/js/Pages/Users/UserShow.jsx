import PrimaryButton from "@/Components/PrimaryButton";
import UserImage from "@/Components/UserImage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAuth } from "../../Hooks/AuthProvider";
import { useState } from "react";
import ModalButton, { Modal } from "@/Components/Modal";
import FormSelect from "@/Components/Form/FormSelect";
import showToast from "../../Services/toast";
import apiClient from "../../Services/api";
import { useParams } from "react-router-dom";

export default function UserShow() {
    const { id } = useParams();
    const auth = useAuth();
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        try {
            apiClient.get(`/users/${id}`).then((response) => {
                setUser(response.data.user);
            }).catch(error=>console.log(error));
        } catch (error) {
            showToast(error.response?.data.message);
        }
    };

    useState(() => {
        loadUser();
    }, []);


    return (
        <AuthenticatedLayout
            auth={auth}
            title={"User Profile"}
            routes={{
                links: [
                    {
                        title: "Users",
                        url: "/users",
                    },
                ],
                current: "Profile",
            }}
        >
            {!user && (<div>Loading...</div>)}
            {user &&
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="card card-primary card-outline">
                            <div className="card-body box-profile">
                                <div className="text-center">
                                    <UserImage imageUrl={user.image} fontSize={50} />
                                </div>
                                <h3 className="profile-username text-center">{user.name}</h3>
                                <p className="text-muted text-center">{user.role}</p>
                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
                                        <b>Father Name</b>
                                        <span className="float-end text-primary-emphasis">
                                            {user.profile.parent}
                                        </span>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Gender</b>
                                        <span className="float-end text-primary-emphasis">
                                            {user.profile.gender}
                                        </span>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Phone</b>
                                        <span className="float-end text-primary-emphasis">
                                            {user.profile.phone}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card card-primary mt-4">
                            <div className="card-header">
                                <h3 className="card-title">About Me</h3>
                            </div>
                            <div className="card-body">
                                <strong>
                                    <i className="bi bi-book-fill me-1"></i> Education
                                </strong>
                                <p className="text-muted">{user.profile.education}</p>
                                <hr />
                                <strong>
                                    <i className="bi bi-geo-alt-fill me-1"></i> Location
                                </strong>
                                <p className="text-muted">
                                    {user.profile.state}, {user.profile.city}
                                </p>
                                <hr />
                                <strong>
                                    <i className="bi bi-pencil-fill me-1"></i> Skills
                                </strong>
                                <p className="text-muted">
                                    {user.profile.skills?.split(",").map((skill) => (
                                        <span key={skill} className="badge rounded-pill text-bg-light fw-normal">
                                            {skill}
                                        </span>
                                    ))}
                                </p>
                                <hr />
                                <strong>
                                    <i className="far bi-file-text-fill me-1"></i> About
                                </strong>
                                <p className="text-muted">{user.profile.about}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-8">
                        <div className="card">
                            <div className="card-header p-2"></div>
                            <div className="card-body"></div>
                        </div>
                    </div>
                </div>
            }
        </AuthenticatedLayout>
    );
}
