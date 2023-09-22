export default function FormElement({
    id,
    type,
    label,
    placeholder,
    error,
    fieldRef,
}: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    error?: string;
    fieldRef: any;
}) {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label label-text font-medium" htmlFor={id}>
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    className="textarea textarea-primary"
                    placeholder={placeholder}
                    {...fieldRef}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    className="input input-primary"
                    placeholder={placeholder}
                    {...fieldRef}
                />
            )}

            {error && <div className="label-text text-error">{error}</div>}
        </div>
    );
}
