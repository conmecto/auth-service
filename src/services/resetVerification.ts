import { getDbClient } from '../config';

const verifyCode = async (email: string, verificationCode: number): Promise<boolean> => {
    const updateQuery = 'udpate verification set code=null, count=0 where email=$1 and code=$2 and Math.floor(extract(epoch from now())*1000) < Math.floor((extract(epoch from issued_at)*1000) + 600000) and deleted_at is null';
    const updateParams = [email, verificationCode];
    const client = await getDbClient();
    const res = await client.query(updateQuery, updateParams);
    return Boolean(res.rowCount);
}

export default verifyCode;
