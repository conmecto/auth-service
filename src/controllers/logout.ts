import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, userLogout } from '../services';

const logout = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    await validationSchema.logoutSchema.validateAsync(req.params);
    const { userId } = req.params;
    const res = await userLogout(Number(userId));
    if (!res) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    return {
        message: 'Logout successfully'
    };
}

export default logout;