import moment from 'moment';
import { interfaces, validationSchema, constants, enums, Environments } from '../utils';
import { addUser, CustomError, cacheClient, addOtp} from '../services';
import { sendOtp } from '../config';

const createUser = async (req: interfaces.IRequestObject): Promise<interfaces.ICreateUserResponse> => {
    await validationSchema.createUserSchema.validateAsync(req.body);
    const userObject = <interfaces.ICreateUserObject>req.body;
    
    const dob = moment(userObject.dob).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).toISOString(true);
    const phoneExtension = enums.PhoneExtension[userObject.country];
    const addUserRes = await addUser({ ...userObject, dob, extension: phoneExtension });
    if (!addUserRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    const [otpRes, cacheRes] = await Promise.all([
        addOtp(addUserRes.userId),
        cacheClient.setKey(`user:${addUserRes.userId}`, JSON.stringify({ id: addUserRes.userId, verified: false }))
    ]);
    if (otpRes?.code) {
        await sendOtp({ userId: addUserRes.userId, extension: phoneExtension, number: userObject.number, otp: otpRes.code });
    }
    return {
        message: constants.USER_CREATED,
        data: [{ userId: addUserRes.userId, token: <string>otpRes?.token }]
    }
}

export default createUser;