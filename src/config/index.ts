import getDbClient from './dbConfig';
import { getEmailObj } from './aws';

const emailObj = getEmailObj();

export { getDbClient, emailObj }