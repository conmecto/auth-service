import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getVerification = async (email: string): Promise<interfaces.IVerificationObject> => {
    const query = 'select count, issued_at from verification where email=$1 and deleted_at is null';
    const param = [email];
    const client = await getDbClient();
    const res = await client.query(query, param);
    return res.rows[0];
}

export default getVerification;
