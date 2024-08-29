import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import apiClient from "../../Services/api";
import showToast from "../../Services/toast";
import moment from "moment";
import { useAuth } from "../../Hooks/AuthProvider";

export default function RolesIndex() {
    const auth = useAuth();
    const [state, setState] = useState({
        roles: null,
        processing: true,
        status: null,
    });

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = () => {
        apiClient.get('/roles').then((response) => {
            setState({
                ...state,
                roles: response.data.roles,
                processing: false,
            });
        }).catch((error) => {
            showToast(error.response?.data.message);
            setState({
                ...state,
                processing: false,
            });
        });
    };

    const deleteRole = (roleId) => {
        if (confirm("Are you sure want to delete current role? All the related data will be lost")) {
            apiClient.delete(`/roles/delete/${roleId}`).then((response) => {
                showToast(response.data.message);
                setState({
                    ...state,
                    roles: state.roles.filter(role => role.id !== roleId),
                    processing: false,
                });
            }).catch((error) => {
                showToast(error.response?.data.message);
                setState({
                    ...state,
                    processing: false,
                });
            });
        }
    };

    return (
        <AuthenticatedLayout
            title={"Roles"}
            showSearch={true}
            routes={{
                links: [],
                current: "Roles",
            }}
        >
            {state.status && <div className="alert alert-danger" role="alert">
                {state.status}
            </div>}

            <table className="table table-striped border">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.processing && (
                        <tr><td colSpan={4}>Loading...</td></tr>
                    )}
                    {state.roles && state.roles.map((role) => (
                        <>
                            <tr key={role.id} className="align-middle">
                                <td>{role.id}</td>
                                <td>{role.name.toUpperCase()}</td>
                                <td>{moment(role.created_at).fromNow()}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${role.id}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${role.id}`}
                                    >
                                        <i className="bi bi-eye"></i>
                                    </button>
                                    {auth.user.access.includes("roles.edit") && (
                                        <Link
                                            to={`/roles/edit/${role.id}`}
                                            className="btn-sm me-2 btn btn-primary"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                    )}
                                    {auth.user.access.includes("roles.delete") && (
                                        <Link
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteRole(role.id);
                                            }}
                                            className="btn-sm btn-danger btn"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                            <tr className="collapse" id={`collapse${role.id}`}>
                                <td colSpan={4}>
                                    <table>
                                        <p className="fw-bold p-2">Assigned Permissions</p>
                                        <div className="d-flex flex-wrap gap-2 px-2">
                                            {role.permissions.map((perm) => (
                                                <span
                                                    key={perm.id}
                                                    className="badge fs-6 text-bg-success text-white rounded-pill fw-normal"
                                                >
                                                    <div className="mb-1">
                                                        <i className="bi bi-check-circle me-2"></i>
                                                        <span>{perm.name}</span>
                                                    </div>
                                                </span>
                                            ))}
                                        </div>
                                    </table>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            {state.roles?.meta && <Pagination meta={state.roles?.meta} />}
        </AuthenticatedLayout>
    );
}
