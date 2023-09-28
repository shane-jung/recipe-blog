import axios from '@/axios';
import { useRequestProcessor } from '@/query';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Creatable from 'react-select/creatable';

interface Option {
    label: string;
    value: string;
}

export default function ReactSelect({
    control,
    name: category,
    className,
}: {
    control: any;
    name: string;
    className?: string;
}) {
    const { query, mutate } = useRequestProcessor();
    const { data: tags } = query(
        ['tags', category],
        () =>
            axios.get(`tags/category/${category}`).then((res) => {
                return res.data.map(
                    ({ label, _id }: { label: string; _id: string }) => ({
                        label,
                        value: _id,
                    }),
                );
            }),
        {
            enabled: true,
        },
    );
    const mutatationObject = mutate(
        ['tags', category],
        (value: string) => {
            setIsLoading(true);
            return axios.post('tags', { label: value, category });
        },
        {
            onSettled: (res: any) => {
                setIsLoading(false);
                setOptions((prev: any) => [
                    ...prev,
                    { label: res.data.label, value: res.data._id },
                ]);
            },
        },
    );

    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState<Option[]>([]);
    const [options, setOptions] = useState(tags);
    return (
        <div className={clsx('form-control relative mt-2 pb-6', className)}>
            <label
                className="label label-text font-medium capitalize"
                htmlFor={`tags[${category}]`}
            >
                {category}s (Optional)
            </label>
            <Controller
                control={control}
                name={`tags[${category}]`}
                render={({ field }) => (
                    <Creatable
                        isMulti
                        options={options as any}
                        value={field.value}
                        onChange={field.onChange}
                        isClearable
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        onCreateOption={mutatationObject.mutateAsync}
                        classNamePrefix="select"
                    />
                )}
            />
        </div>
    );
}
