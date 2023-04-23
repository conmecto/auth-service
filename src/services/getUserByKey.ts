import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getUserByKey = async <T>(key: string, value: T): Promise<interfaces.IUserObj> => {
    const query = `select id, email, verified from users where ${key}=$1 and deleted_at is null`;
    const params = [value];
    const client = await getDbClient();
    const res = await client.query(query, params);
    return res.rows[0];
}

export default getUserByKey;