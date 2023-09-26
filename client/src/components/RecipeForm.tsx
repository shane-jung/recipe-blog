import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Recipe } from '../types';
import FormElement from './Forms/FormElement';
import ImageUpload from './Forms/ImageUpload';
import RecipeBody from './Forms/RecipeBody';

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

            body: initialValues?.body
                ? initialValues.body
                : [
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
                  ],
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

                <ImageUpload control={control} name={'main'} index={1} />
                <RecipeBody control={control} />

                {/* <FormControl>
                    <FormControl.Label htmlFor="subtitle">
                        subtitle
                    </FormControl.Label>
                    <FormControl.Input name="subtitle" type="text" />
                </FormControl>
    
                <FormControl>
                    <FormControl.Label htmlFor="preview">Preview</FormControl.Label>
                    <FormControl.Input name="preview" type="text" />
                </FormControl> */}

                {/* <ImageUpload imageUrl={recipe?.imageUrl} index={-1} />
    
                <Form.Group as={Row}>
                    <DurationInput
                        name="prepTime"
                        label="Prep Time"
                        value={recipe?.prepTime}
                    />
                    <DurationInput
                        name="cookTime"
                        label="Cook Time"
                        value={recipe?.cookTime}
                    />
                    <DurationInput
                        name="totalTime"
                        label="Total Time"
                        value={recipe?.totalTime}
                    />
    
                    <Form.Group as={Col} sm={6} xl={6} className="mb-3">
                        <Form.Label className="d-block text-center">
                            Yield
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="servingsQty"
                                type="number"
                                min={0}
                                max={100}
                                defaultValue={
                                    recipe?.servings
                                        ? recipe.servings.split(' ')[0]
                                        : 0
                                }
                            />
                            <Form.Control
                                name="servingsUnit"
                                type="text"
                                defaultValue="Servings"
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Group>
    
                <Form.Label>Recipe Body</Form.Label>
    
                <AddToBody index={-1} setBody={setBody} addSection={addSection} />
    
                {body?.map((element: any, index: number) => (
                    <div key={element._id} className="position-relative">
                        <RecipeBodyElement
                            element={element}
                            index={index}
                            setBody={setBody}
                        />
    
                        <OverlayTrigger overlay={<Tooltip>Delete Section</Tooltip>}>
                            <Button
                                className="position-absolute"
                                style={{ top: '.5rem', right: '.5rem' }}
                                variant="danger"
                                onClick={() => {
                                    const newBody = [...body];
                                    newBody.splice(index, 1);
                                    setBody(newBody);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                        </OverlayTrigger>
    
                        <AddToBody
                            index={index}
                            setBody={setBody}
                            addSection={addSection}
                        /> 
                    </div>
                ))}*/}
                <div className="py-8">
                    <button type="submit" className="btn btn-primary mx-auto">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
