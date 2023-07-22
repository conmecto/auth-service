import { interfaces, validationSchema, enums, constants, Environments } from '../utils';
import { getVerification, CustomError, generateVerificationCode, sendEmail } from '../services';


const checkResendCodeConditions = async (verification: interfaces.IVerificationObject): Promise<boolean> => {
    if (!verification) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);
    }
    if (!verification.issuedAt) {
        return false;
    }
    const isCodeValid = 
        Date.now() < (new Date(verification.issuedAt).getTime() + constants.VERIFICATION_CODE_EXPIRED_TIME_MILLS);
    if (isCodeValid) {
        return true;
    }
    const codeIssuedRecently = 
        Date.now() < (new Date(verification.issuedAt).getTime() + constants.VERIFICATION_CODE_RESENT_BUFFER_TIME_MILLS);
    if (codeIssuedRecently) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.VERIFICATION_CODE_ISSUED_RECENTLY, enums.ErrorCodes.VERIFICATION_CODE_ISSUED_RECENTLY);    
    }
    if (verification.count >= constants.VERIFICATION_CODE_GENERATE_LIMIT) {
        const resetTimeMills = (new Date(verification.issuedAt).getTime() + constants.TWELVE_HOURS_IN_MILLS);
        const checkResetTimePeriodOver = Date.now() > resetTimeMills;
        if (checkResetTimePeriodOver) {
            return false;
        }
        const resetTimeHours = Math.ceil((resetTimeMills - Date.now())/(3600000));
        const hourString = 'hour' + (resetTimeHours > 1 ? 's' : '');
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.VERIFICATION_CODE_GENERATE_LIMIT + `, please try in ${resetTimeHours} ${hourString}`, enums.ErrorCodes.VERIFICATION_CODE_GENERATE_LIMIT);    
    }
    return false;
}

const resendVerificationCode = async (req: interfaces.IRequestObject): Promise<interfaces.IGeneric> => {
    await validationSchema.resendCodeSchema.validateAsync(req.body);
    const email = <string>req.body.email;
    const verification = await getVerification(email);
    const isCodeValid = await checkResendCodeConditions(verification);
    let text = constants.VERIFICATION_CODE_EMAIL_TEXT;
    if (isCodeValid) {
        text += ` ${verification.code}`;
    } else {
        const checkMaxCount = verification.count === constants.VERIFICATION_CODE_GENERATE_LIMIT;
        const count = (verification.count % constants.VERIFICATION_CODE_GENERATE_LIMIT) + 1;
        const newCode = await generateVerificationCode(email, count, checkMaxCount);
        if (!newCode) {
            throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);    
        }
        text += ` ${newCode}`;
    }
    await sendEmail(Environments.email, email, constants.VERIFICATION_CODE_EMAIL_SUBJECT, text);
    return {
        message: constants.VERIFICATION_CODE_SENT
    }
}

export default resendVerificationCode;