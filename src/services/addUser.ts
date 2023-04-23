import { randomInt } from 'crypto';
import { getDbClient } from '../config';
import { interfaces, helpers } from '../utils';

const addUser = async (createUserObject: interfaces.ICreateUserObject): Promise<number | null> => {
    const query1 = 'insert into users(email, name, dob, country, search_for, search_in, gender) values($1, $2, $3, $4, $5, $6, $7)';
    const query2 = 'insert into verification(email, code, issued_at) values($1, $2, $3)';
    const params1 = [...Object.values(createUserObject)];
    const params2 = [createUserObject.email, randomInt(100000, 1000000), helpers.getDateWithTimezone()];

    let res: null | number = null;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        await client.query(query1, params1);
        await client.query(query2, params2);
        await client.query('COMMIT');
        res = <number>params2[1];
    } catch (e) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
    return res;
}

export default addUser;