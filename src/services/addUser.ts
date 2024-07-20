import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';
import CustomError from './customError';

const addUser = async (createUserObject: interfaces.ICreateUserObject) => {
    const query1 = 'SELECT id FROM users WHERE apple_auth_user_id=$1 AND deleted_at IS NULL';
    const param1 = [createUserObject.appleAuthUserId];    
    const filteredObj = omit(createUserObject, ['appleAuthToken', 'deviceToken'])
    const keys = Object.keys(filteredObj)
        .map(key => enums.UserFieldsDbName[key]);
    const values = keys.map((key, index) => `$${index + 1}`).join(',');
    const param2 = Object.values(filteredObj);
    const query2 = `
        INSERT INTO 
        users(${keys.join(',')})
        VALUES(${values})
        RETURNING users.id
    `;
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