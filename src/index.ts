import express, { Express, urlencoded, json } from 'express';
import { createServer } from 'http';
import { Environments } from './utils';
import router from './routes';
import { errorHandler } from './middlewares';
import { runAwsFile } from './config';

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/v1', router, errorHandler);

createServer(app).listen(Environments.server.port, 
    () => console.log(`Server is running on port: ${Environments.server.port}`)
);

runAwsFile();