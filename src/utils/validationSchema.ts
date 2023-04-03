import { object, string, number, date } from 'joi';
import { Gender, Country, Search } from './enums';
import { PAST_DATE_18_YEARS } from './constants';

const verifyEmailSchema = object({
    email: string().email().required(),
    verificationCode: number().min(100000).max(999999).required()
});

const resendCodeSchema = object({
    email: string().email().required() 
});

const createUserSchema = object({
    email: string().email().required(),
    name: string().min(3).max(100).required(),
    country: string().insensitive().valid(...Object.values(Country)).required(),
    gender: string().insensitive().valid(...Object.values(Gender)).required(),
    searchFor: string().insensitive().valid(...Object.values(Search)).required(),
    dob: date().min(PAST_DATE_18_YEARS).required(),
    searchIn: string().required()
});

export { verifyEmailSchema, createUserSchema, resendCodeSchema };