import React, { useEffect, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import FormInput from '@/Components/Form/FormInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import apiClient from '../../Services/api';
import showToast from '../../Services/toast';
import { useNavigate } from 'react-router-dom';

export default function RoleCreate() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        role: '',
        permissions: [],
        selectedPermissions: [],
        errors: null,
        processing: true,
    });

    useEffect(() => {
        apiClient.get(`/roles/create`)
            .then((response) => {
                console.log(response)
                setState({
                    ...state,
                    permissions: response.data?.permissions,
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


    const handlePermissionChange = (id) => {
        setState((prevData) => {
            const newPermissions = prevData.permissions.includes(id)
                ? prevData.permissions.filter((permId) => permId !== id)
                : [...prevData.selectedPermissions, id];
            return { ...prevData, selectedPermissions: newPermissions };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.permissions.length < 1) {
            alert('Select at least one permission');
            return;
        }

        setState({ ...state, processing: true });
        apiClient.post("/roles/store", {
            role: state.role,
            permissions: state.selectedPermissions,
        }).then((response) => {
            showToast(response.data?.message);
            navigate('/roles')
        }).catch((error) => {
            showToast(error.response.data?.message);
            setState({
                ...state,
                errors: error.response.data?.errors,
                processing: false
            });
        }).finally(() => {
            setState({ ...state, processing: false });
        });
    };

    return (
        <AuthenticatedLayout
            title="Create Role"
            routes={{
                links: [
                    {
                        title: 'Roles',
                        name: 'roles.index',
                    },
                ],
                current: 'Create Role',
            }}
        >
            <div className="row">
                <div className="col-12 col-md-4">
                    <form onSubmit={handleSubmit} className="align-items-center mb-4">
                        <FormInput
                            label="Role Name"
                            name="role"
                            id="role"
                            isRequired={true}
                            message={state.errors?.role}
                            onChange={(name, value) => setState({ ...state, role: value })}
                            value={state.role}
                            wrapClass="mb-0"
                            placeholder="Enter role name"
                        >
                            <PrimaryButton
                                type="submit"
                                disabled={state.processing}
                                processing={state.processing}
                                className="text-nowrap"
                            >
                                Save Role
                            </PrimaryButton>
                        </FormInput>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Permissions</h5>
                </div>
                <div className="card-body d-flex gap-4 flex-wrap">
                    {state.permissions.map((perm) => (
                        <span
                            key={perm.id}
                            className={`badge fs-6 ${state.selectedPermissions.includes(perm.id)
                                ? 'text-bg-secondary'
                                : 'text-bg-light'
                                }`}
                        >
                            <div className="form-check form-switch mb-1 d-flex align-items-center">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    role="switch"
                                    id={perm.id}
                                    onChange={() => handlePermissionChange(perm.id)}
                                    checked={state.selectedPermissions.includes(perm.id)}
                                />
                                <label className="form-check-label" htmlFor={perm.id}>
                                    {perm.name}
                                </label>
                            </div>
                        </span>
                    ))}
                </div>
                {state.errors?.permissions && <div className="text-danger">{state.errors?.permissions}</div>}
            </div>
        </AuthenticatedLayout>
    );
}
