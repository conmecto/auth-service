import { interfaces, validationSchema, enums, constants } from '../utils';
import { CustomError, getUserByNumber, addOtp } from '../services';
import { sendOtp } from '../config';

const resendOtp = async (req: interfaces.IRequestObject): Promise<interfaces.ICreateUserResponse> => {
    await validationSchema.resendCodeSchema.validateAsync(req.body);
    const { extension, number } = req.body;
    const user = await getUserByNumber(extension, number);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    if (user.otpResendAttempts >= constants.OTP_RESEND_LIMIT) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.OTP_RESEND_LIMIT, enums.ErrorCodes.OTP_RESEND_LIMIT);    
    }
    const otpRes = await addOtp(user.userId);
    if (!otpRes?.code) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    await sendOtp({ userId: user.userId, extension, number, otp: otpRes.code });
    return {
        message: 'OTP sent successfully',
        data: [{ userId: user.userId, ...otpRes }]
    };
}

export default resendOtp;