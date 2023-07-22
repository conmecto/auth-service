import { QueryResult } from 'pg';
import { randomInt } from 'crypto';
import { getDbClient } from '../config';
import { helpers, enums } from '../utils';

const generateVerificationCode = async (email: string, count: number, attemptReset: boolean): Promise<number> => {
    const query = attemptReset ? 'UPDATE verification SET code=$1, issued_at=$2, count=$3 attempt=0 WHERE email=$4 AND deleted_at IS NULL' : 
        'UPDATE verification SET code=$1, issued_at=$2, count=$3 WHERE email=$4 AND deleted_at IS NULL';
    const params = [randomInt(100000, 1000000), helpers.getDateWithTimezone(), count, email];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_UPDATE_VERIFICATION_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    return res?.rowCount ? <number>params[0] : 0;
}

export default generateVerificationCode;

