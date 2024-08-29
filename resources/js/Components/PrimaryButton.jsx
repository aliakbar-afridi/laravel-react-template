export default function PrimaryButton({
    className = "",
    disabled,
    processing,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={` btn btn-primary ` + className}
            disabled={disabled}
        >
            {children}
            {processing && (
                <div className="ms-2 spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </button>
    );
}
