import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';
 
const searchCities = async (cities: string[], country: string): Promise<interfaces.ISearchCityResponse[]> => {
    const query = 'SELECT name, country FROM city WHERE (name=$1 OR name=$2) AND country=$3';
    const params = [cities[0], cities[1], country];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_SEARCH_CITIES_ERROR + err);
        throw err;
    } finally {
        client.release();
    } 
    return res?.rows?.length ? res.rows : [];
}

export default searchCities;