import { dbSource } from '../config';

const getUserByEmail = async (email: string): Promise<any> => {
    const query = 'select id, verified from users where email=$1 and deleted_at is null';
    const params = [email];
    const res = await dbSource.query(query, params);
    return res;
}

export { getUserByEmail }