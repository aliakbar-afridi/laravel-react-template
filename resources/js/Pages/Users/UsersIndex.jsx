import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthProvider";
import { useEffect, useState } from "react";
import apiClient from "../../Services/api";
import showToast from "../../Services/toast";


export default function UsersIndex() {
    const auth = useAuth();
    const [state, setState] = useState({
        users: null,
        processing: true,
        status: null,
    });
    useEffect(() => {
        loadUsers()
    }, []);

    const loadUsers = () => {
        apiClient.get('/users').then((response) => {
            setState({
                ...state,
                users: response.data.users,
                processing: false,
            })
        }).catch((error) => {
            showToast(error.response?.data.message);
            setState({
                ...state,
                processing: false,
            });
        });
    }

    return (
        <AuthenticatedLayout
            title={"Users"}
            showSearch={true}
            routes={{
                links: [],
                current: "Users",
            }}
        >
            {state.status && <div class="alert alert-danger" role="alert">
                {state.status}
            </div>}

            <table className="table table-striped border">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Email Verified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.processing && (
                        <tr><td colSpan={5}>Loading...</td></tr>
                    )}
                    {state.users && state.users.map((user) => (
                        <tr key={user.id} className="align-middle">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.email_verified_at ? (
                                    <i className="bi bi-check-square text-success"></i>
                                ) : (
                                    <i className="bi bi-x-square text-danger"></i>
                                )}
                            </td>
                            <td>
                                {auth.user.access.includes("users.show") && (
                                    <Link
                                        to={`/users/${user.id}`}
                                        className="btn-sm me-2"
                                    >
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                )}
                                {auth.user.access.includes("users.edit") && (
                                    <PrimaryButton className="btn-sm me-2">
                                        <i className="bi bi-pencil-square"></i>
                                    </PrimaryButton>
                                )}
                                {auth.user.access.includes("users.delete") && (
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (confirm(
                                                "Are you sure want to delete current user? All the related data will be lost"
                                            )) {
                                                apiClient.post(`/users/delete/${user.id}`).then((response) => {
                                                    console.log(response);
                                                    showToast(response.data.message);
                                                    setState({
                                                        ...state,
                                                        users: state.users.filter(item => item.id !== user.id),
                                                        processing: false,
                                                    })
                                                }).catch((error) => {
                                                    showToast(error.response?.data.message);
                                                    setState({
                                                        ...state,
                                                        processing: false,
                                                    });
                                                });
                                            }
                                        }}
                                        className="btn-sm btn-danger btn"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {state.users?.meta && <Pagination meta={state.users?.meta} />}
        </AuthenticatedLayout >
    );
}
