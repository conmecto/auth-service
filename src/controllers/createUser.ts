import { interfaces, validationSchema, constants, enums } from '../utils';
import { addUser, searchCity, CustomError, getUserByEmail } from '../services';

const createUser = async (req: interfaces.IRequestObject): Promise<interfaces.ICreateUserResponse> => {
    await validationSchema.createUserSchema.validateAsync(req.body);
    const userObject = <interfaces.ICreateUserObject>req.body;

    // Pending: convert this to cache
    const checkDuplicateUser = await getUserByEmail(userObject.email);  
    if (checkDuplicateUser) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.DUPLICATE_USER);
    }

    // Pending: convert this to cache
    const checkCity = await searchCity(userObject.searchIn, userObject.country);
    if (!checkCity) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.CITY_NOT_FOUND);
    }
    const response = await addUser(userObject);
    if (!response) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    }

    // add service to send verification code email
    return {
        message: constants.USER_CREATED,
        data: [{
            email: userObject.email
        }]
    }
}

export default createUser;