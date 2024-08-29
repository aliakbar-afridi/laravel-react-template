import Nav from "@/Components/Dashboard/Nav";
import AsideBar from "@/Components/Dashboard/AsideBar";
import { useAuth } from '../Hooks/AuthProvider';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function Authenticated({
    title,
    showSearch = false,
    onChange = null,
    routes = {
        links: [
            // Sample
            // {
            //     title: "Users",
            //     url: "/users/index",
            // },
        ],
        current: "Index",
    },
    children }) {

    const auth = useAuth();
    const [showAside, setShowAside] = useState(true);
    let { search } = useParams();

    return (
        <div className="app-wrapper">
            <Nav
                auth={auth}
                showAside={showAside}
                setShowAside={setShowAside}
            />
            <AsideBar setShowAside={setShowAside} access={auth.user.access} />

            <main className="app-main">
                <div className="app-content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-md-6 d-flex ">
                                <h3 className="mb-0 d-inline">{title}</h3>
                                {showSearch && (
                                    <div className="input-group mb-3 ms-4 w-100 w-md-50" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="search"
                                            placeholder="Search..."
                                            aria-describedby="basic-addon1"
                                            value={search}
                                            onChange={(e) => onChange("search", e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="input-group-text"
                                            id="basic-addon1"
                                        >
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="col-12 col-md-6">
                                <ol className="breadcrumb float-sm-end">
                                    <li className="breadcrumb-item">
                                        <Link to={"/dashboard"}>
                                            Home
                                        </Link>
                                    </li>
                                    {routes.links.map((link) => (
                                        <li className="breadcrumb-item">
                                            <Link to={link.url}>
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        {routes.current}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="app-content">
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
