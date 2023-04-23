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
    name: string,
    dob: Date,
    country: string,
    searchFor: string,
    searchIn: string,
    gender: string
}

interface ICreateUserResponse extends IGenericResponse {
    data: [{
        email: string
    }]
}

//Login user
interface ILoginUserObject {
    email: string,
    verificationCode: number
}

interface ITokenPayload {
    email: string,
    userId: number
}

interface ILoginUserResponse extends IGenericResponse {
    data: [{ access: string, refresh: string }]
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
    email: string,
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
    exp: Date;
}

//Verification
interface IVerificationObject {
    count: number,
    issuedAt: Date
}

//Authentication
interface IAuthVerifyResponse {
    userId: number,
    email: string
}

interface IAuthenticationResponse extends IGenericResponse {
    data: IAuthVerifyResponse[]
}

//Get User
interface IUserObj {
    id: number,
    email: string,
    verified: boolean
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, ICreateUserObject, IAuthenticationResponse, IAuthVerifyResponse,
    ICreateUserResponse, ILoginUserObject, ILoginUserResponse, IToken, IVerificationObject, ITokenPayload, ITokenSignOptions,
    IUserObj, ITokenVerifyResponse, ITokenIdentityObj
};