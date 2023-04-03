import { interfaces, validationSchema, constants, enums } from '../utils';
import { verifyUser, CustomError, verifyCode, getUserByEmail, generateAuthToken } from '../services';

const verifyEmail = async (req: interfaces.IRequestObject): Promise<interfaces.ILoginUserResponse> => {
    await validationSchema.verifyEmailSchema.validateAsync(req.body);
    const loginUserObject = <interfaces.ILoginUserObject>req.body;
    
    // Convert this to cache
    const user = await getUserByEmail(loginUserObject.email);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND);    
    }
    const temp = user.verified ? verifyCode : verifyUser;

    const res = await temp(loginUserObject.email, loginUserObject.verificationCode);
    if (!res) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_VERIFICATION_CODE);
    }
    const token = await generateAuthToken({ email: loginUserObject.email });
    return {
        message: constants.USER_VERIFIED,
        data: [token]
    }
}

export default verifyEmail;