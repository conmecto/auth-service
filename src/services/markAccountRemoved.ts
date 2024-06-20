import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';

const markAccountRemoved = async (userId: number): Promise<boolean> => {
    const query1 = `
        UPDATE users 
        SET apple_auth_user_id=NULL, deleted_at=$2 
        WHERE id=$1 AND deleted_at IS NULL
        RETURNING users.id
    `;
    const query2 = 'UPDATE token_identity SET deleted_at=$2 WHERE user_id=$1 AND deleted_at IS NULL';
    const param1 = [userId, moment().toISOString(true)];
    const param2 = [userId, moment().toISOString(true)];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        res = await client.query(query1, param1);    
        await client.query(query2, param2);  
        await client.query('COMMIT');  
    } catch(err) {
        console.log(err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rows?.length);
}

export default markAccountRemoved;