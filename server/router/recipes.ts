import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/', recipeController.getRecipes);
router.get('/:slug', recipeController.getRecipe);
router.post('/', recipeController.createRecipe);
router.put('/:slug', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

export default router;
