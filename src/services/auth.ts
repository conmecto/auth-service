import { sign, Algorithm } from 'jsonwebtoken';
import { interfaces, Environments } from '../utils';

const generateAuthToken = async (data: interfaces.IGeneric): Promise<interfaces.IToken> => {
    const payload = {
        email: <string> data.email
    };
    const accessTokenTime = 900000;
    const refreshTokenTime = 259200000;
    const accessSignOptions = {
        issuer: 'umami',
        expiresIn: accessTokenTime,
        algorithm: <Algorithm> 'RS256'
    };
    const refreshSignOptions = {
        issuer: 'umami',
        expiresIn: refreshTokenTime,
        algorithm: <Algorithm> 'RS256'
    };
    return {
        access: sign(payload, Environments.privateKey.access, accessSignOptions),
        refresh: sign(payload, Environments.privateKey.refresh, refreshSignOptions)
    };
}

export { generateAuthToken }