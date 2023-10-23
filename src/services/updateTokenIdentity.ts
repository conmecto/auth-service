import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const updateTokenIdentity = async (tokenIdentity: interfaces.ITokenIdentityObj): Promise<boolean> => {
    const query1 = 'UPDATE token_identity SET deleted_at=$2 WHERE user_id=$1 AND deleted_at IS NULL';
    const param1 = [tokenIdentity.userId, moment().toISOString(true)];
    const query2 = 'INSERT INTO token_identity (user_id, jti, expired_at, used) VALUES ($1, $2, $3, $4)';
    const param2 = [tokenIdentity.userId, tokenIdentity.jti, tokenIdentity.expiredAt, false];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        console.log(query1);
        console.log(param1);
        await client.query(query1, param1);    
        console.log(query2);
        console.log(param2);
        res = await client.query(query2, param2);  
        await client.query('COMMIT');  
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_UPDATE_TOKEN_IDENTITY_ERROR + err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rowCount);
}

export default updateTokenIdentity;
