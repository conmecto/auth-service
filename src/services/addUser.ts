import { QueryResult } from 'pg';
import { randomInt } from 'crypto';
import { getDbClient } from '../config';
import { interfaces, helpers, enums } from '../utils';

const addUser = async (createUserObject: interfaces.ICreateUserObject): Promise<interfaces.IAddUserResponse | null> => {
    const query1 = 'INSERT INTO users(city, country, dob, email, gender, name, search_for, search_in) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING users.id';
    const query2 = 'INSERT INTO verification(code, email, issued_at, user_id) VALUES($1, $2, $3, $4)';
    const params1 = [...Object.keys(createUserObject).sort().map(key => createUserObject[key])];
    const params2 = [randomInt(100000, 1000000), createUserObject.email, helpers.getDateWithTimezone()];

    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        console.log(query1);
        console.log(query2);
        console.log(params1);
        console.log(params2);
        res = await client.query(query1, params1);
        const userId: number = res?.rows[0].id;
        await client.query(query2, [...params2, userId]);
        await client.query('COMMIT');
    } catch (err) {
        console.error(enums.PrefixesForLogs.DB_INSERT_USER_ERROR + err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    const check = res?.rows?.length ? { 
        userId: <number>res.rows[0].id, verificationCode: <number>params2[1] 
    } : null;
    return check;
}

export default addUser;