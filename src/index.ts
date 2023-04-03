import express, { Express, urlencoded, json } from 'express';
import { createServer } from 'http';
import { Environments } from './utils';
import { dbSource } from './config';
import router from './routes';

const app: Express = express();

app.use(json());
app.use(urlencoded());
app.use('/api/v1', router);

if (!dbSource.isInitialized) {
    dbSource.initialize()
        .then(() => console.log('Database initialized'))
        .catch(err => console.error(err));
}

createServer(app).listen(Environments.server.port, 
    () => console.log(`Server is running on port: ${Environments.server.port}`)
);