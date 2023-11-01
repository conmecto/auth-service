import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const getCitiesByCountry = async (country: string): Promise<string[] | null> => {
    const query = `SELECT name FROM city WHERE country=$1 AND deleted_at IS NULL`;
    const params = [country];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_GET_CITIES_ERROR + err);
        throw err;
    } finally {
        client.release();
    }    
    return res?.rows?.length ? res.rows.map(city => city.name) : null;
}

export default getCitiesByCountry;