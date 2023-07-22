import { verify } from 'jsonwebtoken';
import { enums, Environments, interfaces } from '../utils';
import CustomError from './customError';

const verifyAuthToken = async (token: string): Promise<interfaces.ITokenVerifyResponse> => {
    const payload: interfaces.ITokenVerifyResponse = await new Promise((resolve, reject) => {
        const key = Buffer.from(Environments.token.publicKey, 'base64').toString('ascii');
        verify(token, key, (err, payload) => {
            if (!err && !payload) {
                reject(new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER));
            } else if (err && err.name === 'JsonWebTokenError') {
                console.log(enums.PrefixesForLogs.AUTH_TOKEN_INVALID_ERROR + err);
                reject(new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID));
            } else if (err && err.name === 'TokenExpiredError') { 
                console.log(enums.PrefixesForLogs.AUTH_TOKEN_EXPIRED_ERROR + err);
                reject(new CustomError(enums.StatusCodes.UNAUTHORIZED, enums.Errors.TOKEN_EXPIRED, enums.ErrorCodes.TOKEN_EXPIRED));
            } else {
                resolve(<interfaces.ITokenVerifyResponse>payload);
            }
        });
    });
    return payload;
}

export default verifyAuthToken;