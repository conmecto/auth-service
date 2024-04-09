import moment from 'moment';
import { interfaces, validationSchema, constants, enums } from '../utils';
import { 
    verifyOtp, CustomError, cacheClient, getUserByNumber, generateAuthToken, updateTokenIdentity, userCreatedMessage,
    getUserByEmail, getUserByKey, verifyAppleAuthToken
} from '../services';
import updateDeviceInfo from './updateDeviceInfo';

const login = async (req: interfaces.IRequestObject): Promise<interfaces.ILoginUserResponse> => {
    await validationSchema.verifyOtpSchema.validateAsync(req.body);
    const loginUserObject = <interfaces.ILoginUserObject>req.body;
    const user = await getUserByKey('apple_auth_user_id', Number(loginUserObject.appleAuthUserId));
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    const verifyRes = await verifyAppleAuthToken(req.body.appleAuthToken, <string>user.email, user.appleAuthUserId);
    if (!verifyRes) {
        throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID);
    }    
    // if (user.otpValidationAttempts >= constants.OTP_VALIDATION_ATTEMPT_LIMIT) {
    //     throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.OTP_VALIDATION_ATTEMPTS_LIMIT, enums.ErrorCodes.OTP_VALIDATION_ATTEMPTS_LIMIT);    
    // }
    // const verifyOtpPayload = {
    //     userId: user.userId,
    //     code: loginUserObject.code,
    //     token: loginUserObject.token,
    //     verifyUser: !user.verified
    // }
    // const res = await verifyOtp(verifyOtpPayload);
    // if (!res) {
    //     throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    // }
    const userId = Number(user.id);
    const token = await generateAuthToken({ userId });
    const exp = moment().add(token.exp, 'seconds').toISOString(true);
    await updateTokenIdentity({ userId, expiredAt: exp, jti: token.jti });
    // if (!user.verified) {
    //     await cacheClient.setKey(`user:${userId}`, JSON.stringify({ id: user.userId, verified: true }));
    //     await userCreatedMessage(user);
    // }
    if (req.body.deviceToken && req.body.deviceToken !== user.deviceToken) {
        await updateDeviceInfo(userId, req.body.deviceToken);
    }
    return {
        message: constants.USER_LOGGED_IN,
        data: [{ userId, access: token.access, refresh: token.refresh }]
    }
}

export default login;