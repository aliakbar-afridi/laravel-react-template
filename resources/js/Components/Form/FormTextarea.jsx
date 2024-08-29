import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function FormTextArea({
    label,
    name = "",
    value = "",
    rows = "2",
    onChange = () => {},
    message = null,
    groupClass = "mb-3",
    inputClass = "",
    type = "text",
    isFocused = false,
    isRequired = true,
    ref = null,
}) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={groupClass}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                type={type}
                ref={input}
                name={name}
                required={isRequired}
                onChange={(e) => onChange(name, e.target.value)}

                className={
                    "form-control form-control-lg " +
                    (message ? " is-invalid" : "") +
                    inputClass
                }
                id={name}
                rows={rows}
            >
                {value}
            </textarea>
            {message ? <div className="invalid-feedback">{message}</div> : null}
        </div>
    );
}
FormTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.string,
    groupClass: PropTypes.string,
    inputClass: PropTypes.string,
    isFocused: PropTypes.bool,
    isRequired: PropTypes.bool,
    ref: PropTypes.object,
};
