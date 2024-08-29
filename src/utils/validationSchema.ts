import Joi from 'joi';
import { Gender, Country, Search, LocationAccess } from './enums';
import { PAST_DATE_18_YEARS_MILLIS } from './constants';

const verifyOtpSchema = Joi.object({
    // extension: Joi.string().min(2).required(),
    // number: Joi.string().min(6).required(),
    // email: Joi.string().email().required(),
    // code: Joi.number().min(100000).max(999999).required(),
    // token: Joi.string().length(10).required(),
    //userId: Joi.number().required(),
    deviceToken: Joi.string().optional(),
    appleAuthToken: Joi.string().required(),
    appleAuthUserId: Joi.string().required()
});

const resendCodeSchema = Joi.object({
    // extension: Joi.string().min(2).required(),
    // number: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

const checkUserSchema = Joi.object({
    appleAuthUserId: Joi.string().required()
});

const createUserSchema = Joi.object({
    email: Joi.string().email().optional(),
    //number: Joi.string().min(6).regex(/^[0-9]*$/).required(),
    name: Joi.string().min(3).max(100).optional(),
    country: Joi.string().valid(...Object.values(Country)).required(),
    appleAuthToken: Joi.string().required(),
    appleAuthUserId: Joi.string().required(),
    deviceToken: Joi.string().optional(),
    termsAccepted: Joi.boolean().required().equal(true)
});

const getCitiesSchema = Joi.object({
    country: Joi.string().valid(...Object.values(Country)).required(),
});

const logoutSchema = Joi.object({
    userId: Joi.number().required(),
});

export { verifyOtpSchema, createUserSchema, resendCodeSchema, getCitiesSchema, logoutSchema, checkUserSchema };