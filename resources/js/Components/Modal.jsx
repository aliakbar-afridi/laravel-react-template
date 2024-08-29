import PropTypes from "prop-types";

export default function ModalButton({ modalId, className, children, ...props}) {
    return (
        <button
            {...props}
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
            className={` btn btn-primary ` + className}
        >
            {children}
        </button>
    );
}

export function Modal({ id, areaLabel, title, className="", children, footer, ...props}) {
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            aria-labelledby={areaLabel}
            aria-hidden="true"
            {...props}
        >
            <div className={`modal-dialog ${className}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={areaLabel}>
                            {title}
                        </h1>
                        <button
                            type="button"
                            id={`${id}close-btn`}
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    {footer}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    areaLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired,
    footer: PropTypes.element,
};
