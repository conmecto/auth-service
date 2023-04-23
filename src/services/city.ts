import { getDbClient } from '../config';
 
const searchCity = async (city: string, country: string): Promise<boolean> => {
    const query = 'select id from city where name=$1 and country=$2';
    const params = [city, country];
    const client = await getDbClient();
    const res = await client.query(query, params);
    return Boolean(res.rowCount);
}

export default searchCity;