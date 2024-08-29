import UserImage from "../UserImage";
import { Link } from "react-router-dom";

export default function UserDropDown({ user }) {
    return (
        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
            <li className="user-header text-bg-primary">
                <UserImage imageUrl={user.image} fontSize={50} />
                <p className="mb-0">{user.name}</p>
                <p>
                    {user.roles.map((role) => (
                        <span key={role.id} className="badge text-bg-success">{role.name.toUpperCase()}</span>
                    ))}
                </p>
            </li>
            <li className="user-footer">
                <Link
                    to={"/profile"}
                    className="btn btn-secondary btn-flat"
                >
                    Profile
                </Link>
                {/* <Link
                    to={"logout"}
                    method="post"
                    className="btn btn-danger float-end"
                    as="button"
                >
                    Sign out <i className="bi bi-arrow-right"></i>
                </Link> */}
            </li>
        </ul>
    );
}
