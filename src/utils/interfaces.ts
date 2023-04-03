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

interface ILoginUserResponse extends IGenericResponse {
    data: [IToken]
}

//Token
interface IToken {
    access: string,
    refresh: string
}


//Verification
interface IVerificationObject {
    count: number,
    issuedAt: Date
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, ICreateUserObject, 
    ICreateUserResponse, ILoginUserObject, ILoginUserResponse, IToken, IVerificationObject
};