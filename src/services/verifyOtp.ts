import moment from 'moment';
import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import CustomError from './customError';
import { enums, interfaces } from '../utils';

const verifyOtp = async ({ userId, code, token, verifyUser }: interfaces.IVerifyOtpPayload): Promise<boolean> => {
    const query1 = 'UPDATE otp SET used=true, deleted_at=$3 WHERE code=$1 AND token=$2 AND expired_at >= $3 AND used=false AND deleted_at IS NULL';
    const param1 = [code, token, moment().toISOString(true)];
    const query2 = 'UPDATE users SET otp_validation_attempts=0, otp_resend_attempts=0' + (verifyUser ?  ', verified=true ' : ' ') + 'WHERE id=$1 AND deleted_at IS NULL';
    const param2 = [userId];
    const query3 = 'UPDATE users SET otp_validation_attempts=otp_validation_attempts+1 WHERE id=$1 AND deleted_at IS NULL';
    const param3 = [userId];

    let res: QueryResult | null = null;
    let invalidOtp = false;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        console.log(query1);
        console.log(param1);
        const otpRes = await client.query(query1, param1);
        if (!otpRes.rowCount) {
            console.log(query3);
            console.log(param3);
            await client.query(query3, param3);
            invalidOtp = true;
        } else {
            console.log(query2);
            console.log(param2);
            res = await client.query(query2, param2);    
        }
        await client.query('COMMIT');
    } catch (err) {
        console.log(enums.PrefixesForLogs.DB_VERIFY_OTP_ERROR + err);
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    if (invalidOtp) {
        throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.OTP_INVALID, enums.ErrorCodes.OTP_INVALID);
    }
    return Boolean(res?.rowCount);
}

export default verifyOtp;