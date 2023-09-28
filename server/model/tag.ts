import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const tagSchema = new Schema({
    label: String,
    value: String,
    category: String,
});

const Tag = model('Tag', tagSchema);
export default Tag;
