import { useFieldArray } from 'react-hook-form';
import { HiTrash } from 'react-icons/hi';

import ImageUpload from './ImageUpload';
import RichTextInput from './RichTextInput';

export default function RecipeBody({ control }: { control: any }) {
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: 'body',
    });

    return (
        <div className="col-span-12">
            <h3 className="text-2xl font-medium">Recipe Body</h3>
            {fields.map((field: any, index) => (
                <div key={field._id}>
                    <NewSection remove={remove} insert={insert} index={index} />

                    {field.type == 'richText' ? (
                        <RichTextInput
                            className="mb-6"
                            name={field.name}
                            label="New Section"
                            control={control}
                            index={index}
                        />
                    ) : (
                        <ImageUpload
                            control={control}
                            index={index}
                            className="col-span-4 my-12"
                        />
                    )}
                </div>
            ))}
            <NewSection remove={remove} insert={insert} index={fields.length} />
        </div>
    );
}

function NewSection({
    insert,
    remove,
    index,
}: {
    remove: any;
    insert: any;
    index: number;
}) {
    return (
        <div className="space-x flex items-center justify-end">
            <div className="dropdown dropdown-top dropdown-hover dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-success m-1">
                    New Section
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box z-[1] w-52 bg-white p-2 shadow"
                >
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                insert(index, {
                                    name: '',
                                    type: 'richText',
                                    content: '',
                                    _id: new Date().getTime(),
                                });
                            }}
                        >
                            Rich Text Section
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                insert(index, {
                                    name: '',
                                    type: 'image',
                                    content: '',
                                    _id: new Date().getTime(),
                                });
                            }}
                        >
                            Image
                        </button>
                    </li>
                </ul>
            </div>
            <button
                type="button"
                className="btn btn-sm btn-error text-white"
                onClick={() => {
                    const x = document.getElementById(
                        `delete_section_${index}`,
                    ) as HTMLDialogElement;
                    x.showModal();
                }}
            >
                <HiTrash />
            </button>
            <dialog id={`delete_section_${index}`} className="modal">
                <div className="modal-box">
                    <h3 className="text-error text-2xl font-bold">Warning</h3>
                    <p className="py-4">
                        Are you sure you want to delete this section?
                    </p>
                    <p className="pb-4 font-bold">
                        This action cannot be undone.
                    </p>

                    <div className="modal-action">
                        <div className="gap-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    remove(index);
                                    const modal = document.getElementById(
                                        `delete_section_${index}`,
                                    ) as HTMLDialogElement;
                                    modal.close();
                                }}
                                className="btn btn-error btn-sm mr-4"
                            >
                                Delete Section
                            </button>
                            <button
                                className="btn btn-sm"
                                type="button"
                                onClick={() => {
                                    const modal = document.getElementById(
                                        `delete_section_${index}`,
                                    ) as HTMLDialogElement;
                                    modal.close();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
