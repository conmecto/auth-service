import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';
import CustomError from './customError';

const addUser = async (createUserObject: interfaces.ICreateUserObject): Promise<interfaces.IAddUserResponse | null> => {
    const query1 = 'SELECT id FROM users WHERE apple_auth_user_id=$1 AND deleted_at IS NULL';
    const param1 = [createUserObject.appleAuthUserId];    
    let tempQuery = 'INSERT INTO users(';
    let countQuery = '';
    let count = 1;
    let param2: string[] = [];
    for(const key in createUserObject) {
        if (key !== 'appleAuthToken' && key !== 'deviceToken') {
            tempQuery += enums.UserFieldsDbName[key] + ',';
            param2.push(createUserObject[key]);
            countQuery += '$' + count + ',';
            count += 1;
        } 
    } 
    const tempQuerySize = tempQuery.length;
    const countQuerySize = countQuery.length;
    const query2 = tempQuery.substring(0, tempQuerySize-1) + ') VALUES (' + countQuery.substring(0, countQuerySize-1) + ') RETURNING users.id';
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        const temp = await client.query(query1, param1);
        if (temp.rows.length) {
            throw new CustomError(enums.StatusCodes.CONFLICT, enums.Errors.DUPLICATE_USER, enums.ErrorCodes.DUPLICATE_USER);
        }
        res = await client.query(query2, param2);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK')
        throw err;
    } finally {
        client.release();
    }
    if (res?.rows?.length) {
        return {
            userId: res.rows[0].id
        };
    }
    return null;
}

export default addUser;