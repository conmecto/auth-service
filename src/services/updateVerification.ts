import { randomInt } from 'crypto';
import { getDbClient } from '../config';
import { helpers } from '../utils';

const generateVerificationCode = async (email: string, count: number): Promise<boolean> => {
    const query = 'update verification set code=$1, issued_at=$2, count=$3 where email=$4 and deleted_at is null';
    const params = [randomInt(999999, 1000000), helpers.getDateWithTimezone(), count, email];
    const client = await getDbClient();
    const res = await client.query(query, params);
    return Boolean(res.rowCount);
}

export default generateVerificationCode;

