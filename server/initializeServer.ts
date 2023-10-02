import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import path from 'path';

export default function initializeServer(router: Router) {
    const app = express();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = {
        origin: isProduction
            ? 'https://d19ni2qsauncnt.cloudfront.net'
            : 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
        credentials: true,
    };
    console.log(origin);

    app.use(cookieParser());
    app.set('trust proxy', 1);
    app.set('Content-Type', 'application/json');
    app.use(express.json());
    app.use(cors(origin));

    app.use('/api', router);

    if (process.env.NODE_ENV === 'production') {
        const __dirname = path.resolve();
        app.use(express.static(path.join(__dirname, '/frontend/dist')));
        app.get('*', (_req, res) =>
            res.sendFile(
                path.resolve(__dirname, 'frontend', 'dist', 'index.html'),
            ),
        );
    } else {
        app.get('/', (_req, res) => {
            res.send('Hello World!');
        });
    }

    return app;
}
