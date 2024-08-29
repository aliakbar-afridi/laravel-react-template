import React from "react";

export default function UserImage({ imageUrl, fontSize = 20 }) {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                className="user-image rounded-circle shadow"
                alt="User Image"
            />
        );
    }
    return (
        <div className="user-image d-inline">
            <span style={{ fontSize: fontSize}} className="bi bi-person-circle"></span>
        </div>
    );
}
