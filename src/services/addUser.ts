import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';
import CustomError from './customError';

const addUser = async (createUserObject: interfaces.ICreateUserObject) => {
    const query1 = 'SELECT id FROM users WHERE apple_auth_user_id=$1 AND deleted_at IS NULL';
    const param1 = [createUserObject.appleAuthUserId];    
    const query2 = `
        INSERT INTO 
        users (country, verified, apple_auth_user_id, terms_accepted)
        VALUES ($1, $2, $3, $4)
        RETURNING users.id
    `;
    const param2 = [
        createUserObject.country, createUserObject.verified, 
        createUserObject.appleAuthUserId, createUserObject.termsAccepted
    ];
    const query3 = `
        INSERT INTO 
        user_details (name, dob, gender, city, user_id)
        VALUES ($1, $2, $3, $4, $5)
    `;
    const param3 = [
        createUserObject.name, createUserObject.dob, 
        createUserObject.gender, createUserObject.city
    ];
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        const temp = await client.query(query1, param1);
        if (temp.rows.length) {
            throw new CustomError(enums.StatusCodes.CONFLICT, enums.Errors.DUPLICATE_USER, enums.ErrorCodes.DUPLICATE_USER);
        }
        res = await client.query(query2, param2);
        if (!res.rows.length) {
            throw new Error('Signup Failed');
        }
        param3.push( res.rows[0].id);
        await client.query(query3, param3);
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