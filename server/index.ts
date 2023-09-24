import 'dotenv/config';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';

import initializeServer from './initializeServer';
import router from './router';

console.log('NODE_ENV', process.env.NODE_ENV);
console.log('MONGO_URI', process.env.MONGO_URI);
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

const app = initializeServer(router);

https
    .createServer(
        {
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert'),
        },
        app,
    )
    .listen(5000, function () {
        console.log(`Listening on port ${5000}`);
    });
