import { interfaces, validationSchema, constants, enums, Environments } from '../utils';
import { addUser, searchCities, CustomError, getUserByKey, sendEmail, cacheClient } from '../services';

const createUser = async (req: interfaces.IRequestObject): Promise<interfaces.ICreateUserResponse> => {
    await validationSchema.createUserSchema.validateAsync(req.body);
    const userObject = <interfaces.ICreateUserObject>req.body;
    
    const checkDuplicateUserCache = await cacheClient.getUser(`user:${userObject.email}`);
    let checkDuplicateUserDb: interfaces.IUserObj | null = null; 
    if (!checkDuplicateUserCache) {
        checkDuplicateUserDb = await getUserByKey('email', userObject.email);  
    }
    if (checkDuplicateUserCache || checkDuplicateUserDb) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.DUPLICATE_USER, enums.ErrorCodes.DUPLICATE_USER);
    }

    const checkCities = await searchCities([userObject.searchIn, userObject.city], userObject.country);
    if (!checkCities.length) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.CITY_NOT_FOUND, enums.ErrorCodes.CITY_NOT_FOUND);
    }
    const dob = new Date(userObject.dob.toString().split('/').map(i => parseInt(i)).reverse().join('-'));
    const addUserRes = await addUser({ ...userObject, dob });
    if (!addUserRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    await cacheClient.setKey(`user:${addUserRes.userId}`, JSON.stringify({ id: addUserRes.userId, verified: false }));
    await cacheClient.setKey(`user:${userObject.email}`, JSON.stringify({ id: addUserRes.userId }));
    await sendEmail(Environments.email, userObject.email, constants.VERIFICATION_CODE_EMAIL_SUBJECT, constants.VERIFICATION_CODE_EMAIL_TEXT + addUserRes.verificationCode);
    return {
        message: constants.USER_CREATED,
        data: [{
            email: userObject.email
        }]
    }
}

export default createUser;