import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';
import CustomError from './customError';

const addUser = async (createUserObject: interfaces.ICreateUserObject): Promise<interfaces.IAddUserResponse | null> => {
    const query1 = 'SELECT id FROM users WHERE email=$1 AND deleted_at IS NULL';
    const param1 = [createUserObject.email];    
    const query2 = 'INSERT INTO users(city, country, dob, email, gender, name, search_for, search_in) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING users.id';
    const param2 = [...Object.keys(createUserObject).sort().map(key => createUserObject[key])];    
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