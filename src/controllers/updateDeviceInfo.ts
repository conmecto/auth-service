import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, updateUserDeviceInfo } from '../services';
import { createUserNotificationEndPoint } from '../config';

const updateDeviceInfo = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    const { userId } = req.params;
    const { deviceToken } = req.body;
    await validationSchema.deviceUpdateSchema.validateAsync({ userId, deviceToken });
    const endpointArn = await createUserNotificationEndPoint({ userId, deviceToken });
    let updateDoc: interfaces.IUpdateUserNotificationEndPoint = {
        deviceToken
    }
    if (endpointArn) {
        updateDoc.deviceEndpoint = endpointArn;
    }
    const res = await updateUserDeviceInfo(userId, updateDoc);
    if (!res) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.USER_NOT_FOUND, enums.ErrorCodes.USER_NOT_FOUND);    
    }
    return {
        message: 'User device info updated successfully'
    };
}

export default updateDeviceInfo;