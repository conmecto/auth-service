import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const updateTokenIdentity = async (tokenIdentity: interfaces.ITokenIdentityObj): Promise<boolean> => {
    const query = 'INSERT INTO token_identity (user_id, jti, exp, used) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET jti=$2, exp=$3, used=$4';
    const params = [tokenIdentity.userId, tokenIdentity.jti, tokenIdentity.exp, false];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);    
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_UPDATE_TOKEN_IDENTITY_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res.rowCount);
}

export default updateTokenIdentity;
