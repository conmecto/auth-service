import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const getVerification = async (email: string): Promise<interfaces.IVerificationObject> => {
    const query = 'SELECT id, code, count, issued_at, attempts FROM verification WHERE email=$1 AND deleted_at IS NULL';
    const param = [email];
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        console.log(query);
        console.log(param);
        res = await client.query(query, param);
    } catch(err) {
        console.log(enums.PrefixesForLogs.DB_GET_VERIFICATION_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    const verification = res?.rows[0];
    if (verification) { 
        return <interfaces.IVerificationObject>omit({ 
            ...verification, issuedAt: verification.issued_at
        }, ['issued_at']);
    }
    return verification;
}

export default getVerification;
