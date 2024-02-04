import { interfaces, validationSchema } from '../utils';
import { getCitiesByCountry, cacheClient } from '../services';

const getCities = async (req: interfaces.IRequestObject) => {
    await validationSchema.getCitiesSchema.validateAsync(req.query);
    const { country } = req.query;
    const cacheCities = await cacheClient.getKey(country?.toLowerCase());
    if (cacheCities) {
        return {
            cities: cacheCities.split(',')
        }
    }
    const cities = await getCitiesByCountry(country);
    return {
      cities
    };
}

export default getCities;