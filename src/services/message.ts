import { redisClient1 as pubClient } from '../config';
import { Environments, interfaces, enums, constants } from '../utils';
import { getKey, setKey } from './cache';

const userCreatedMessage = async (data: interfaces.IGetUserByNumberRes) => {
    try {
        if (!data || !Object.keys(data).length) {
            return false;
        }
        await pubClient.publish(
            Environments.redis.channels.userCreatedProfile, 
            Buffer.from(JSON.stringify({ ...data, id: data.userId }))
        );
        await pubClient.publish(
            Environments.redis.channels.userCreatedMatch, 
            Buffer.from(JSON.stringify({ ...data, id: data.userId }))
        );
        return true;
    } catch(err) {
        console.error(enums.PrefixesForLogs.REDIS_PUBLISH_CHANNEL_ERROR + err);
        return false;
    }
}

const handleProfileCreateErrorMessage = async (message: any, channel: string) => {
    console.log(enums.PrefixesForLogs.REDIS_PROFILE_CREATE_ERROR + channel);
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
        console.log(enums.PrefixesForLogs.REDIS_PROFILE_CREATE_MAX_TRY_REACHED + channel);
    }
}

const handleMatchCreateErrorMessage = async (message: any, channel: string) => {
    console.log(enums.PrefixesForLogs.REDIS_MATCH_CREATE_ERROR + channel);
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
        console.log(enums.PrefixesForLogs.REDIS_MATCH_CREATE_MAX_TRY_REACHED+ channel);
    }
}

export { userCreatedMessage, handleMatchCreateErrorMessage, handleProfileCreateErrorMessage }