import initializeServer from './initializeServer';
import router from './router';

const app = initializeServer(router);

app.listen(3001, () => console.log(`Listening on port ${3001}`)); // eslint-disable-line
