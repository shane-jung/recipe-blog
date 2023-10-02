import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../model/user';

interface Token {
    userId: string;
    iat: number;
    exp: number;
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies?.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Token;
            req.user = await User.findById(decoded.userId).select('-password');
            return next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Auth Error' });
        }
    } else {
        return res.status(401).json({ message: 'Auth Error' });
    }
};

export { checkAuth };
