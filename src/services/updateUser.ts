import { dbSource } from '../config';

const verifyUser = async (email: string, verificationCode: number): Promise<boolean> => {
    const updateQuery1 = 'udpate verification set count=0 where email=$1 and code=$2 and Math.floor(extract(epoch from now())*1000) < Math.floor((extract(epoch from issued_at)*1000) + 600000) and deleted_at is null';
    const updateParams1 = [email, verificationCode];
    
    const updateQuery2 = 'update users set verified=$1 where email=$2 and deleted_at is null';
    const updateParams2 = [true, email];
    let result = false;
    await dbSource.transaction(async (entityManager) => {
        try {
            await entityManager.query(updateQuery1, updateParams1);
            await entityManager.query(updateQuery2, updateParams2);
            result = true;
        } catch(err) {
            console.error(err);
        }
    });
    if (!result) {
        return false;
    }    
    return true;
}

const verifyCode = async (email: string, verificationCode: number): Promise<boolean> => {
    const updateQuery = 'udpate verification set count=0 where email=$1 and code=$2 and Math.floor(extract(epoch from now())*1000) < Math.floor((extract(epoch from issued_at)*1000) + 600000) and deleted_at is null';
    const updateParams = [email, verificationCode];
    
    const res = await dbSource.query(updateQuery, updateParams);
    return res ? true : false;
}

export { verifyUser, verifyCode };