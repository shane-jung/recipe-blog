import axios from '@/axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import FormElement from './FormElement';
import ImageUpload from './ImageUpload';
import RecipeBody from './RecipeBody';
import Select from './Select';

const defaultBody = [
    {
        name: 'Background',
        type: 'richText',
        content: '',
    },
    {
        name: 'Ingredients',
        type: 'richText',
        content: '',
    },
    {
        name: 'Directions',
        type: 'richText',
        content: '',
    },
    {
        name: 'Notes',
        type: 'richText',
        content: '',
    },
];

interface categorySchemaMapInterface {
    [key: string]: any;
}

const schema = Yup.object({
    title: Yup.string().required('Required'),
    slug: Yup.string()
        .required('Required')
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be a valid slug'),
    preview: Yup.string().required('Required'),
    body: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            type: Yup.string().required('Required'),
            content: Yup.string().required('Required'),
        }),
    ),
    image: Yup.mixed(),
    tags: Yup.lazy((obj) => {
        const categoryKeys = Object.keys(obj);
        const categorySchemaMap: categorySchemaMapInterface = {};

        categoryKeys.forEach((key) => {
            categorySchemaMap[key] = Yup.array().of(Yup.string());
        });

        return Yup.object().shape(categorySchemaMap);
    }),
}).required();

export default function RecipeForm({
    initialValues,
    onSubmit,
}: {
    initialValues?: any;
    onSubmit: SubmitHandler<any>;
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: initialValues?.title || '',
            slug: initialValues?.slug || '',
            preview: initialValues?.preview || '',
            body: initialValues?.body || defaultBody,
            image: initialValues?.image || '',
            tags: initialValues?.tags
                ? Object.keys(initialValues?.tags).reduce(
                      (acc: any, key: string) => {
                          acc[key] = initialValues?.tags[key].map(
                              (tag: any) => ({
                                  label: tag.label,
                                  value: tag._id,
                              }),
                          );
                          return acc;
                      },
                      {},
                  )
                : {},
        },
    });

    const onSubmitWrap = async (data: any) => {
        let { image, ...rest } = data;
        const imageUrl = await uploadImage(image);
        onSubmit({ image: imageUrl, ...rest });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitWrap)}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 lg:grid-cols-12">
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <FormElement
                            id="title"
                            type="text"
                            label="Recipe Title"
                            placeholder="Title"
                            fieldRef={field}
                            className="col-span-6"
                            // error={errors.title?.message}
                        />
                    )}
                />

                <Controller
                    name="slug"
                    control={control}
                    render={({ field }) => (
                        <FormElement
                            id="slug"
                            type="text"
                            label="Slug"
                            placeholder="Recipe Slug (e.g. my-recipe)"
                            fieldRef={field}
                            className="col-span-6"
                            // error={errors.slug?.message}
                        />
                    )}
                />

                <Select
                    control={control}
                    name="meal"
                    className="col-span-6 w-full max-w-xs"
                />

                <Select
                    control={control}
                    name="ingredient"
                    className="col-span-6 w-full max-w-xs"
                />

                <Controller
                    name="preview"
                    control={control}
                    render={({ field }) => (
                        <FormElement
                            id="preview"
                            type="textarea"
                            label="Recipe Text Preview"
                            placeholder="Recipe Preview"
                            fieldRef={field}
                            className="col-span-8 "
                            // error={errors.preview?.message}
                        />
                    )}
                />

                <ImageUpload
                    control={control}
                    name={'image'}
                    index={0}
                    className="col-span-4 my-12"
                />

                <RecipeBody control={control} />

                <div className="py-8">
                    <button type="submit" className="btn btn-primary mx-auto">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

const uploadImage = async (image?: File) => {
    if (!image) return;
    const {
        data: { signedUrl, publicUrl },
    } = await axios.post('recipes/image', {
        fileName: image?.name,
        fileType: image?.type,
    });
    if (!signedUrl) return;

    const result = await fetch(signedUrl, {
        method: 'PUT',
        body: image,
        headers: {
            'Content-Type': image?.type,
        },
    });

    if (result.ok) {
        return publicUrl;
    }
};
