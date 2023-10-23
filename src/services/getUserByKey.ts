import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const getUserByKey = async <T>(key: string, value: T): Promise<interfaces.IUserObj | null> => {
    const query = `SELECT id, verified FROM users WHERE ${key}=$1 AND deleted_at IS NULL`;
    const params = [value];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_GET_USER_BY_KEY_ERROR + err);
        throw err;
    } finally {
        client.release();
    }    
    return res?.rows?.length ? res.rows[0] : null;
}

export default getUserByKey;