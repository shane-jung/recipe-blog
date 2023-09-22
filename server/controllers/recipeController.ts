import { Request, Response } from 'express';

const recipeController = {
    getRecipes: (_req: Request, res: Response) => {
        res.send('getRecipes');
    },
    getRecipe: (_req: Request, res: Response) => {
        res.send('getRecipe');
    },
    createRecipe: (_req: Request, res: Response) => {
        res.send('createRecipe');
    },
    updateRecipe: (_req: Request, res: Response) => {
        res.send('updateRecipe');
    },
    deleteRecipe: (_req: Request, res: Response) => {
        res.send('deleteRecipe');
    },
};

export default recipeController;
