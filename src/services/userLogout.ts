import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const userLogout = async (userId: number): Promise<boolean> => {
    const query1 = 'SELECT id FROM users WHERE id=$1 AND deleted_at IS NULL';
    const query2 = 'UPDATE token_identity SET deleted_at=$2 WHERE user_id=$1 AND deleted_at IS NULL';
    const param1 = [userId];
    const param2 = [userId, moment().toISOString(true)];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        console.log(query1);
        console.log(param1);
        res = await client.query(query1, param1);    
        console.log(query2);
        console.log(param2);
        await client.query(query2, param2);  
        await client.query('COMMIT');  
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_LOGOUT_ERROR + err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rows?.length);
}

export default userLogout;
