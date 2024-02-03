import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';

const verifyTokenIdentity = async (jti: string, userId: number): Promise<boolean> => {
    const query = 'SELECT id FROM token_identity WHERE user_id=$1 AND jti=$2 AND used=false AND expired_at >= $3 AND deleted_at IS NULL';
    const params = [userId, jti, moment().toISOString(true)];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rows?.length);
}

export default verifyTokenIdentity;
