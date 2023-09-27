import { Controller } from 'react-hook-form';

export default function ImageUpload({
    name,
    index,
    control,
}: {
    name: string;
    index: number;
    control: any;
}) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, ...field } }) => (
                <input
                    type="file"
                    className="file-input file-input-primary w-full max-w-sm"
                    value={value?.fileName}
                    onChange={(event) => {
                        onChange(event.target.files![0]);
                    }}
                    {...field}
                />
            )}
        />
    );
}
