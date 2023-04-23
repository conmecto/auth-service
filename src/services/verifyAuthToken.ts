import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { enums, Environments, interfaces } from '../utils';
import CustomError from './customError';

const verifyAuthToken = async (token: string): Promise<interfaces.ITokenVerifyResponse> => {
    const payload: interfaces.ITokenVerifyResponse = await new Promise((resolve, reject) => {
        verify(token, Environments.token.publicKey, (err, payload) => {
            if (!err && !payload) {
                reject(new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER));
            } else if (err && err.name === 'JsonWebTokenError') {
                reject(new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID));
            } else if (err && err.name === 'TokenExpiredError') { 
                reject(new CustomError(enums.StatusCodes.UNAUTHORIZED, enums.Errors.TOKEN_EXPIRED));
            } else {
                resolve(<interfaces.ITokenVerifyResponse>payload);
            }
        });
    });
    return payload;
}

export default verifyAuthToken;