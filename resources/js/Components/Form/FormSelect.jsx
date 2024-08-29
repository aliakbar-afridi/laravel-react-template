import React from "react";
import PropTypes from "prop-types";

export default function FormSelect({
    label,
    name = "",
    onChange = () => {},
    options = [],
    defaultValue = null,
    message = null,
    groupClass = "mb-3",
    inputClass = "",
    isRequired = false,
    disabled = false,
    children,
}) {
    return (
        <div className={groupClass}>
            <label htmlFor={name} className="form-label">
                {label}
            </label>

            <div className="d-flex gap-2">
                <select
                    required={isRequired}
                    onChange={(e) => {
                        onChange(name, e.target.value);
                    }}
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    className={
                        "form-control form-control-lg " +
                        (message ? " is-invalid" : "") +
                        inputClass
                    }
                    aria-label={name}
                    disabled={disabled}
                >
                    {options.map((e) => (
                        <option
                            key={e.value}
                            value={e.value}
                        >
                            {e.title}
                        </option>
                    ))}
                </select>
                {children}
            </div>
            {message ? <div className="invalid-feedback">{message}</div> : null}
        </div>
    );
}
FormSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    message: PropTypes.string,
    groupClass: PropTypes.string,
    inputClass: PropTypes.string,
    isRequired: PropTypes.bool,
};
