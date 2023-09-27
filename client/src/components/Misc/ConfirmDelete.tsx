import React from 'react';

export default function ({
    children,
    action,
    message,
    actionString,
}: {
    children: React.ReactNode;
    action: any;
    message: string;
    actionString: string;
}) {
    return (
        <>
            <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => {
                    const x = document.getElementById(
                        `delete_section`,
                    ) as HTMLDialogElement;
                    x.showModal();
                }}
            >
                {children}
            </button>
            <dialog id={`delete_section`} className="modal">
                <div className="modal-box">
                    <h3 className="text-error text-2xl font-bold">Warning</h3>
                    <p className="py-4">{message}</p>
                    <p className="pb-4 font-bold">
                        This action cannot be undone.
                    </p>

                    <div className="modal-action">
                        <div className="gap-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log('deleting');
                                    action();
                                    const modal = document.getElementById(
                                        `delete_section`,
                                    ) as HTMLDialogElement;
                                    modal.close();
                                }}
                                className="btn btn-error btn-sm mr-4"
                            >
                                {actionString}
                            </button>
                            <button
                                className="btn btn-sm"
                                type="button"
                                onClick={() => {
                                    const modal = document.getElementById(
                                        `delete_section`,
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
        </>
    );
}
