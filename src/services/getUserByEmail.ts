import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getUserByEmail = async (email: string): Promise<interfaces.IGetUserByNumberRes | null> => {
    const query = `SELECT id, name, dob, city, country, search_for, gender, otp_resend_attempts, otp_validation_attempts, verified, device_token FROM users WHERE email=$1 AND deleted_at IS NULL`;
    const params = [email];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }
    if (res?.rows?.length) { 
        const user = res?.rows[0];
        return {
            userId: user.id,
            otpResendAttempts: user.otp_resend_attempts,
            otpValidationAttempts: user.otp_validation_attempts,
            verified: user.verified,
            name: user.name,
            dob: user.dob,
            city: user.city,
            country: user.country,
            searchFor: user.search_for,
            gender: user.gender,
            deviceToken: user.device_token
        }
    }
    return null;
}

export default getUserByEmail;