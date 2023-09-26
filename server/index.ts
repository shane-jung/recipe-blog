import 'dotenv/config';
import mongoose from 'mongoose';

import initializeServer from './initializeServer';
import router from './router';

console.log('NODE_ENV', process.env.NODE_ENV!);
console.log('MONGO_URI', process.env.MONGO_URI);
const port = process.env.NODE_ENV == 'production' ? 80 : 5000;
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((error: any) => console.error('MongoDB connection error:', error));

const app = initializeServer(router);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
