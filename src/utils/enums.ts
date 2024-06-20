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

export enum PhoneExtension {
    'india' = '+91',
}

export enum StatusCodes {
    OK = 200,
    CREATED = 201,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
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

    OTP_RESEND_LIMIT = 'Otp resend limit reached',
    OTP_VALIDATION_ATTEMPTS_LIMIT = 'Otp validation attempt limit reached',
    OTP_INVALID = 'Otp invalid or expired',

    CITY_NOT_FOUND = 'City not found',
    USER_NOT_FOUND = 'User not found',
    INVALID_EMAIL = 'Invalid email',

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

    OTP_RESEND_LIMIT = 'OTP_RESEND_LIMIT',
    OTP_VALIDATION_ATTEMPTS_LIMIT = 'OTP_VALIDATION_ATTEMPTS_LIMIT',
    OTP_INVALID = 'OTP_INVALID',

    CITY_NOT_FOUND = 'CITY_NOT_FOUND',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',

    INVALID_EMAIL = 'INVALID_EMAIL',

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
    REDIS_LOGGING_CHANNEL_ERROR = 'Redis logging channel error: ',
    REDIS_HANDLE_PUSH_NOTIFICATION_MATCH_ERROR = 'Redis handle push notification match error: ',
    REDIS_ACCOUNT_REMOVED_PUBLISH_CHANNEL_ERROR = 'Redis account removed publish channel error',

    DB_CONNECTED = 'DB connection successful: ',
    DB_CONNECTION_FAILED = 'DB connection failed: ',
    DB_INSERT_USER_ERROR = 'DB insert user error: ',
    DB_VERIFY_OTP_ERROR = 'DB verify otp error: ', 
    DB_GET_USER_BY_KEY_ERROR = 'DB get user by key error: ',
    DB_GET_USER_BY_NUMBER_ERROR = 'DB get user by number error: ',
    DB_VERIFY_TOKEN_IDENTITY_ERROR = 'DB verify token identity error: ',
    DB_UPDATE_TOKEN_IDENTITY_ERROR = 'DB update token identity error: ',
    DB_SEARCH_CITIES_ERROR = 'DB search cities error: ',
    DB_ADD_OTP_ERROR = 'DB add otp error: ',
    DB_GET_CITIES_ERROR = 'DB get cities error: ',
    DB_LOGOUT_ERROR = 'DB logout error: ',

    AWS_SEND_OTP_ERROR = 'Aws send otp error: ',
    AWS_SNS_CREATE_PLATFORM_ENDPOINT_ERROR = 'Aws create platform endpoint error: ',
    AWS_SNS_PUSH_NOTIFICATION_ERROR = 'Aws push notification error: ',

    APPLE_AUTH_TOKEN_ERROR = 'Apple auth token error: ',

    SAVE_DEVICE_INFO_ERROR = 'Save device info error: '
}

export enum UserFieldsDbName {
    'id' = 'id',
    'userId' = 'user_id',
    'user_id' = 'userId',
    'searchFor' = 'search_for',
    'search_for' = 'searchFor',
    'searchIn' = 'search_in',
    'search_in' = 'searchIn',
    'city' = 'city',
    'country' = 'country',
    'name' = 'name',
    'dob' = 'dob',
    'email' = 'email',
    'gender' = 'gender',
    'createdAt' = 'created_at',
    'created_at' = 'createdAt',
    'updatedAt' = 'updated_at',
    'updated_at' = 'updatedAt',
    'deleted_at' = 'deletedAt',
    'deletedAt' = 'deleted_at',
    'apple_auth_user_id' = 'appleAuthUserId',
    'appleAuthUserId' = 'apple_auth_user_id',
    'verified' = 'verified',
    'deviceToken' = 'device_token',
    'device_token' = 'deviceToken',
    'terms_accepted' = 'termsAccepted', 
    'termsAccepted' = 'terms_accepted',
    'otpResendAttempts' = 'otp_resend_attempts',
    'otpValidationAttempts' = 'otp_validation_attempts'
}