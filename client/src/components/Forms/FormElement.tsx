import clsx from 'clsx';
import { Controller } from 'react-hook-form';

export default function FormElement({
    control,
    type,
    label,
    placeholder,
    className,
    children,
    name,
}: {
    name: string;
    children?: React.ReactNode;
    control: any;
    type: string;
    label: string;
    placeholder: string;
    className?: string;
}) {
    return (
        <div className={clsx('form-control relative mb-3 ', className)}>
            <label
                className="label label-text font-medium capitalize"
                htmlFor={name}
            >
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState }) => (
                    <>
                        {children || type === 'textarea' ? (
                            <textarea
                                className="textarea textarea-primary w-full max-w-2xl"
                                placeholder={placeholder}
                                rows={3}
                                {...field}
                            />
                        ) : (
                            <input
                                type={type}
                                className={clsx(
                                    'input input-primary w-full max-w-sm',
                                    fieldState.error && 'input-error',
                                )}
                                placeholder={placeholder}
                                {...field}
                            />
                        )}
                        {fieldState.error && (
                            <div className=" label-text text-error absolute bottom-0 left-2">
                                {fieldState.error.message}
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    );
}
