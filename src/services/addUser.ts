import { randomInt } from 'crypto';
import { dbSource } from '../config';
import { interfaces, helpers } from '../utils';

const addUser = async (createUserObject: interfaces.ICreateUserObject): Promise<boolean> => {
    const query1 = 'insert into users(email, name, dob, country, search_for, search_in, gender) values($1, $2, $3, $4, $5, $6, $7)';
    const params1 = [...Object.values(createUserObject)];

    const query2 = 'insert into verification(email, code, issued_at) values($1, $2, $3)';
    const params2 = [createUserObject.email, randomInt(999999, 1000000), helpers.getDateWithTimezone()];

    let res = false;
    await dbSource.transaction(async (entityManager) => {
        try {
            await entityManager.query(query1, params1);
            await entityManager.query(query2, params2);
            res = true;
        } catch(err) {
            console.error(err);
        }
    });  
    return res;
}

export { addUser }