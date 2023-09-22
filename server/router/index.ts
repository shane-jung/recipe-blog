import express, { Response } from 'express';

import recipeRouter from './recipes';

const router = express.Router();

router.get('/', (_req, res: Response) => res.send('Hello World!'));

router.use('/recipes', recipeRouter);

export default router;
