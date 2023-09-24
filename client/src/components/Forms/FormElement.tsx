import clsx from 'clsx';

export default function FormElement({
    id,
    type,
    label,
    placeholder,
    error,
    fieldRef,
    className,
}: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    error?: string;
    fieldRef: any;
    className?: string;
}) {
    return (
        <div className={clsx('form-control  relative mt-2  pb-6', className)}>
            <label className="label label-text font-medium" htmlFor={id}>
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    className="textarea textarea-primary w-full max-w-xl"
                    placeholder={placeholder}
                    rows={3}
                    {...fieldRef}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    className={clsx(
                        'input input-primary w-full max-w-xs',
                        error && 'input-error',
                    )}
                    placeholder={placeholder}
                    {...fieldRef}
                />
            )}

            {error && (
                <div className=" label-text text-error absolute bottom-0 left-2">
                    {error}
                </div>
            )}
        </div>
    );
}
