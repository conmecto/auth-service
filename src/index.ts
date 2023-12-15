import express, { Express, urlencoded, json } from 'express';
import { createServer } from 'http';
import { createServer as createSecureServer } from 'https';
import { readFileSync } from 'fs';
import { Environments } from './utils';
import router from './routes';
import { errorHandler } from './middlewares';
import { runAwsFile } from './config';

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/v1', router, errorHandler);

if (Environments.secure) {
    const options = {
        key: readFileSync('./key.pem'),
        cert: readFileSync('./cert.pem')
    };
    createSecureServer(options, app).listen(Environments.server.port, 
        () => console.log(`Secure Server is running on port: ${Environments.server.port}`)
    );
} else {
    createServer(app).listen(Environments.server.port, 
        () => console.log(`Server is running on port: ${Environments.server.port}`)
    );
}

runAwsFile();