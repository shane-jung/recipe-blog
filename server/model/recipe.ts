import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const recipeSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
});

const Recipe = model('recipe', recipeSchema);
export default Recipe;
