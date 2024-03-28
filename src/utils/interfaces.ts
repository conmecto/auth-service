// Generic
interface IGeneric {
    [key: string]: any
}

interface IGenericResponse {
    message: string
}

// Node reqeust object  
interface IRequestObject extends IGeneric {
    body: IGeneric,
    query: IGeneric,
    params: IGeneric,
    method: string,
    path: string,
    headers: IGeneric
}

// City 
interface ICityObject {
    id?: number,
    city: string,
    country?: string
}

// Create user 
interface ICreateUserObject {
    email: string,
    // extension: string,
    // number: string,
    name: string,
    dob: string,
    city: string,
    country: string,
    searchFor: string,
    searchIn: string,
    gender: string
}

interface ICreateUserResponse extends IGenericResponse {
    data: [{
        userId: number,
        token: string
    }]
}

interface IAddUserResponse {
    userId: number
}

//Login user
interface ILoginUserObject {
    email: string,
    // extension: string,
    // number: string,
    code: number,
    token: string
}

interface ITokenPayload {
    userId: number
}

interface ILoginUserResponse extends IGenericResponse {
    data: [{ userId: number, access: string, refresh: string }]
}

//Token
interface IToken {
    access: string,
    refresh: string, 
    jti: string, 
    exp: number
}

interface ITokenSignOptions {
    issuer: string,
    expiresIn: number,
    algorithm: string,
    jwtid?: string
}

interface ITokenVerifyResponse {
    userId: number,
    extension: string,
    number: string,
    jti: string;
    exp: number;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    nbf?: number;
    iat?: number;
}

interface ITokenIdentityObj {
    userId: number,
    jti: string;
    expiredAt: string;
}

//Authentication
interface IAuthVerifyResponse {
    userId: number
}

interface IAuthenticationResponse extends IGenericResponse {
    data: IAuthVerifyResponse[]
}

//Get User
interface IUserObj {
    id: number,
    verified: boolean
}

//Cache
interface ICacheUserValue { 
    id: number,
    verified: boolean
}

interface ISendOtpObj {
    userId: number,
    extension: string,
    number: string,
    otp: number
}

interface ISendEmailObj {
    userId: number,
    email: string,
    otp: number
}


interface IVerifyOtpPayload {
    userId: number,
    code: number,
    token: string,
    verifyUser: boolean
}

interface IGetUserByNumberRes {
    userId: number,
    otpResendAttempts: number,
    otpValidationAttempts: number,
    verified: boolean,
    name: string,
    dob: Date,
    city: string,
    country: string,
    searchFor: string,
    searchIn: string,
    gender: string,
    deviceToken?: string
}

interface IGetUserByEmailRes {
    email: string,
    userId: number,
    otpResendAttempts: number,
    otpValidationAttempts: number,
    verified: boolean,
    name: string,
    dob: Date,
    city: string,
    country: string,
    searchFor: string,
    searchIn: string,
    gender: string
}

interface ICreateUserNotificationEndPoint {
    userId: number,
    deviceToken: string,
}

interface IUpdateUserNotificationEndPoint {
    deviceToken: string,
    deviceEndpoint?: string,
}

interface ISendPushNotification {
    userId: number,
    deviceEndpoint: string,
    message: string
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, ICreateUserObject, IAuthenticationResponse, IAuthVerifyResponse,
    ICreateUserResponse, ILoginUserObject, ILoginUserResponse, IToken, ITokenPayload, ITokenSignOptions,
    IUserObj, ITokenVerifyResponse, ITokenIdentityObj, IAddUserResponse, ICacheUserValue, ISendOtpObj, 
    IVerifyOtpPayload, IGetUserByNumberRes, ISendEmailObj, IGetUserByEmailRes, ICreateUserNotificationEndPoint,
    IUpdateUserNotificationEndPoint, ISendPushNotification
};