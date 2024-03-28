import { QueryResult } from 'pg';
import { getDbClient } from '../config';

const getUserDeviceInfo = async (userId: number) => {
    const query = `SELECT id, name, device_token, device_endpoint FROM users WHERE id=$1 AND deleted_at IS NULL`;
    const params = [userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }
    if (res?.rows?.length) { 
        const user = res?.rows[0];
        return {
            id: user.id,
            name: user.name,
            deviceToken: user.device_token,
            deviceEndpoint: user.device_endpoint
        }
    }
    return null;
}

export default getUserDeviceInfo;