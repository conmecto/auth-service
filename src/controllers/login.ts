import { interfaces, validationSchema, constants, enums } from '../utils';
import { 
    verifyUser, CustomError, resetVerification, cacheClient, getUserDetails, updateVerificationAttempts,
    generateAuthToken, updateTokenIdentity, userCreatedMessage, getVerification 
} from '../services';

const login = async (req: interfaces.IRequestObject): Promise<interfaces.ILoginUserResponse> => {
    await validationSchema.verifyEmailSchema.validateAsync(req.body);
    const loginUserObject = <interfaces.ILoginUserObject>req.body;

    const user = await getUserDetails('email', loginUserObject.email);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    const verification = await getVerification(loginUserObject.email);
    if (!verification) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);  
    }

    const resetTimeMills = (new Date(verification.issuedAt).getTime() + constants.TWELVE_HOURS_IN_MILLS);   
    if (verification.attempts >= constants.VERIFICATION_CODE_ATTEMPT_LIMIT && 
        Date.now() < resetTimeMills
    ) {
        const resetTimeHours = Math.ceil((resetTimeMills - Date.now())/(3600000));
        const hourString = 'hour' + (resetTimeHours > 1 ? 's' : '');
        throw new CustomError(enums.StatusCodes.UNAUTHORIZED, enums.Errors.VERIFICATION_CODE_ATTEMPTS_LIMIT + `, please retry in ${resetTimeHours} ${hourString}`, enums.ErrorCodes.VERIFICATION_CODE_ATTEMPTS_LIMIT);    
    }
    
    if ( 
        verification.code !== loginUserObject.verificationCode ||   
        (new Date(verification.issuedAt).getTime() + constants.VERIFICATION_CODE_EXPIRED_TIME_MILLS) < Date.now()
    ) { 
        await updateVerificationAttempts(verification.id);
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_VERIFICATION_CODE, enums.ErrorCodes.INVALID_VERIFICATION_CODE);
    }

    const verifyOrResetRes = user.verified ? await resetVerification(verification.id) 
        : await verifyUser(loginUserObject.email, verification.id);
    if (!verifyOrResetRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }

    const token = await generateAuthToken({ email: loginUserObject.email, userId: user.id });
    const exp = new Date(Date.now() + (token.exp * 1000));
    await updateTokenIdentity({ userId: user.id, exp, jti: token.jti });
    if (!user.verified) {
        await cacheClient.setKey(`user:${loginUserObject.email}`, JSON.stringify({ id: user.id, verified: true }));
        await userCreatedMessage(user);
    }
    return {
        message: constants.USER_LOGGED_IN,
        data: [{ access: token.access, refresh: token.refresh }]
    }
}

export default login;