import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getUserByKey = async <T>(key: string, value: T): Promise<interfaces.IUserObj | null> => {
    const query = `SELECT id, verified, email, device_token, apple_auth_user_id FROM users WHERE ${key}=$1 AND deleted_at IS NULL`;
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
    return res?.rows?.length ? { 
        ...res.rows[0], 
        deviceToken: res.rows[0].device_token,
        appleAuthUserId: res.rows[0].apple_auth_user_id
    } : null;
}

export default getUserByKey;