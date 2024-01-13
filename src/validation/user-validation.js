import Joi from "joi";

export const registerUserValidation = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(4).max(100).required(),
});

export const loginUserValidation = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(4).max(100).required(),
});

export const getUserValidation = Joi.number().positive();

export const updateUserValidation = Joi.object({
    username: Joi.string().min(3).max(100).optional(),
    password: Joi.string().min(4).max(100).optional(),
    name: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().max(100).optional(),
});
