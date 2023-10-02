import express from 'express';

import tagController from '../controllers/tagController';
import { checkAuth } from '../middleware/authMiddleware';

const router = express.Router();

router
    .get('/', tagController.getAllTags)
    .post('/', checkAuth, tagController.createTag);
router.get('/category/:category', tagController.getTagsByCategory);
router.get('/:id', tagController.getTag);

export default router;
