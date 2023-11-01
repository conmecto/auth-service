import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, getCitiesByCountry } from '../services';

const getCities = async (req: interfaces.IRequestObject) => {
    await validationSchema.getCitiesSchema.validateAsync(req.query);
    const { country } = req.query;
    const cities = await getCitiesByCountry(country);
    return {
      cities
    };
}

export default getCities;