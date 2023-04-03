import { dbSource } from '../config';
import { interfaces } from '../utils';

const getVerification = async (email: string): Promise<interfaces.IVerificationObject> => {
    const query = 'select count, issued_at from verification where email=$1 and deleted_at is null';
    const res = await dbSource.query(query, [email]);
    return res;
}

export { getVerification }
