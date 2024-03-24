import { Response, NextFunction } from 'express';
import { interfaces, enums } from '../utils';
import { CustomError, cacheClient, verifyAuthToken } from '../services';

const authenticateRequestMiddleware = async (req: interfaces.IRequestObject, res: Response, next: NextFunction) => {
    try { 
        let accessToken: string = req.headers['authorization'];
        if (!accessToken) {
            throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
        }
        const payload = await verifyAuthToken(accessToken.replace('Bearer ', ''));
        const userCache = await cacheClient.getKey(`user:${payload.userId}`);
        if (!userCache) {
            throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID)
        }
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next(error);
    }
}

export default authenticateRequestMiddleware;