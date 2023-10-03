import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const tagSchema = new Schema(
    {
        label: String,
        value: String,
        category: String,
    },
    { timestamps: true },
);

const Tag = model('Tag', tagSchema);
export default Tag;
