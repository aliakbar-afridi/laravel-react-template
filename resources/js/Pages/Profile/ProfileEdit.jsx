import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useAuth } from "../../Hooks/AuthProvider";

export default function ProfileEdit() {
    const auth = useAuth();

    return (
        <AuthenticatedLayout auth={auth} title={"Profile"}>
            <div className="row mb-4">
                <div className="col-12 col-md-8">
                    <UpdateProfileInformationForm
                        className="p-4 card bg-white"
                        user={auth.user}
                    />
                </div>
                <div className="col-12 col-md-4">
                    <UpdatePasswordForm className="bg-white card p-4" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
