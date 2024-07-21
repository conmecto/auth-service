import { Request } from 'express';

// Generic
interface IGeneric {
    [key: string]: any
}

interface IGenericResponse {
    message: string
}

// Node request object  
interface ICustomerRequest extends Request {
    user?: Record<string, any>
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
    email?: string,
    // extension: string,
    // number: string,
    name: string,
    dob: string,
    city: string,
    country: string,
    searchFor: string,
    gender: string,
    appleAuthToken: string,
    verified?: boolean,
    deviceToken?: string,
    appleAuthUserId: string,
    termsAccepted: boolean
}

interface IUserCreatedMessageObj extends ICreateUserObject {
    id: number
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
    //email: string,
    // extension: string,
    // number: string,
    // code: number,
    // token: string,
    //userId: number,
    appleAuthToken: string,
    deviceToken?: string,
    appleAuthUserId: string
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
    userId: number,
    verified: boolean,
    email?: string,
    deviceToken?: string,
    appleAuthUserId: string
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
    id?: number,
    email?: string,
    userId: number,
    otpResendAttempts: number,
    otpValidationAttempts: number,
    verified: boolean,
    name: string,
    dob: Date,
    city: string,
    country: string,
    searchFor: string,
    gender: string,
    deviceToken?: string,
    appleAuthUserId?: string
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

interface IAppleAuthTokenPayload {
    iss: string,
    aud: string,
    exp: number,
    iat: number,
    sub: string,
    nonce: string,
    c_hash?: string,
    email?: string,
    email_verified?: string
    auth_time?: number
}

interface IGetUserByKeyResponse {
    id: number,
    appleAuthUserId: string,
    deviceToken?: string
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, ICreateUserObject, IAuthenticationResponse, IAuthVerifyResponse,
    ICreateUserResponse, ILoginUserObject, ILoginUserResponse, IToken, ITokenPayload, ITokenSignOptions,
    IUserObj, ITokenVerifyResponse, ITokenIdentityObj, IAddUserResponse, ICacheUserValue, ISendOtpObj, 
    IVerifyOtpPayload, IGetUserByNumberRes, ISendEmailObj, IGetUserByEmailRes, ICreateUserNotificationEndPoint,
    IUpdateUserNotificationEndPoint, ISendPushNotification, IAppleAuthTokenPayload, ICustomerRequest,
    IUserCreatedMessageObj, IGetUserByKeyResponse
};