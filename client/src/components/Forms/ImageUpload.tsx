import clsx from 'clsx';
import { Controller } from 'react-hook-form';

export default function ImageUpload({
    name,
    index,
    control,
    className,
}: {
    name?: string;
    index: number;
    control: any;
    className?: string;
}) {
    return (
        <div className={clsx('w-full', className)}>
            <label className="label label-text font-medium">Upload Image</label>
            <Controller
                control={control}
                name={name || `body[${index}].content`}
                render={({ field: { value, onChange, ...field } }) => (
                    <input
                        type="file"
                        className={
                            'file-input file-input-primary w-full max-w-sm'
                        }
                        value={value?.fileName}
                        onChange={(event) => {
                            onChange(event.target.files![0]);
                        }}
                        {...field}
                    />
                )}
            />
        </div>
    );
}
