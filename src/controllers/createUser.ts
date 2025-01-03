import moment from 'moment';
import { interfaces, validationSchema, constants, enums, Environments } from '../utils';
import { 
    addUser, CustomError, cacheClient, verifyAppleAuthToken, generateAuthToken, 
    updateTokenIdentity, addUserCreatedJob, getUserByKey
} from '../services';
import updateDeviceInfo from './updateDeviceInfo';
//import { sendEmail } from '../config';

const createUser = async (req: interfaces.IRequestObject) => {
    await validationSchema.createUserSchema.validateAsync({ ...req.body });
    const userObject = <interfaces.ICreateUserObject>req.body;
    if (Environments.env !== 'dev') {
        const verifyRes = await verifyAppleAuthToken(userObject.appleAuthToken, userObject.appleAuthUserId);
        if (!verifyRes) {
            throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID);
        }
    }
    //const phoneExtension = enums.PhoneExtension[userObject.country];
    const createUserObj = { 
        ...userObject, 
        verified: true,
        ...(userObject.email ? { email: userObject.email?.toLowerCase() } : {}),
        ...(userObject.name ? { name: userObject.name?.toLowerCase() } : {}),
        country: userObject.country.toLowerCase()
    };
    const addUserRes = await addUser(createUserObj);
    if (!addUserRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    //const [otpRes, cacheRes] = await Promise.all([
        //addOtp(addUserRes.userId),
        //cacheClient.setKey(`user:${addUserRes.userId}`, JSON.stringify({ id: addUserRes.userId, verified: false }))
    //]);
    // if (otpRes?.code && Environments.sendOtp) {
    //     await sendEmail({ userId: addUserRes.userId, email: userObject.email, otp: otpRes.code });
    // }
    const userId = addUserRes.userId;
    if (req.body.deviceToken) {
        await updateDeviceInfo(userId, req.body.deviceToken);
    }
    const jobRes = await addUserCreatedJob({ id: userId, name: addUserRes.name, country: createUserObj.country });
    await cacheClient.setKey(
        `user:${userId}`, 
        JSON.stringify({ 
            id: userId, 
            verified: true, 
            ...(jobRes ? jobRes : {}) 
        })
    );
    const token = await generateAuthToken({ userId });
    const exp = moment().add(token.exp, 'seconds').toISOString(true);
    await updateTokenIdentity({ userId, expiredAt: exp, jti: token.jti });
    return {
        message: constants.USER_LOGGED_IN,
        data: [{ userId, access: token.access, refresh: token.refresh }]
    }
}

export default createUser;