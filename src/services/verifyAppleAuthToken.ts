import { verify } from 'jsonwebtoken';
import JwksRsa from 'jwks-rsa';
import CustomError from './customError';
import logger from './logger';
import { constants, enums, interfaces, Environments } from '../utils';

const verifyAppleAuthToken = async (token: string, appleAuthUserId: string): Promise<boolean> => {
    let signingKey = '';
    try {
        const [header] = token.split('.');
        const decodedHeader = Buffer.from(header, 'base64').toString('utf-8');
        const headerData = JSON.parse(decodedHeader);
        const client = new JwksRsa.JwksClient({
            jwksUri: constants.appleAuthKeyUrl,
            timeout: constants.appleAuthKeyTimeoutMilli
        });
        const kid = headerData.kid;
        const key = await client.getSigningKey(kid);
        signingKey = key.getPublicKey();
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger(enums.PrefixesForLogs.APPLE_AUTH_TOKEN_ERROR + errorString);
    }
    if (signingKey) {
        const payload: interfaces.IAppleAuthTokenPayload = await new Promise((resolve, reject) => {
            const callback = (err, payload) => {
                if (err) {
                    reject(new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID));
                } else {
                    resolve(<interfaces.IAppleAuthTokenPayload>payload);
                }
            }
            verify(token, signingKey, { 
                    issuer: constants.appleIssuerUrl, 
                    algorithms: ['RS256'],
                    audience: Environments.appBundleId
                }, callback
            );
        });
        if (payload.sub === appleAuthUserId) {
            return true;
        }
    }
    return false;
}

export default verifyAppleAuthToken;