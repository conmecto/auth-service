import moment from 'moment';
import { interfaces, validationSchema, enums, constants, Environments } from '../utils';
import { getVerification, CustomError, generateVerificationCode, sendEmail } from '../services';

const resendVerificationCode = async (req: interfaces.IRequestObject): Promise<interfaces.IGeneric> => {
    await validationSchema.resendCodeSchema.validateAsync(req.body);
    const email = <string>req.body.email;
    const verification = await getVerification(email);
    if (!verification) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND);
    }
    const codeExpiry = Date.now() < (moment(verification.issuedAt).valueOf() + 60000);
    if (codeExpiry) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.VERIFICATION_CODE_ISSUED);    
    }
    const codeTimeLimit = Date.now() < (moment(verification.issuedAt).valueOf() + 86400000);
    if (verification.count === 5 && codeTimeLimit) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.VERIFICATION_CODE_DAILY_LIMIT);    
    }
    const newCode = await generateVerificationCode(email, verification.count+1);
    if (!newCode) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);    
    }
    
    await sendEmail(Environments.email, email, constants.VERIFICATION_CODE_EMAIL_SUBJECT, constants.VERIFICATION_CODE_EMAIL_TEXT);
    return {
        message: constants.VERIFICATION_CODE_SENT
    }
}

export default resendVerificationCode;