import Joi from 'joi';
import { Gender, Country, Search } from './enums';
import { PAST_DATE_18_YEARS_MILLIS } from './constants';

const verifyEmailSchema = Joi.object({
    email: Joi.string().email().required(),
    verificationCode: Joi.number().min(100000).max(999999).required()
});

const resendCodeSchema = Joi.object({
    email: Joi.string().email().required() 
});

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(100).required(),
    city: Joi.string().required(),
    country: Joi.string().insensitive().valid(...Object.values(Country)).required(),
    gender: Joi.string().insensitive().valid(...Object.values(Gender)).required(),
    searchFor: Joi.string().insensitive().valid(...Object.values(Search)).required(),
    dob: Joi.date().required().less(PAST_DATE_18_YEARS_MILLIS),
    searchIn: Joi.string().required()
});

export { verifyEmailSchema, createUserSchema, resendCodeSchema };