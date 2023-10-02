import express from 'express';

import recipeController from '../controllers/recipeController';
import { checkAuth } from '../middleware/authMiddleware';

const router = express.Router();

router
    .get('/', recipeController.getRecipes)
    .post('/', checkAuth, recipeController.createRecipe);
router.post('/image', checkAuth, recipeController.uploadImage);
router
    .get('/:slug', recipeController.getRecipe)
    .put('/:slug', checkAuth, recipeController.updateRecipe);
router.delete('/:id', checkAuth, recipeController.deleteRecipe);

export default router;
