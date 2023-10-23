import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const getUserByNumber = async (extension: string, number: string): Promise<interfaces.IGetUserByNumberRes | null> => {
    const query = `SELECT id, name, dob, city, country, search_for, search_in, gender, otp_resend_attempts, otp_validation_attempts, verified FROM users WHERE extension=$1 AND number=$2 AND deleted_at IS NULL`;
    const params = [extension, number];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.log(enums.PrefixesForLogs.DB_GET_USER_BY_NUMBER_ERROR + err);
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
            searchIn: user.search_in,
            gender: user.gender
        }
    }
    return null;
}

export default getUserByNumber;