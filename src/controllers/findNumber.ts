import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, getUserByNumber } from '../services';

const findNumber = async (req: interfaces.IRequestObject) => {
    await validationSchema.resendCodeSchema.validateAsync(req.query);
    const { extension, number } = req.query;
    const user = await getUserByNumber('+' + extension, number);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    return {
        userId: user.userId
    };
}

export default findNumber;