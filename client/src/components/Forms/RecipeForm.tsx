import axios from '@/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
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
            name: Yup.string(),
            type: Yup.string().required('Required'),
            content: Yup.mixed().required('Required'),
        }),
    ),
    image: Yup.mixed(),
    tags: Yup.lazy((obj) => {
        const categoryKeys = Object.keys(obj);
        const categorySchemaMap: categorySchemaMapInterface = {};

        categoryKeys.forEach((key) => {
            categorySchemaMap[key] = Yup.array().of(
                Yup.object().shape({
                    label: Yup.string(),
                    value: Yup.string(),
                }),
            );
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
        resolver: yupResolver(schema),
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

    console.log(errors);
    const onSubmitWrap = async (data: any) => {
        console.log(data);
        let { image, body, ...rest } = data;

        if (typeof image !== 'string') {
            let headerImage = await uploadImage(data.slug, 'header', image);
            data = { ...data, image: headerImage };
        }
        body = await Promise.all(
            body.map(async (section: any, index: number) => {
                delete section._id;
                if (
                    section.type === 'image' &&
                    typeof section.content !== 'string'
                ) {
                    console.log(section.content);
                    section.content = await uploadImage(
                        data.slug,
                        index,
                        section.content,
                    );
                    section.name = `image-${index}`;
                }
                return section;
            }),
        );
        console.log(body);
        onSubmit({ ...data, body });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitWrap)}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 lg:grid-cols-12">
                <div className="contents">
                    <h3 className="col-span-12 mt-12 text-2xl font-medium ">
                        General
                    </h3>
                    <FormElement
                        name="title"
                        type="text"
                        label="Recipe Title"
                        placeholder="Title"
                        className="col-span-6"
                        control={control}
                    />
                    <FormElement
                        control={control}
                        name="slug"
                        type="text"
                        label="Slug"
                        placeholder="Recipe Slug (e.g. my-recipe)"
                        className="col-span-6"
                    />

                    <FormElement
                        control={control}
                        name="preview"
                        type="textarea"
                        label="Recipe Text Preview"
                        placeholder="Recipe Preview"
                        className="col-span-12 "
                    />
                </div>

                <div className="contents">
                    <h3 className="col-span-12 mt-12 text-2xl font-medium ">
                        Tags
                    </h3>
                    <Select
                        control={control}
                        name="meal"
                        className="col-span-6 w-full max-w-sm"
                    />

                    <Select
                        control={control}
                        name="ingredient"
                        className="col-span-6 w-full max-w-sm"
                    />
                </div>

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

const uploadImage = async (slug: string, id: any, image?: File) => {
    if (!image) return;
    console.log(image.type);
    const {
        data: { signedUrl, publicUrl },
    } = await axios.post('recipes/image', {
        fileName: `recipes/${slug}/${id}`,
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
