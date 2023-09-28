import { useFieldArray } from 'react-hook-form';
import { HiTrash } from 'react-icons/hi';

import RichTextInput from './RichTextInput';

export default function RecipeBody({ control }: { control: any }) {
    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name: 'body',
        });
    return (
        <div className="col-span-12">
            {fields.map((item: any, index) => (
                <RichTextInput
                    key={index}
                    name={item.name}
                    value={item.content}
                    label="New Section"
                    setBody={append}
                    control={control}
                    index={index}
                >
                    <div className="space-x pb-2">
                        <div className="dropdown dropdown-top dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-sm btn-success m-1"
                            >
                                New Section
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu rounded-box z-[1] w-52 bg-white p-2 shadow"
                            >
                                <li>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            insert(index, {
                                                name: '',
                                                type: 'richText',
                                                content: '',
                                            });
                                        }}
                                    >
                                        Rich Text Section
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            insert(index, {
                                                name: '',
                                                type: 'richText',
                                                content: '',
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
                        <dialog
                            id={`delete_section_${index}`}
                            className="modal"
                        >
                            <div className="modal-box">
                                <h3 className="text-error text-2xl font-bold">
                                    Warning
                                </h3>
                                <p className="py-4">
                                    Are you sure you want to delete this
                                    section?
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
                                                const modal =
                                                    document.getElementById(
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
                                                const modal =
                                                    document.getElementById(
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
                </RichTextInput>
            ))}
            <button
                type="button"
                onClick={() =>
                    append({ type: 'richText', content: '', name: '' })
                }
                className="btn btn-sm btn-success"
            >
                Add Section
            </button>
        </div>
    );
}
