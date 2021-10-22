import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({
    passError: true
});

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/[A-Za-z]+/).regex(/\d+/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export { validator, userSchema };
