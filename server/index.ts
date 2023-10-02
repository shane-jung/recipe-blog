import 'dotenv/config';

import connectDb from './config/db';
import initializeServer from './initializeServer';
import router from './router';

const port = process.env.NODE_ENV == 'production' ? 80 : 5000;

connectDb();

const app = initializeServer(router);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
