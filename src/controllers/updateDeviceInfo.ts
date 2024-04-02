import { interfaces, enums } from '../utils';
import { updateUserDeviceInfo, logger } from '../services';
import { createUserNotificationEndPoint } from '../config';

const updateDeviceInfo = async (userId: number, deviceToken: string): Promise<boolean> => {
    const endpointArn = await createUserNotificationEndPoint({ userId, deviceToken });
    let updateDoc: interfaces.IUpdateUserNotificationEndPoint = {
        deviceToken
    }
    if (endpointArn) {
        updateDoc.deviceEndpoint = endpointArn;
    }
    try {
        const res = await updateUserDeviceInfo(userId, updateDoc);
        return res;
    } catch(error) {
        await logger('Auth Service: ' + 'For userId:' + userId + enums.PrefixesForLogs.SAVE_DEVICE_INFO_ERROR + error?.toString());
    }
    return false;
}

export default updateDeviceInfo;