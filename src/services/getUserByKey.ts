import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getUserByKey = async <T>(key: string, value: T): Promise<interfaces.IUserObj | null> => {
    const query = `SELECT id, verified FROM users WHERE ${key}=$1 AND deleted_at IS NULL`;
    const params = [value];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }    
    return res?.rows?.length ? res.rows[0] : null;
}

export default getUserByKey;