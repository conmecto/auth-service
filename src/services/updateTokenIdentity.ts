import { getDbClient } from '../config';
import { interfaces } from '../utils';

const updateTokenIdentity = async (tokenIdentity: interfaces.ITokenIdentityObj): Promise<boolean> => {
    const query = 'update token_identity set jti=$1, exp=$2, used=$3 where user_id=$4 and deleted_at is null';
    const params = [tokenIdentity.jti, tokenIdentity.exp, false, tokenIdentity.userId];
    const client = await getDbClient();
    const res = await client.query(query, params);
    return Boolean(res.rowCount);
}

export default updateTokenIdentity;
