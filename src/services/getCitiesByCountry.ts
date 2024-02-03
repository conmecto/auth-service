import { QueryResult } from 'pg';
import { getDbClient } from '../config';

const getCitiesByCountry = async (country: string): Promise<string[] | null> => {
    const query = `SELECT name FROM city WHERE country=$1 AND deleted_at IS NULL`;
    const params = [country];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }    
    return res?.rows?.length ? res.rows.map(city => city.name) : null;
}

export default getCitiesByCountry;