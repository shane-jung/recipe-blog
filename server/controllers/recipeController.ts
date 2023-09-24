import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Recipe from '../model/recipe';

const recipeController = {
    getRecipes: async (_req: Request, res: Response) => {
        try {
            const recipes = await Recipe.find();
            if (!recipes) {
                return res.status(404).json({ error: 'No Recipes Found' });
            }
            return res.status(200).json(recipes);
        } catch (error) {
            console.error('Error getting recipes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({});
    },
    getRecipe: async (req: Request, res: Response) => {
        try {
            const recipe = await Recipe.findOne({ slug: req.params.slug });
            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            } else return res.status(200).json(recipe);
        } catch (error) {
            console.error('Error getting recipe:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({});
    },
    createRecipe: async (req: Request, res: Response) => {
        console.log(req.body.body);
        try {
            const recipe = await Recipe.create(req.body);
            return res.status(201).json(recipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateRecipe: async (req: Request, res: Response) => {
        try {
            const recipe = await Recipe.updateOne(
                { slug: req.params.slug },
                req.body,
            );
            return res.status(200).json(recipe);
        } catch (error) {
            console.error('Error updating recipe:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteRecipe: async (req: Request, res: Response) => {
        try {
            const deleteResult = await Recipe.deleteOne({
                _id: new mongoose.Types.ObjectId(req.params.id),
            });
            console.log(deleteResult);
            return res.status(200).json(deleteResult);
        } catch {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

export default recipeController;
