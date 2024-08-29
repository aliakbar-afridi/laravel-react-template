export default function SuccessButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={` btn btn-success ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
