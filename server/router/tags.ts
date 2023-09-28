import express from 'express';

import tagController from '../controllers/tagController';

const router = express.Router();

router.get('/', tagController.getAllTags).post('/', tagController.createTag);
router.get('/category/:category', tagController.getTagsByCategory);
router.get('/:id', tagController.getTag);

export default router;
