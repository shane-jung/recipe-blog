import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router
    .get('/', recipeController.getRecipes)
    .post('/', recipeController.createRecipe);
router.post('/image', recipeController.uploadImage);
router
    .get('/:slug', recipeController.getRecipe)
    .put('/:slug', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

export default router;
