import moment from 'moment';
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
    const token = await generateAuthToken({ userId: payload.userId, extension: payload.extension, number: payload.number });
    const exp = moment().add(token.exp, 'seconds').toISOString(true);
    await updateTokenIdentity({ userId: payload.userId, expiredAt: exp, jti: token.jti });
    return {
        message: constants.TOKEN_VALIDATED,
        data: [{ userId: payload.userId, access: token.access, refresh: token.refresh }]
    }
}

export default authenticateSilentRequest;