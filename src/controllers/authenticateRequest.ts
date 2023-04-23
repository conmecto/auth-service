import { interfaces, constants, enums } from '../utils';
import { CustomError, verifyAuthToken, getUserByKey } from '../services';

const authenticateRequest = async (req: interfaces.IRequestObject): Promise<interfaces.IAuthenticationResponse> => {
    const accessToken: string | undefined = req.headers['authorization'];
    if (!accessToken) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.TOKEN_NOT_SUPPLIED);
    }
    const payload = await verifyAuthToken(accessToken);
    const user = await getUserByKey('id', payload.userId);
    if (!user) {
        throw new CustomError(enums.StatusCodes.INVALID_TOKEN, enums.Errors.TOKEN_INVALID)
    }
    return {
        message: constants.TOKEN_VALIDATED,
        data: [{ email: payload.email, userId: payload.userId }]
    }
}

export default authenticateRequest;