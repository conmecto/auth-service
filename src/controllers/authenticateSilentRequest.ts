import { interfaces, constants, enums } from '../utils';
import { CustomError, verifyAuthToken, verifyTokenIdentity, generateAuthToken, updateTokenIdentity } from '../services';

const authenticateSilentRequest = async (req: interfaces.IRequestObject): Promise<interfaces.ILoginUserResponse> => {
    const grantType: string | undefined = req.body['grant_type'];
    const refreshToken: string | undefined = req.body['refresh_token']; 
    if (!grantType || !refreshToken || grantType !== 'refresh_token') {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_TOKEN_PARAMS);
    }
    const payload = await verifyAuthToken(refreshToken);
    const tokenIdentity = await verifyTokenIdentity(payload.jti, payload.userId);
    if (!tokenIdentity) {
        throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID);
    }
    const token = await generateAuthToken({ userId: payload.userId, email: payload.email });
    const exp = new Date(token.exp * 1000);
    await updateTokenIdentity({ userId: payload.userId, exp, jti: token.jti });
    return {
        message: constants.TOKEN_VALIDATED,
        data: [{ access: token.access, refresh: token.refresh }]
    }
}

export default authenticateSilentRequest;