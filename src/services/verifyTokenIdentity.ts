import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';
import { enums } from '../utils';

const verifyTokenIdentity = async (jti: string, userId: number): Promise<boolean> => {
    const query = 'SELECT id FROM token_identity WHERE expired_at >= $3 AND user_id=$1 AND jti=$2 AND used=false AND deleted_at IS NULL';
    const params = [userId, jti, moment().toISOString(true)];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_VERIFY_TOKEN_IDENTITY_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rows?.length);
}

export default verifyTokenIdentity;
