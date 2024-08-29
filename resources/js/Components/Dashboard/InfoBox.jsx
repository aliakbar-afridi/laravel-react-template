import React from "react";

export default function InfoBox({ number, title, icon, className }) {
    return (
        <div className={"small-box " + className}>
            <div className="inner">
                <h3>{number}</h3>
                <p>{title}</p>
            </div>
            <i
                className={`bi bi-${icon} small-box-icon`}
                style={{ fontSize: "3rem" }}
            ></i>
            <a
                href="#"
                className="small-box-footer link-light link-underline-opacity-0"
            >
                More info <i className="bi bi-link-45deg"></i>
            </a>
        </div>
    );
}
