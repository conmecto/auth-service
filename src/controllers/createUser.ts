import { interfaces, validationSchema, constants, enums, Environments } from '../utils';
import { addUser, searchCity, CustomError, getUserByKey, sendEmail } from '../services';

const createUser = async (req: interfaces.IRequestObject): Promise<interfaces.ICreateUserResponse> => {
    await validationSchema.createUserSchema.validateAsync(req.body);
    const userObject = <interfaces.ICreateUserObject>req.body;
    const checkDuplicateUser = await getUserByKey('email', userObject.email);  
    if (checkDuplicateUser) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.DUPLICATE_USER);
    }
    const checkCity = await searchCity(userObject.searchIn, userObject.country);
    if (!checkCity) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.CITY_NOT_FOUND);
    }
    const verificationCode = await addUser(userObject);
    if (!verificationCode) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    }
    await sendEmail(Environments.email, userObject.email, constants.VERIFICATION_CODE_EMAIL_SUBJECT, constants.VERIFICATION_CODE_EMAIL_TEXT);
    return {
        message: constants.USER_CREATED,
        data: [{
            email: userObject.email
        }]
    }
}

export default createUser;