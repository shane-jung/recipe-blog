import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { FaParagraph } from 'react-icons/fa6';
import { HiListBullet } from 'react-icons/hi2';
import {
    LuBold,
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuItalic,
    LuRedo,
    LuUndo,
} from 'react-icons/lu';
import { MdFormatListNumbered, MdOutlineHorizontalRule } from 'react-icons/md';

const classes = {
    button: 'btn btn-sm hover:bg-[lightblue] ',
};

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1 p-4">
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleBold().run();
                }}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={clsx(
                    classes.button,
                    editor.isActive('bold') && 'is-active',
                )}
            >
                <LuBold />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleItalic().run();
                }}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={clsx(
                    classes.button,
                    editor.isActive('italic') && 'is-active',
                )}
            >
                <LuItalic />
            </button>

            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().unsetAllMarks().run();
                }}
                className={clsx(classes.button)}
            >
                clear marks
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().clearNodes().run();
                }}
                className={clsx(classes.button)}
            >
                clear nodes
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setParagraph().run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('paragraph') && 'is-active',
                )}
            >
                <FaParagraph />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('heading', { level: 1 }) && 'is-active',
                )}
            >
                <LuHeading1 />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('heading', { level: 2 }) && 'is-active',
                )}
            >
                <LuHeading2 />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('heading', { level: 3 }) && 'is-active',
                )}
            >
                <LuHeading3 />
            </button>

            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleBulletList().run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('bulletList') && 'is-active',
                )}
            >
                <HiListBullet />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleOrderedList().run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('orderedList') && 'is-active',
                )}
            >
                <MdFormatListNumbered />
            </button>

            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().toggleBlockquote().run();
                }}
                className={clsx(
                    classes.button,
                    editor.isActive('blockquote') && 'is-active',
                )}
            >
                <BsBlockquoteLeft />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setHorizontalRule().run();
                }}
                className={clsx(classes.button)}
            >
                <MdOutlineHorizontalRule />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setHardBreak().run();
                }}
                className={clsx(classes.button)}
            >
                hard break
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().undo().run();
                }}
                disabled={!editor.can().chain().focus().undo().run()}
                className={clsx(classes.button)}
            >
                <LuUndo />
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().redo().run();
                }}
                disabled={!editor.can().chain().focus().redo().run()}
                className={clsx(classes.button)}
            >
                <LuRedo />
            </button>
        </div>
    );
};

const extensions = [
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
];

export default ({ value, onChange }: { value: string; onChange: any }) => {
    return (
        <div className="border-primary divide-primary divide-y rounded-b-lg border shadow-md">
            <EditorProvider
                onUpdate={(e) => onChange(e.editor.view.dom.innerHTML)}
                editorProps={{
                    attributes: {
                        class: 'form-control p-4  outline-transparent focus:ring-[2px] ring-primary rounded-b-lg min-h-[150px] focus:outline-0 prose max-w-none',
                    },
                }}
                content={value}
                slotBefore={<MenuBar />}
                extensions={extensions}
                children={null}
            ></EditorProvider>
        </div>
    );
};
