import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';

const markAccountRemoved = async (userId: number) => {
    const query1 = `
        UPDATE users 
        SET apple_auth_user_id=NULL, deleted_at=$2 
        WHERE id=$1 AND deleted_at IS NULL
        RETURNING users.id, users.device_endpoint
    `;
    const query2 = 'UPDATE token_identity SET deleted_at=$2 WHERE user_id=$1 AND deleted_at IS NULL';
    const query3 = 'UPDATE user_details SET deleted_at=$2 WHERE user_id=$1 AND deleted_at IS NULL';
    const timestamp = moment().toISOString(true);
    const params = [userId, timestamp];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        res = await client.query(query1, params);    
        await client.query(query2, params);  
        await client.query(query3, params);
        await client.query('COMMIT');  
    } catch(err) {
        console.log(err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    if (res?.rows?.length) {
        return {
            userId: res.rows[0].id,
            deviceEndpoint: res.rows[0].device_endpoint
        }
    }
}

export default markAccountRemoved;