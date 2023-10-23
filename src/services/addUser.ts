import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const addUser = async (createUserObject: interfaces.ICreateUserObject): Promise<interfaces.IAddUserResponse | null> => {
    const query = 'INSERT INTO users(city, country, dob, extension, gender, name, number, search_for, search_in) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING users.id';
    const params = [...Object.keys(createUserObject).sort().map(key => createUserObject[key])];
    
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch (err) {
        console.error(enums.PrefixesForLogs.DB_INSERT_USER_ERROR + err);
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