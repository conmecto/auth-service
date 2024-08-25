import { QueryResult } from 'pg';
import { getDbClient } from '../config';

const checkUserExists = async (appleAuthUserId: number): Promise<boolean> => {
    const query = `
        SELECT id 
        FROM users 
        WHERE 
        apple_auth_user_id=$1 AND 
        verified=TRUE AND 
        terms_accepted=TRUE AND 
        deleted_at IS NULL
    `;
    const param = [appleAuthUserId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, param);    
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }
    return Boolean(res?.rows?.length);
}

export default checkUserExists;
