import { randomInt } from 'crypto';
import { dbSource } from '../config';
import { helpers } from '../utils';

const generateVerificationCode = async (email: string, count: number): Promise<boolean> => {
    const query = 'update verification set code=$1, issued_at=$2, count=$3 where email=$4 and deleted_at is null';
    const params = [randomInt(999999, 1000000), helpers.getDateWithTimezone(), count, email];
    const res = await dbSource.query(query, params);
    return res ? true : false;
}

export { generateVerificationCode }