import cors from 'cors';
import express, { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

export default function initializeServer(router: Router) {
    var models_path = __dirname + '/model';
    fs.readdirSync(models_path).forEach(function (file) {
        if (~file.indexOf('.ts')) {
            console.log('here');
            require(models_path + '/' + file);
        }
    });
    const app = express();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = {
        origin: isProduction ? 'https://d19ni2qsauncnt.cloudfront.net' : '*',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    };

    app.set('trust proxy', 1);
    app.set('Content-Type', 'application/json');
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
    app.get('/', (_request, response: Response) => {
        response.status(200).send('Hello World!');
    });
    app.get('*', (_request, response: Response) => {
        response.sendFile(path.join(__dirname, '../../dist/index.html'));
    });

    return app;
}
