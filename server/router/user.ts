import express from 'express';

import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', userController.authUser);
userRouter.post('/register', userController.registerUser);
userRouter.post('/logout', userController.logoutUser);

export default userRouter;
