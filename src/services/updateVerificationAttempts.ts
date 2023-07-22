import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';

const updateVerificationAttempts = async (id: number): Promise<number> => {
    const query = 'UPDATE verification as v SET attempts=v.attempts+1 WHERE id=$1 and deleted_at IS NULL';
    const params = [id];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_UPDATE_VERIFICATION_ATTEMPTS_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    return res?.rowCount ? <number>params[0] : 0;
}

export default updateVerificationAttempts;

