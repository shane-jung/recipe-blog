import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import Tiptap from './TipTap';

export default function RichTextInput({
    name,
    control,
    index,
    className,
}: {
    name?: string;
    label?: string;
    control: any;
    index: number;
    className?: string;
}) {
    return (
        <div
            className={clsx(
                'form-control focus-within:border-primary',
                className,
            )}
        >
            <div className="flex items-center justify-between">
                <label className="label label-text font-medium" htmlFor={name}>
                    {name || 'New Section'}
                </label>
            </div>

            <Controller
                control={control}
                name={`body.[${index}].name`}
                render={({ field }) => (
                    <input
                        type="text"
                        placeholder={name || 'Section Title'}
                        className="input input-primary rounded-b-none ring-offset-0"
                        {...field}
                        name={`body.[${index}].name`}
                    />
                )}
            />

            <Controller
                control={control}
                render={({ field }) => (
                    <Tiptap value={field.value} onChange={field.onChange} />
                )}
                name={`body.[${index}].content`}
            />
        </div>
    );
}
