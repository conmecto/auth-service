import { config } from 'dotenv';
import { join } from 'path';

if (process.env.NODE_ENV === 'dev') {
    const path = join(__dirname, '..', '..', '.env');
    config({ path });
}

export default {
    env: process.env.NODE_ENV || 'dev',
    server: {
        port: process.env.PORT || 8080
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        database: process.env.DB_NAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    },
    privateKey: {
        access: process.env.PRIVATE_KEY_ACCESS || 'TEMP_PRIVATE_KEY',
        refresh: process.env.PRIVATE_KEY_REFRESH || 'TEMP_PRIVATE_KEY'
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'TEMP_KEY',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'TEMP_SECRET_KEY',
        sesApiVersion: process.env.AWS_SES_API_VERSION || 'TEMP_API_VERSION'
    },
    email: process.env.email || 'temp email'
};