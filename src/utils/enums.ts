export enum Gender {
    MAN = 'man',
    WOMAN = 'woman',
    NON_BINARY = 'nonbinary'
}

export enum Search {
    MEN = 'men',
    WOMEN = 'women',
    EVERYONE = 'everyone'
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export enum Country {
    INDIA = 'india'
}

export enum StatusCodes {
    OK = 200,
    CREATED = 201,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INVALID_TOKEN = 498,

    INTERNAL_SERVER = 500
}

export enum Errors {
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden Resource',

    TOKEN_NOT_SUPPLIED = 'Token not supplied',
    TOKEN_INVALID = 'Token invalid',
    TOKEN_EXPIRED = 'Token expired',
    INVALID_TOKEN_PARAMS = 'Token params invalid',

    INVALID_VERIFICATION_CODE = 'Invalid verification code',
    VERIFICATION_CODE_EXPIRED = 'Verification code expired',
    VERIFICATION_CODE_ISSUED_RECENTLY = 'Verification code issued recently',
    VERIFICATION_CODE_GENERATE_LIMIT = 'Verification daily limit reached for generating code',
    VERIFICATION_CODE_ATTEMPTS_LIMIT = 'Verification attempt limit reached',

    CITY_NOT_FOUND = 'City not found',
    USER_NOT_FOUND = 'User not found',

    DUPLICATE_USER = 'User already exists with this email',

    INTERNAL_SERVER = 'Internal server error',
}

export enum ErrorCodes {
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',

    VALIDATION_ERROR = 'VALIDATION_ERROR',

    TOKEN_NOT_SUPPLIED = 'TOKEN_NOT_SUPPLIED',
    TOKEN_INVALID = 'TOKEN_INVALID',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    INVALID_TOKEN_PARAMS = 'INVALID_TOKEN_PARAMS',

    INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
    VERIFICATION_CODE_EXPIRED = 'VERIFICATION_CODE_EXPIRED',
    VERIFICATION_CODE_ISSUED_RECENTLY = 'VERIFICATION_CODE_ISSUED_RECENTLY',
    VERIFICATION_CODE_GENERATE_LIMIT = 'VERIFICATION_CODE_GENERATE_LIMIT',
    VERIFICATION_CODE_ATTEMPTS_LIMIT = 'VERIFICATION_CODE_ATTEMPTS_LIMIT',

    CITY_NOT_FOUND = 'CITY_NOT_FOUND',
    USER_NOT_FOUND = 'USER_NOT_FOUND',

    DUPLICATE_USER = 'DUPLICATE_USER',

    INTERNAL_SERVER = 'INTERNAL_SERVER',
}

export enum PrefixesForLogs {
    AUTH_TOKEN_SIGN_IN_ERROR = 'Auth token sign in error: ',
    AUTH_TOKEN_INVALID_ERROR = 'Auth token invalid error: ',
    AUTH_TOKEN_EXPIRED_ERROR = 'Auth token expired error: ',

    REDIS_SET_OBJECT = 'Redis set object error: ',
    REDIS_GET_USER = 'Redis get user error: ', 
    REDIS_GET_OBJECT = 'Redis get object error: ', 
    REDIS_CONNECTION_ERROR_CLIENT1 = 'Redis client 1 connection error: ',
    REDIS_CONNECTION_ERROR_CLIENT2 = 'Redis client 2 connection error: ',
    REDIS_CONNECTION_READY_CLIENT1 = 'Redis client 1 is ready: ',
    REDIS_CONNECTION_READY_CLIENT2 = 'Redis client 2 is ready: ',
    REDIS_PUBLISH_CHANNEL_ERROR = 'Redis publish channel error: ',
    REDIS_SUBSCRIBE_CHANNEL_ERROR = 'Redis subscribe channel error: ',
    REDIS_PROFILE_CREATE_ERROR = 'Redis profile create error: ',
    REDIS_PROFILE_CREATE_MAX_TRY_REACHED = 'Redis profile create max try reached: ',
    REDIS_MATCH_CREATE_MAX_TRY_REACHED = 'Redis match create max try reached: ',
    REDIS_MATCH_CREATE_ERROR = 'Redis match user create error: ',

    DB_CONNECTED = 'DB connection successful: ',
    DB_CONNECTION_FAILED = 'DB connection failed: ',
    DB_INSERT_USER_ERROR = 'DB insert user error: ',
    DB_VERIFY_USER_ERROR = 'DB verify user error: ', 
    DB_RESET_VERIFICATION_ERROR = 'DB reset verification error: ', 
    DB_GET_USER_BY_KEY_ERROR = 'DB get user by key error: ',
    DB_GET_USER_DETAILS_ERROR = 'DB get user details error: ',
    DB_VERIFY_TOKEN_IDENTITY_ERROR = 'DB verify token identity error: ',
    DB_UPDATE_VERIFICATION_ERROR = 'DB update verification error: ',
    DB_UPDATE_TOKEN_IDENTITY_ERROR = 'DB update token identity error: ',
    DB_SEARCH_CITIES_ERROR = 'DB search cities error: ',
    DB_GET_VERIFICATION_ERROR = 'DB get verification error: ',
    DB_UPDATE_VERIFICATION_ATTEMPTS_ERROR = 'DB update verification attempts error: ',

    EMAIL_SEND_ERROR = 'Email send error: '
}