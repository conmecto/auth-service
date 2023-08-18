import { interfaces, constants, enums } from '../utils';
import { CustomError, verifyAuthToken, verifyTokenIdentity, generateAuthToken, updateTokenIdentity } from '../services';

const authenticateSilentRequest = async (req: interfaces.IRequestObject): Promise<interfaces.ILoginUserResponse> => {
    const grantType: string | undefined = req.body['grant_type'];
    const refreshToken: string | undefined = req.body['refresh_token']; 
    if (!grantType || !refreshToken || grantType !== 'refresh_token') {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_TOKEN_PARAMS, enums.ErrorCodes.INVALID_TOKEN_PARAMS);
    }
    const payload = await verifyAuthToken(refreshToken.replace('Bearer ', ''));
    const tokenIdentity = await verifyTokenIdentity(payload.jti, payload.userId);
    if (!tokenIdentity) {
        throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID);
    }
    const token = await generateAuthToken({ userId: payload.userId, email: payload.email });
    const exp = new Date(Date.now() + (token.exp * 1000));
    await updateTokenIdentity({ userId: payload.userId, exp, jti: token.jti });
    return {
        message: constants.TOKEN_VALIDATED,
        data: [{ userId: payload.userId, access: token.access, refresh: token.refresh }]
    }
}

export default authenticateSilentRequest;