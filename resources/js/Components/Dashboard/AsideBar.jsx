import { useEffect } from "react";
import $ from "jquery";
import { OverlayScrollbars } from "overlayscrollbars";
import { Link, NavLink } from "react-router-dom";

export default function AsideBar({ setShowAside, access }) {

    useEffect(() => {
        // Click event on Nav items to open/close nested menus
        $(".nav-item").on("click", function (e) {
            $(this).toggleClass("menu-open");
        });

        // Hide side bar for mobile when screen width is less then give value
        $(window).on("resize", function () {
            if ($(window).width() < 576) {
                hideAsideBar();
            }
        });

        // Show beautiful scroll bar on aside bar
        OverlayScrollbars(
            {
                target: document.querySelector("#aside-bar"),
                scrollbars: {
                    slot: document.querySelector("#aside-bar"),
                },
            },
            {}
        );
    }, []);

    function hideAsideBar() {
        $("#body-tag").removeClass("sidebar-open").addClass("sidebar-collapse");
        setShowAside(false);
    }

    return (
        <aside className="app-sidebar bg-body-secondary  " data-bs-theme="dark">
            <div className="sidebar-brand">
                <img
                    src="/assets/logo.ico"
                    alt="LARAVEL-React"
                    width={50}
                    className="brand-image rounded-circle opacity-75"
                />
                <span className="brand-text fw-light">LARAVEL-React</span>
                <span
                    onClick={hideAsideBar}
                    id="mobile-close"
                    className="btn btn-default d-md-none"
                >
                    <i className="bi bi-x-square text-white"></i>
                </span>
            </div>

            <div className="sidebar-wrapper" id="aside-bar">
                <nav className="mt-2">
                    <ul
                        className="nav sidebar-menu flex-column"
                        data-lte-toggle="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink
                                to={"/dashboard"}
                                className="nav-link"
                            >
                                <i className="nav-icon bi bi-speedometer"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            {access.includes("users.index") && (
                                <NavLink
                                    to={"/users"}
                                    className={({ isActive }) =>
                                        isActive ? "active nav-link" : "nav-link"
                                    }
                                >
                                    <i className="nav-icon bi bi-person"></i>
                                    <p>Users</p>
                                </NavLink>
                            )}
                        </li>
                        <li className="nav-item" onClick={(e)=>$(e.target).parent().parent().toggleClass("menu-open")}>
                            {access.includes("roles.index") && (
                                <button
                                    href="#"
                                    type="button"
                                    className={"nav-link"}
                                >
                                    <i className="nav-icon bi bi-ui-checks"></i>
                                    <p>
                                        Roles & Permissions
                                        <i className="  ms-2 fas fa-angle-left bi bi-chevron-down float-end"></i>
                                    </p>
                                </button>
                            )}
                            <ul className="nav nav-treeview ">
                                {access.includes("roles.index") && (
                                    <li className="nav-item">
                                        <NavLink
                                            to={"/roles"}
                                            className={({ isActive }) =>
                                                isActive ? "active nav-link" : "nav-link"
                                            }
                                        >
                                            <i className="nav-icon bi bi-circle"></i>
                                            <p>Roles</p>
                                        </NavLink>
                                    </li>
                                )}
                                {access.includes("roles.create") && (
                                    <li className="nav-item">
                                        <NavLink
                                            to={"/roles/create"}
                                            className={({ isActive }) =>
                                                isActive ? "active nav-link" : "nav-link"
                                            }
                                        >
                                            <i className="nav-icon bi bi-circle"></i>
                                            <p>Create New Role</p>
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside >
    );
}
