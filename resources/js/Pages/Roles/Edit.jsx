import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/AuthProvider";
import apiClient from "../../Services/api";
import showToast from "../../Services/toast";
import { useParams } from "react-router-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function RoleEdit() {
    const auth = useAuth();
    const { id } = useParams();
    const [state, setState] = useState({
        role: null,
        permissions: [],
        assignedPermissions: [],
        processing: false,
        errors: null,
    });

    useEffect(() => {
        apiClient.get(`/roles/edit/${id}`)
            .then((response) => {
                setState({
                    ...state,
                    role: response.data?.role,
                    permissions: response.data?.permissions,
                    assignedPermissions: response.data?.assignedPermissions,
                    processing: false
                });
            })
            .catch((error) => {
                showToast(error.response?.data.message || "An error occurred");
                setState({
                    ...state,
                    errors: error.response?.data.errors,
                    processing: false
                });
            });
    }, []);

    const permissionChange = (id) => {
        const newPermissions = state.permissions.includes(id)
            ? state.permissions.filter(permId => permId !== id)
            : [...state.assignedPermissions, id];

        setState({ ...state, assignedPermissions: newPermissions });
    };

    const submit = (e) => {
        e.preventDefault();

        if (state.assignedPermissions.length < 1) {
            alert("Select at least one permission");
            return;
        }

        setState({ ...state, processing: true });

        apiClient.post(`/roles/update/${id}`, { permissions: state.assignedPermissions })
            .then((response) => {
                showToast(response.data.message);
                setState({ ...state, processing: false });
            })
            .catch((error) => {
                showToast(error.response?.data.message || "An error occurred");
                setState({
                    ...state,
                    errors: error.response?.data.errors,
                    processing: false
                });
            });
    };


    return (
        <AuthenticatedLayout
            title={`Edit Role: ${state.role?.name.toUpperCase() ?? "Loading..."}`}
            routes={{
                links: [{
                    title: "Roles",
                    url: "/roles",
                },],
                current: "Index",
            }
            }
        >

            {
                !state.role ? (<p>No roles found</p>) : (
                    <div className="card mt-4">
                        <div className=" border-bottom p-2  d-flex justify-content-between align-items-center">
                            <h5 className="card-title">Permissions</h5>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <PrimaryButton
                                    type="submit"
                                    className="btn-sm"
                                    disabled={state.processing}
                                    processing={state.processing}
                                >
                                    Save Permissions
                                </PrimaryButton>
                            </form>
                        </div>
                        <div className="card-body d-flex gap-4 flex-wrap">
                            {state.permissions.map((perm) => (
                                <span
                                    key={perm.id}
                                    className={`badge fs-6 ${state.permissions.includes(perm.id) ? "text-bg-secondary" : "text-bg-light"}`}
                                >
                                    <div className="form-check mb-1 d-flex align-items-center">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            id={`perm_${perm.id}`}
                                            onChange={() => permissionChange(perm.id)}
                                            checked={state.assignedPermissions.includes(perm.id)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`perm_${perm.id}`}
                                        >
                                            {perm.name}
                                        </label>
                                    </div>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
        </AuthenticatedLayout >
    );
}
