import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, checkUserExists } from '../services';

const checkUser = async (req: interfaces.IRequestObject) => {
    await validationSchema.checkUserSchema.validateAsync(req.query);
    const user = await checkUserExists(req.query.appleAuthUserId);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    return {
        message: 'User already exists'
    };
}

export default checkUser;