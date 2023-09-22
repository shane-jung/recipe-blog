import cors from 'cors';
import express, { NextFunction, Request, Response, Router } from 'express';
import path from 'path';

export default function initializeServer(router: Router) {
    const app = express();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = { origin: isProduction ? false : '*' };

    app.set('trust proxy', 1);
    app.use(express.json());
    app.use(cors(origin));

    app.use((_request: Request, response: Response, next: NextFunction) => {
        response.header(
            'Content-Security-Policy',
            "img-src 'self' *.githubusercontent.com",
        );

        return next();
    });

    app.use(express.static(path.join(__dirname, '../../dist/')));
    app.use('/api', router);
    app.get('*', (_request, response: Response) => {
        response.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    return app;
}