import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';

const verifyUser = async (email: string, verificationId: number): Promise<boolean> => {
    const query1 = 'UPDATE VERIFICATION SET code=null, count=0, attempts=0, issued_at=null WHERE id=$1 AND deleted_at IS NULL';
    const params1 = [verificationId];
    const query2 = 'UPDATE users SET verified=$1 WHERE email=$2 AND deleted_at IS NULL';
    const params2 = [true, email];

    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        console.log(query1);
        console.log(query2);
        console.log(params1);
        console.log(params2);
        await client.query(query1, params1);
        res = await client.query(query2, params2);
        await client.query('COMMIT');
    } catch (err) {
        console.log(enums.PrefixesForLogs.DB_VERIFY_USER_ERROR + err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rowCount);
}

export default verifyUser;