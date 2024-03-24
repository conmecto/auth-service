import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const updateUserDeviceInfo = async (userId: string, updateDoc: interfaces.IUpdateUserNotificationEndPoint): Promise<boolean> => {
    const query = updateDoc.deviceEndpoint ? 
        'UPDATE users SET device_token=$2, device_endpoint=$3 WHERE id=$1 AND deleted_at IS NULL' : 
        'UPDATE users SET device_token=$2 WHERE id=$1 AND deleted_at IS NULL';
    const param = [userId, updateDoc.deviceToken];
    if (updateDoc.deviceEndpoint) {
        param.push(updateDoc.deviceEndpoint);
    }
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, param);    
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rowCount);
}

export default updateUserDeviceInfo;