import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, getUserByEmail } from '../services';

const findEmail = async (req: interfaces.IRequestObject) => {
    await validationSchema.resendCodeSchema.validateAsync(req.query);
    const user = await getUserByEmail(req.query.email);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    return {
        userId: user.userId
    };
}

export default findEmail;