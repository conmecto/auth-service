import { omit } from 'lodash';
import { redisClient1 as pubClient, sendPushNotification, createUserProfileQueue, createUserSettingQueue } from '../config';
import { Environments, interfaces, enums } from '../utils';
import logger from './logger';
import getUserDeviceInfo from './getUserDeviceInfo';

const addUserCreatedJob = async (data: interfaces.IUserCreatedMessageObj) => {
    try {
        const [profileJob, settingJob] = await Promise.all([
            createUserProfileQueue.add('createUserProfile', data),
            createUserSettingQueue.add('createUserSetting', data)
        ]);
        let res: { profileJobId?: string, settingJobId?: string } = {};
        if (profileJob?.id) {
            res.profileJobId = profileJob.id;
        }
        if (settingJob?.id) {
            res.settingJobId = settingJob.id;
        }
        return res;
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger(enums.PrefixesForLogs.ADD_USER_CREATED_JOB + errorString);
    }
}

const createMatchCreatedPushNotification = async (message: any, channel: string) => {
    try {
        const parsedMessage = JSON.parse(message);
        const userId = parsedMessage?.userId;
        if (userId) {
            const user = await getUserDeviceInfo(Number(userId));
            if (user?.deviceEndpoint) {
                await sendPushNotification({ 
                    message: "Looks like Conmecto find a new match for you 😉",
                    userId: user.id,
                    deviceEndpoint: user.deviceEndpoint
                });
            }
        }
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger(enums.PrefixesForLogs.REDIS_HANDLE_PUSH_NOTIFICATION_MATCH_ERROR + errorString);
    }
}

const userAccountRemoved = async (userId: number) => {
    try {
        if (!userId) {
            return false;
        }
        await pubClient.publish(
            Environments.redis.channels.userAccountRemoved, 
            Buffer.from(JSON.stringify({ userId }))
        );
        return true;
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger(enums.PrefixesForLogs.REDIS_ACCOUNT_REMOVED_PUBLISH_CHANNEL_ERROR + errorString);
        return false;
    }
}

export { 
    addUserCreatedJob, 
    createMatchCreatedPushNotification,
    userAccountRemoved
}