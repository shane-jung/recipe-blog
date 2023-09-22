import Tiptap from './TipTap';

export default function RichTextInput({
    name,
    value,
    label,
    setBody,
}: {
    name?: string;
    value?: string;
    label?: string;
    setBody?: any;
}) {
    return (
        <div className="form-control">
            <Tiptap />
        </div>
    );
}
