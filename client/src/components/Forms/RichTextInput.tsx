import { Controller } from 'react-hook-form';

import Tiptap from './TipTap';

export default function RichTextInput({
    name,
    value,
    label,
    setBody,
    children,
    control,
    fieldRef,
    index,
}: {
    name?: string;
    value?: string;
    label?: string;
    setBody?: any;
    fieldRef?: any;
    control: any;
    children: any;
    index: number;
}) {
    return (
        <div className="form-control focus-within:border-primary">
            <div className="flex items-center justify-between">
                <label className="label label-text font-medium" htmlFor={name}>
                    {name || 'New Section'}
                </label>
                {children}
            </div>

            <Controller
                control={control}
                name={`body.[${index}].name]`}
                render={({ field }) => (
                    <input
                        type="text"
                        id={name}
                        {...field}
                        placeholder={name || 'Section Title'}
                        className="input input-primary rounded-b-none ring-offset-0"
                    />
                )}
            />

            <Controller
                control={control}
                render={({ field }) => (
                    <Tiptap value={field.value} onChange={field.onChange} />
                )}
                name={`body.[${index}].content]`}
            />
        </div>
    );
}
