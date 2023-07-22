import { interfaces, constants, enums } from '../utils';
import { CustomError, verifyAuthToken, getUserByKey, cacheClient } from '../services';

const authenticateRequest = async (req: interfaces.IRequestObject): Promise<interfaces.IAuthenticationResponse> => {
    let accessToken: string = req.headers['authorization'];
    if (!accessToken) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    const payload = await verifyAuthToken(accessToken.replace('Bearer ', ''));
    let userCache = await cacheClient.getUser(`user:${payload.email}`);
    let userDb: interfaces.IUserObj | null = null; 
    if (!userCache) {
        userDb = await getUserByKey('email', payload.email);
    }
    if (!userCache && !userDb) {
        throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID)
    }
    return {
        message: constants.TOKEN_VALIDATED,
        data: [{ email: payload.email, userId: payload.userId }]
    }
}

export default authenticateRequest;