import { omit } from 'lodash';
import { redisClient1 as pubClient, sendPushNotification } from '../config';
import { Environments, interfaces, enums, constants, helpers } from '../utils';
import { getKey, setKey } from './cache';
import logger from './logger';
import getUserDeviceInfo from './getUserDeviceInfo';

const userCreatedMessage = async (data: interfaces.IGetUserByNumberRes) => {
    try {
        if (!data || !Object.keys(data).length) {
            return false;
        }
        const payload = omit(data, ['deviceToken']);
        await pubClient.publish(
            Environments.redis.channels.userCreatedProfile, 
            Buffer.from(JSON.stringify({ ...payload, id: data.userId }))
        );
        await pubClient.publish(
            Environments.redis.channels.userCreatedMatch, 
            Buffer.from(JSON.stringify({ ...payload, id: data.userId }))
        );
        return true;
    } catch(err) {
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_PUBLISH_CHANNEL_ERROR + err?.toString());
        return false;
    }
}

const handleProfileCreateErrorMessage = async (message: any, channel: string) => {
    const parsedMessage = JSON.parse(message);
    const key = parsedMessage?.id + constants.REDIS_PUBLISH_MESSAGE_PROFILE_CACHE_KEY;
    const count = await getKey(key);
    if (count === null || parseInt(count) < constants.REDIS_PUBLISH_MESSAGE_MAX_RETRY) {
        await pubClient.publish(
            Environments.redis.channels.userCreatedProfile, 
            message
        );
        await setKey(parsedMessage?.id + constants.REDIS_PUBLISH_MESSAGE_PROFILE_CACHE_KEY, (count === null ? 0 : parseInt(count) + 1) + '');
    } else {
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_PROFILE_CREATE_MAX_TRY_REACHED + channel);
    }
}

const handleMatchCreateErrorMessage = async (message: any, channel: string) => {
    const parsedMessage = JSON.parse(message);
    const key = parsedMessage?.id + constants.REDIS_PUBLISH_MESSAGE_MATCH_CACHE_KEY;
    const count = await getKey(key);
    if (count === null || parseInt(count) < constants.REDIS_PUBLISH_MESSAGE_MAX_RETRY) {
        await pubClient.publish(
            Environments.redis.channels.userCreatedMatch, 
            message
        );
        await setKey(parsedMessage?.id + constants.REDIS_PUBLISH_MESSAGE_MATCH_CACHE_KEY, (count === null ? 0 : parseInt(count) + 1) + '');
    } else {
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_MATCH_CREATE_MAX_TRY_REACHED + channel);
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
                    message: "Hi " + helpers.capitalize(user.name) + ", You have just got a Match! 😉",
                    userId: user.id,
                    deviceEndpoint: user.deviceEndpoint
                });
            }
        }
    } catch(error) {
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_HANDLE_PUSH_NOTIFICATION_MATCH_ERROR + error?.toString());
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
    } catch(err) {
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_ACCOUNT_REMOVED_PUBLISH_CHANNEL_ERROR + err?.toString());
        return false;
    }
}

export { 
    userCreatedMessage, handleMatchCreateErrorMessage, handleProfileCreateErrorMessage, createMatchCreatedPushNotification,
    userAccountRemoved
}