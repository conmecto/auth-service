import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { helpers, interfaces } from '../utils';

const getUserByKey = async <T>(key: string, value: T) => {
    const query = `
        SELECT id, apple_auth_user_id, device_token
        FROM users 
        WHERE ${key}=$1 AND deleted_at IS NULL
    `;
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
    if (!res?.rows?.length) {
        return null;
    } 
    const response = res.rows[0];
    return helpers.formatDbQueryResponse<interfaces.IGetUserByKeyResponse>(response);
}

export default getUserByKey;