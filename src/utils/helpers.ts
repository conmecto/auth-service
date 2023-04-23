import moment from 'moment';
import { randomBytes } from 'crypto';

const getDateWithTimezone = (): string => {
    return moment().format('YYYY-MM-DD HH:mm:ss Z');
}

const getRandomKey = async (size: number): Promise<string | null> => {
    const key: string | null = await new Promise((resolve, reject) => {
        randomBytes(size, (err, buf) => {
            if (err) reject(null);
            else resolve(buf.toString('hex'));
        });
    })
    return key;
}

export { getDateWithTimezone, getRandomKey }