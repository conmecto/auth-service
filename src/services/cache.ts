import { redisClient1 as cacheClient } from '../config';
import { enums, interfaces } from '../utils';
import logger from './logger';

const setKey = async (key: string, value: string): Promise<boolean | null> => {
    let res: string | null = null;
    try {
        if (cacheClient.isReady) {
            res = await cacheClient.set(key.toLocaleLowerCase(), value);
        } 
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_SET_OBJECT + errorString);
    }
    return Boolean(res);
}

const getUser = async (key: string) => {
    let value: interfaces.ICacheUserValue | null = null;
    try {
        if (cacheClient.isReady) {
            const tempValue = await cacheClient.get(key);
            value = tempValue ? JSON.parse(tempValue) : null;
        }
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_GET_USER + errorString);
    }
    return value;
}

const getKey = async (key: string): Promise<string | null> => {
    let value: string | null = null;
    try {
        if (cacheClient.isReady) {
            value = await cacheClient.get(key);
        }
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('Auth Service: ' + enums.PrefixesForLogs.REDIS_GET_OBJECT + errorString);
    }
    return value;
}

export { getUser, setKey, getKey }

