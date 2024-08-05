import { Queue } from 'bullmq';
import { Environments, constants } from '../utils';

const options = constants.CREATE_USER_JOB_QUEUE;

const createUserSettingQueue = new Queue('createUserSettingQueue', { 
    defaultJobOptions: { 
        attempts: options.ATTEMPTS,
        stackTraceLimit: options.STACK_TRACE_LIMIT,
        removeOnComplete: {
            age: options.REMOVE_ON_AGE_SEC,
            count: options.REMOVE_ON_COUNT,
        },
        removeOnFail: {
            age: options.REMOVE_ON_FAIL_AGE_SEC,
            count: options.REMOVE_ON_COUNT
        },
    }, 
    connection: {
        host: Environments.redis.host,
        port: Environments.redis.port,
        username: Environments.redis.username,
        password: Environments.redis.password
    }
});

const createUserProfileQueue = new Queue('createUserProfileQueue', { 
    defaultJobOptions: { 
        attempts: options.ATTEMPTS,
        stackTraceLimit: options.STACK_TRACE_LIMIT,
        removeOnComplete: {
            age: options.REMOVE_ON_AGE_SEC,
            count: options.REMOVE_ON_COUNT,
        },
        removeOnFail: {
            age: options.REMOVE_ON_FAIL_AGE_SEC,
            count: options.REMOVE_ON_COUNT
        },
    }, 
    connection: {
        host: Environments.redis.host,
        port: Environments.redis.port,
        username: Environments.redis.username,
        password: Environments.redis.password
    }
});

export {
    createUserSettingQueue,
    createUserProfileQueue
}