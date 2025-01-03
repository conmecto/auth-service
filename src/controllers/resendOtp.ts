import { interfaces, validationSchema, enums, constants, Environments } from '../utils';
import { CustomError, getUserByEmail, addOtp } from '../services';
import { sendEmail } from '../config';

const resendOtp = async (req: interfaces.IRequestObject): Promise<interfaces.ICreateUserResponse> => {
    await validationSchema.resendCodeSchema.validateAsync(req.body);
    const { email } = req.body;
    const user = await getUserByEmail(email);
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
    if (Environments.sendOtp) {
        await sendEmail({ userId: user.userId, email, otp: otpRes.code });
    }
    return {
        message: 'OTP sent successfully',
        data: [{ userId: user.userId, token: otpRes.token }]
    };
}

export default resendOtp;