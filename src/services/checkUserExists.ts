import { QueryResult } from 'pg';
import { getDbClient } from '../config';

const checkUserExists = async (appleAuthUserId: number) => {
    const query = `
        SELECT u.id, u.name, u.deleted_at 
        FROM users u
        WHERE 
        u.apple_auth_user_id=$1 AND 
        u.verified=TRUE AND 
        u.terms_accepted=TRUE
        ORDER BY u.created_at DESC
        LIMIT 1
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
    if (res?.rows?.length) {
        const user = res.rows[0];
        return {
            id: user.id,
            name: user.name,
            deletedAt: user.deleted_at
        }
    }
    return null;
}

export default checkUserExists;
