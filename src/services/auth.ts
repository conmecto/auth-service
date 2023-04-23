import { sign, Algorithm } from 'jsonwebtoken';
import { interfaces, Environments, constants, enums, helpers } from '../utils';
import CustomError from './customError';

const generateAuthToken = async (data: interfaces.ITokenPayload): Promise<interfaces.IToken> => {
    const accessTokenTime = constants.ACCESS_TOKEN_TIME_SECONDS;
    const refreshTokenTime = constants.REFRESH_TOKEN_TIME_SECONDS;
    const accessSignOptions = {
        issuer: constants.TOKEN_ISSUER,
        expiresIn: accessTokenTime,
        algorithm: <Algorithm> constants.TOKEN_ALGORITHM
    };
    const jwtId = await helpers.getRandomKey(constants.TOKEN_JWT_ID_LENGTH);
    if (!jwtId) throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    const refreshSignOptions = {
        issuer: constants.TOKEN_ISSUER,
        expiresIn: refreshTokenTime,
        algorithm: <Algorithm> constants.TOKEN_ALGORITHM,
        jwtid: jwtId
    };
    const access: string | null = await signToken(data, accessSignOptions);
    if (!access) throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    const refresh: string | null = await signToken(data, refreshSignOptions);
    if (!refresh) throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    return { access, refresh, exp: refreshTokenTime, jti: jwtId };
}

const signToken = async (payload: interfaces.IGeneric, signOptions: interfaces.ITokenSignOptions): Promise<string | null> => {
    const algorithm = <Algorithm> signOptions.algorithm;
    const token: string | null = await new Promise((resolve, reject) => {
        sign(payload, Environments.token.privateKey, { ...signOptions, algorithm }, (err, token) => {
            if (err || !token) reject(null);
            else resolve(token);
        });
    });
    return token;
}

export default generateAuthToken;