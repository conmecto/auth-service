import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const getUserByKey = async <T>(key: string, value: T): Promise<interfaces.IGetUserByNumberRes | null> => {
    const query = `SELECT id, name, email, dob, city, country, search_for, search_in, gender, otp_resend_attempts, otp_validation_attempts, verified, device_token, apple_auth_user_id FROM users WHERE ${key}=$1 AND deleted_at IS NULL`;
    const params = [value];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    } 
    if (!res?.rows?.length) {
        return null;
    } 
    let user = {
        userId: res.rows[0].id
    };
    for(const key in res.rows[0]) {
        user[enums.UserFieldsDbName[key]] = res.rows[0][key];
    }
    console.log('user', user);
    return user as interfaces.IGetUserByNumberRes;
}

export default getUserByKey;