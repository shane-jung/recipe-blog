import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import axios from '../axios';
import { Recipe } from '../types';
import FormElement from './Forms/FormElement';
import ImageUpload from './Forms/ImageUpload';
import RecipeBody from './Forms/RecipeBody';

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
}).required();

export default function RecipeForm({
    initialValues,
    onSubmit,
}: {
    initialValues?: Recipe;
    onSubmit: SubmitHandler<Recipe>;
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: initialValues?.title || '',
            slug: initialValues?.slug || '',
            preview: initialValues?.preview || '',
            body: initialValues?.body || defaultBody,
            image: initialValues?.image || '',
        },
    });

    const onSubmitWrap = async (data: Recipe & { image?: File }) => {
        console.log(data);
        let { image, ...rest } = data;
        const imageUrl = await uploadImage(image);
        onSubmit({ image: imageUrl, ...rest });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitWrap)}>
            <div className="mx-auto grid max-w-5xl">
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
                            error={errors.title?.message}
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
                            error={errors.slug?.message}
                        />
                    )}
                />

                <ImageUpload control={control} name={'image'} index={0} />

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
                            error={errors.slug?.message}
                        />
                    )}
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
