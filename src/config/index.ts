import dbSource from './dbConfig';
import { getEmailObj } from './aws';

const emailObj = getEmailObj();

export { dbSource, emailObj }