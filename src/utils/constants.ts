import moment from 'moment';

const USER_LOGGED_IN = 'User logged in successfully';
const USER_CREATED = 'User created successfully';

const OTP_TEXT = 'Conmecto OTP for login, valid for 1 min: ';
const OTP_RESEND_LIMIT = 5;
const OTP_VALIDATION_ATTEMPT_LIMIT = 5;
const OTP_EXPIRED_TIME_MIN = 1;

const TWELVE_HOURS_IN_MILLS = 43200000;
const ONE_HOUR_IN_MILLS = 3600000;

const ACCESS_TOKEN_TIME_SECONDS = 600; 
const REFRESH_TOKEN_TIME_SECONDS = 2592000; 
const TOKEN_ISSUER = 'Conmecto';
const TOKEN_ALGORITHM = 'RS256';    
const TOKEN_JWT_ID_LENGTH = 16;
const TOKEN_VALIDATED = 'Token verified successfully';
const TOKEN_ROTATED = 'Token rotated successfully';

const DB_CONNECTION_TIMEOUT_MILLIS = 10000;
const DB_MAX_CLIENTS = 20;
const DB_IDLE_TIMEOUT_MILLIS = 30000;

const REDIS_PUBLISH_MESSAGE_MAX_RETRY = 5; 
const REDIS_PUBLISH_MESSAGE_PROFILE_CACHE_KEY = 'create-profile-publish-message-count';
const REDIS_PUBLISH_MESSAGE_MATCH_CACHE_KEY = 'create-match-publish-message-count';

const PAST_DATE_18_YEARS_MILLIS = moment().subtract('18', 'years').unix() * 1000;

const appleAuthKeyUrl = 'https://appleid.apple.com/auth/keys';
const appleAuthKeyTimeoutMilli = 30000;
const appleIssuerUrl = 'https://appleid.apple.com';

const CREATE_USER_JOB_QUEUE = {
    ATTEMPTS: 1,
    STACK_TRACE_LIMIT: 1,
    REMOVE_ON_AGE_SEC: 3600,
    REMOVE_ON_FAIL_AGE_SEC: 86400,
    REMOVE_ON_COUNT: 1000
}

export { 
    USER_LOGGED_IN, PAST_DATE_18_YEARS_MILLIS, USER_CREATED, TOKEN_VALIDATED, OTP_RESEND_LIMIT,
    ACCESS_TOKEN_TIME_SECONDS, REFRESH_TOKEN_TIME_SECONDS, TOKEN_ISSUER, TOKEN_ALGORITHM, 
    TOKEN_JWT_ID_LENGTH, TOKEN_ROTATED, DB_CONNECTION_TIMEOUT_MILLIS, DB_MAX_CLIENTS, DB_IDLE_TIMEOUT_MILLIS, 
    TWELVE_HOURS_IN_MILLS, ONE_HOUR_IN_MILLS, REDIS_PUBLISH_MESSAGE_PROFILE_CACHE_KEY, 
    REDIS_PUBLISH_MESSAGE_MATCH_CACHE_KEY, REDIS_PUBLISH_MESSAGE_MAX_RETRY, OTP_EXPIRED_TIME_MIN, 
    OTP_TEXT, OTP_VALIDATION_ATTEMPT_LIMIT, appleAuthKeyUrl, appleAuthKeyTimeoutMilli, appleIssuerUrl,
    CREATE_USER_JOB_QUEUE
}