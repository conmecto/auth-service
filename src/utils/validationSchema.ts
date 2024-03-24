import Joi from 'joi';
import { Gender, Country, Search } from './enums';
import { PAST_DATE_18_YEARS_MILLIS } from './constants';

const verifyOtpSchema = Joi.object({
    // extension: Joi.string().min(2).required(),
    // number: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    code: Joi.number().min(100000).max(999999).required(),
    token: Joi.string().length(10).required(),
    deviceToken: Joi.string().optional()
});

const resendCodeSchema = Joi.object({
    // extension: Joi.string().min(2).required(),
    // number: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    //number: Joi.string().min(6).regex(/^[0-9]*$/).required(),
    name: Joi.string().min(3).max(100).required(),
    city: Joi.string().required(),
    country: Joi.string().valid(...Object.values(Country)).required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    searchFor: Joi.string().valid(...Object.values(Search)).required(),
    dob: Joi.date().required().less(PAST_DATE_18_YEARS_MILLIS),
    searchIn: Joi.string().required()
});

const getCitiesSchema = Joi.object({
    country: Joi.string().valid(...Object.values(Country)).required(),
});


const logoutSchema = Joi.object({
    userId: Joi.number().required(),
});

export { verifyOtpSchema, createUserSchema, resendCodeSchema, getCitiesSchema, logoutSchema };