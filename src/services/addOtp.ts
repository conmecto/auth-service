import { QueryResult } from 'pg';
import moment from 'moment';
import { randomInt } from 'crypto';
import { getDbClient } from '../config';
import { constants, helpers } from '../utils';

const addOtp = async (userId: number): Promise<{ code: number, token: string } | null> => {
    const token = helpers.getRandomKey(10);
    const query1 = 'UPDATE otp SET deleted_at=$2 WHERE user_id=$1 AND deleted_at IS NULL';
    const param1 = [userId, moment().toISOString(true)];
    const query2 = 'INSERT into otp(user_id, code, token, expired_at) VALUES ($1, $2, $3, $4) RETURNING otp.id';
    const param2 = [userId, randomInt(100000, 1000000), token, moment().add(constants.OTP_EXPIRED_TIME_MIN, 'minutes').toISOString(true)];
    const query3 = 'UPDATE users SET otp_resend_attempts=otp_resend_attempts+1 WHERE id=$1';
    const param3 = [userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        await client.query(query1, param1);
        res = await client.query(query2, param2);
        await client.query(query3, param3);
        await client.query('COMMIT');
    } catch(err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    if (res?.rows?.length) {
        return {
            code: <number>param2[1],
            token: <string>param2[2]
        }
    }
    return null;
}

export default addOtp;

