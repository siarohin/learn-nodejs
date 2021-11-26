import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const PERMISSIONS = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const validator = createValidator({
    passError: true
});

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/[A-Za-z]+/).regex(/\d+/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...PERMISSIONS))
});

const addUsersToGroupSchema = Joi.object({
    userIds: Joi.array().items(Joi.string())
});

export { validator, userSchema, groupSchema, addUsersToGroupSchema };
