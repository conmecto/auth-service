import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, markAccountRemoved, userAccountRemoved } from '../services';

const removeAccount = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    await validationSchema.logoutSchema.validateAsync(req.params);
    const userId = Number(req.params?.userId);
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    const res = await markAccountRemoved(Number(userId));
    if (!res) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    await userAccountRemoved(userId);
    return {
        message: 'Account removed successfully'
    };
}

export default removeAccount;