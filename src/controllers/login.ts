import { interfaces, validationSchema, constants, enums } from '../utils';
import { verifyUser, CustomError, verifyCode, getUserByKey, generateAuthToken, updateTokenIdentity } from '../services';

const login = async (req: interfaces.IRequestObject): Promise<interfaces.ILoginUserResponse> => {
    await validationSchema.verifyEmailSchema.validateAsync(req.body);
    const loginUserObject = <interfaces.ILoginUserObject>req.body;
    const user = await getUserByKey('email', loginUserObject.email);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND);    
    }
    const tempFunctionHolder = user.verified ? verifyCode : verifyUser;
    const verifyRes = await tempFunctionHolder(loginUserObject.email, loginUserObject.verificationCode);
    if (!verifyRes) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_VERIFICATION_CODE);
    }
    const token = await generateAuthToken({ email: loginUserObject.email, userId: user.id });
    const exp = new Date(token.exp * 1000);
    await updateTokenIdentity({ userId: user.id, exp, jti: token.jti });
    return {
        message: constants.USER_LOGGED_IN,
        data: [{ access: token.access, refresh: token.refresh }]
    }
}

export default login;