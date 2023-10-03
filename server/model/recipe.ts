import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const recipeSchema = new Schema(
    {
        title: { $type: String, required: true },
        image: { $type: String, required: true },
        preview: String,
        slug: { $type: String, required: true },
        body: [{ type: String, content: String, name: String }],
        tags: {
            $type: Map,
            of: [{ $type: Schema.Types.ObjectId, ref: 'Tag' }],
        },
    },
    { typeKey: '$type', timestamps: true },
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
