import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const recipeSchema = new Schema(
    {
        title: String,
        preview: String,
        slug: String,
        body: [{ type: String, content: String, name: String }],
    },
    { typeKey: '$type' },
);

const Recipe = model('recipe', recipeSchema);
export default Recipe;
