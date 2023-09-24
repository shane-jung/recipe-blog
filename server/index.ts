import 'dotenv/config';
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

app.listen(5000, () => console.log(`Listening on port ${5000}`)); // eslint-disable-line
