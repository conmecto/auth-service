export enum Gender {
    MAN = 'man',
    WOMAN = 'woman'
}

export enum Search {
    MAN = 'man',
    WOMAN = 'woman',
    ALL = 'all'
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
    NOT_FOUND = 404,
    INVALID_TOKEN = 498,

    INTERNAL_SERVER = 500
}

export enum Errors {
    TOKEN_NOT_SUPPLIED = 'Token not supplied',
    TOKEN_INVALID = 'Token invalid',
    TOKEN_EXPIRED = 'Token expired',
    INVALID_TOKEN_PARAMS = 'Token params invalid',

    INVALID_VERIFICATION_CODE = 'Invalid verification code',
    VERIFICATION_CODE_EXPIRED = 'Verification code expired',
    VERIFICATION_CODE_ISSUED = 'Verification code issued recently',
    VERIFICATION_CODE_DAILY_LIMIT = 'Verification daily limit reached',

    CITY_NOT_FOUND = 'City not found',
    USER_NOT_FOUND = 'User not found',

    DUPLICATE_USER = 'User already exists with this email',

    INTERNAL_SERVER = 'Internal server error',
}