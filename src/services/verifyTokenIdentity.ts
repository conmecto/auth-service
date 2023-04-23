import { getDbClient } from '../config';

const verifyTokenIdentity = async (jti: string, userId: number): Promise<boolean> => {
    const query = 'select id from token_identity where exp < now() and user_id=$1 and jti=$2 and used=$3 and deleted_at is null';
    const params = [userId, jti, false];
    const client = await getDbClient();
    const res = await client.query(query, params);
    return Boolean(res.rowCount);
}

export default verifyTokenIdentity;
