import moment from 'moment';
import { interfaces, validationSchema, constants, enums, Environments } from '../utils';
import { 
    addUser, CustomError, cacheClient, verifyAppleAuthToken, generateAuthToken, 
    updateTokenIdentity, addUserCreatedJob, getUserByKey
} from '../services';
import updateDeviceInfo from './updateDeviceInfo';
//import { sendEmail } from '../config';

const createUser = async (req: interfaces.IRequestObject) => {
    const searchFor = enums.Search.EVERYONE;
    await validationSchema.createUserSchema.validateAsync({ ...req.body, searchFor });
    const userObject = <interfaces.ICreateUserObject>req.body;
    if (Environments.env !== 'dev') {
        const verifyRes = await verifyAppleAuthToken(userObject.appleAuthToken, userObject.appleAuthUserId);
        if (!verifyRes) {
            throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.TOKEN_INVALID, enums.ErrorCodes.TOKEN_INVALID);
        }
    }
    const dob = moment(userObject.dob).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0}).toISOString(true);
    //const phoneExtension = enums.PhoneExtension[userObject.country];
    const createUserObj = { 
        ...userObject, 
        verified: true,
        dob, 
        ...(userObject.email ? { email: userObject.email?.toLowerCase() } : {}),
        name: userObject.name.toLowerCase(), 
        city: userObject.city.toLowerCase(),
        country: userObject.country.toLowerCase(),
        searchFor,
        gender: userObject.gender.toLowerCase()
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
    const user = await getUserByKey('apple_auth_user_id', userObject.appleAuthUserId);
    if (!user) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);
    }
    const userId = user.id;
    if (req.body.deviceToken && req.body.deviceToken !== user.deviceToken) {
        await updateDeviceInfo(userId, req.body.deviceToken);
    }
    await cacheClient.setKey(`user:${userId}`, JSON.stringify({ id: userId, verified: true }));
    await addUserCreatedJob({ ...createUserObj, id: userId });
    const token = await generateAuthToken({ userId });
    const exp = moment().add(token.exp, 'seconds').toISOString(true);
    await updateTokenIdentity({ userId, expiredAt: exp, jti: token.jti });
    return {
        message: constants.USER_LOGGED_IN,
        data: [{ userId, access: token.access, refresh: token.refresh }]
    }
}

export default createUser;