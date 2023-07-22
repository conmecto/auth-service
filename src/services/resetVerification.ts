import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';

const resetVerification = async (id: number): Promise<boolean> => {
    const query = `UPDATE VERIFICATION SET code=null, count=0, attempts=0, issued_at=null WHERE id=$1 AND deleted_at IS NULL`;
    const params = [id];
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.log(enums.PrefixesForLogs.DB_RESET_VERIFICATION_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rowCount);
}

export default resetVerification;
