import express, { Response } from 'express';

import recipeRouter from './recipes';
import tagRouter from './tags';

const router = express.Router();

router.get('/', (_req, res: Response) => res.send('Hello World!'));

router.use('/recipes', recipeRouter);
router.use('/tags', tagRouter);

export default router;
