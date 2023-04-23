import { getDbClient } from '../config';

const verifyUser = async (email: string, verificationCode: number): Promise<boolean> => {
    const query1 = 'udpate verification set code=null, count=0 where email=$1 and code=$2 and Math.floor(extract(epoch from now())*1000) < Math.floor((extract(epoch from issued_at)*1000) + 600000) and deleted_at is null';
    const params1 = [email, verificationCode];
    const query2 = 'update users set verified=$1 where email=$2 and deleted_at is null';
    const params2 = [true, email];

    let res = false;
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        await client.query(query1, params1);
        await client.query(query2, params2);
        await client.query('COMMIT');
        res = true;
    } catch (e) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
    return res;
}

export default verifyUser;