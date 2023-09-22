import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import FormElement from './Forms/FormElement';
import RichTextInput from './Forms/RichTextInput';

const schema = Yup.object({
    title: Yup.string().required(),
    slug: Yup.string()
        .required()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be a valid slug'),
}).required();

interface IFormInput {
    title: string;
    slug: string;
}

export default function RecipeForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            slug: '',
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <FormElement
                        id="title"
                        type="text"
                        label="Title"
                        placeholder="Title"
                        fieldRef={field}
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
                        placeholder="slug"
                        fieldRef={field}
                        error={errors.slug?.message}
                    />
                )}
            />

            <RichTextInput />
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
            <button type="submit">Submit</button>
        </form>
    );
}
