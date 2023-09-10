import Joi from "joi";

export const registerUserValidation = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(4).max(100).required(),
});
