import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function Checkbox({
    label,
    id,
    name,
    checked,
    onChange = () => {},
    message = null,
    wrapClass = " ",
    inputClass = "",
    type = "radio",
    isRequired = false,
}) {

    return (
        <div className={"form-check mb-3 " +wrapClass}>
            <input
                id={id}
                type={type}
                name={name}
                checked={checked}
                className={"form-check-input " + inputClass}
                required={isRequired}
                onChange={(e) => onChange(name, e.target.value)}
            />
            <label htmlFor={id} className="form-check-label"> {label}  </label>

            {message ? (
                <div className="invalid-feedback">{message}</div>
            ) : null}
        </div>
    );
}
Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.string,
    wrapClass: PropTypes.string,
    inputClass: PropTypes.string,
    isRequired: PropTypes.bool,
};
