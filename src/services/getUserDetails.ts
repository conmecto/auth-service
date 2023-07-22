import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const getUserDetails = async <T>(key: string, value: T): Promise<interfaces.IUserDetails> => {
    const query = `SELECT id, email, name, dob, city, country, gender, search_for, search_in, verified FROM users WHERE ${key}=$1 AND deleted_at IS NULL`;
    const params = [value];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.log(enums.PrefixesForLogs.DB_GET_USER_DETAILS_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    const user = res?.rows[0];
    if (user) { 
        return <interfaces.IUserDetails>omit({ 
            ...user, searchFor: user.search_for, searchIn: user.search_in
        }, ['search_for', 'search_in']);
    }
    return user;
}

export default getUserDetails;