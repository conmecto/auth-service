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
    BAD_REQUEST = 400,
    NOT_FOUND = 404,

    OK = 200,
    CREATED = 201,

    INTERNAL_SERVER = 500
}

export enum Errors {
    INVALID_VERIFICATION_CODE = 'Invalid verification code',
    VERIFICATION_CODE_EXPIRED = 'Verification code expired',
    VERIFICATION_CODE_ISSUED = 'Verification code issued recently',
    VERIFICATION_CODE_DAILY_LIMIT = 'Verification daily limit reached',

    CITY_NOT_FOUND = 'City not found',
    USER_NOT_FOUND = 'User not found',

    DUPLICATE_USER = 'User already exists with this email',

    INTERNAL_SERVER = 'Internal server error',

}

export enum ErrorsMessages {
    VERIFICATION_CODE_EXPIRED = 'Please try resend code option'
}