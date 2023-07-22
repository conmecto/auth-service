import getDbClient from './database';
import { getEmailClient } from './aws';
import { redisClient1, redisClient2 } from './redis';

const emailClient = getEmailClient();

export { getDbClient, emailClient, redisClient1, redisClient2  }