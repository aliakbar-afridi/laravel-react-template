import { Link } from "react-router-dom";
import UserImage from "../UserImage";
import UserDropDown from "../User/UserDropDown";
import $ from "jquery";

export default function Nav({ auth, showAside, setShowAside }) {
    const toggleAsideBar = () => {
        if (!showAside) {
            $("#body-tag")
                .removeClass("sidebar-collapse")
                .addClass("sidebar-open");
            setShowAside(true);
        } else {
            $("#body-tag")
                .removeClass("sidebar-open")
                .addClass("sidebar-collapse");
            setShowAside(false);
        }
    };

    return (
        <nav className="app-header navbar navbar-expand bg-body">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="nav-link" onClick={toggleAsideBar}>
                            <i
                                className={
                                    showAside
                                        ? "bi bi-menu-app"
                                        : "bi bi-menu-button-fill"
                                }
                            ></i>
                        </button>
                    </li>
                    <li className="nav-item d-none d-md-block">
                        <Link to={"/dashboard"} className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <button className="nav-link" data-bs-toggle="dropdown">
                            <i className="bi bi-bell-fill"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                            <span className="dropdown-item dropdown-header">
                                No Notifications
                            </span>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={auth.logOutAction}>
                            <i className="bi bi-box-arrow-right"></i>
                        </button>
                    </li>

                    <li className="nav-item dropdown user-menu">
                        <button
                            className="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <UserImage imageUrl={auth.user.image} />
                            <span className="d-none d-md-inline">
                                {auth.user.name}
                            </span>
                        </button>
                        <UserDropDown user={auth.user} />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
