import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';
import CustomError from './customError';

const addUser = async (createUserObject: interfaces.ICreateUserObject) => {
    const query1 = `
        SELECT id, name, deleted_at 
        FROM users 
        WHERE 
        apple_auth_user_id=$1 AND 
        verified=TRUE AND 
        terms_accepted=TRUE
        ORDER BY id DESC
        LIMIT 1
    `;
    const param1 = [createUserObject.appleAuthUserId];    
    const query2 = `
        INSERT INTO 
        users (country, verified, apple_auth_user_id, terms_accepted, name)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING users.id
    `;
    const param2 = [
        createUserObject.country, createUserObject.verified, 
        createUserObject.appleAuthUserId, createUserObject.termsAccepted
    ];
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        const temp = await client.query(query1, param1);
        if (temp.rows.length) {
            const { name, deleted_at } = temp.rows[0];
            if (deleted_at && !createUserObject.name) {
                createUserObject.name = (name || '');
            } else if (!deleted_at) {
                throw new CustomError(enums.StatusCodes.CONFLICT, enums.Errors.DUPLICATE_USER, enums.ErrorCodes.DUPLICATE_USER);
            }
        }
        param2.push(createUserObject.name);
        res = await client.query(query2, param2);
        if (!res.rows.length) {
            throw new Error('Signup Failed');
        }
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK')
        throw err;
    } finally {
        client.release();
    }
    if (res?.rows?.length) {
        return {
            userId: res.rows[0].id as number,
            name: createUserObject.name
        };
    }
    return null;
}

export default addUser;