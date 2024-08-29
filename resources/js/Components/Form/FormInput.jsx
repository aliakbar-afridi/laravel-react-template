import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function FormInput({
    label,
    name = "",
    value = "",
    onChange = () => {},
    message = null,
    wrapClass = "mb-3",
    inputClass = "",
    type = "text",
    isFocused = false,
    isRequired = false,
    disabled = false,
    ref = null,
    placeholder = "",
    children,
}) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={wrapClass}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="d-flex gap-2">
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    className={
                        "form-control form-control-lg " +
                        (message ? " is-invalid" : "") +
                        inputClass
                    }
                    required={isRequired}
                    onChange={(e) => onChange(name, e.target.value)}
                    ref={input}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {children}
            </div>
            {message ? <div className="text-danger">{message}</div> : null}
        </div>
    );
}
FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.array,
    wrapClass: PropTypes.string,
    inputClass: PropTypes.string,
    isFocused: PropTypes.bool,
    isRequired: PropTypes.bool,
    ref: PropTypes.object,
};
