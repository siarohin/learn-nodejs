import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const PERMISSIONS = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
const PASSWORD_SCHEMA = Joi.string().regex(/[A-Za-z]+/).regex(/\d+/).required();
const LOGIN_SCHEMA = Joi.string().required();

const validator = createValidator({
    passError: true
});

const userSchema = Joi.object({
    login: LOGIN_SCHEMA,
    password: PASSWORD_SCHEMA,
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

const authenticateSchema = Joi.object({
    login: LOGIN_SCHEMA,
    password: PASSWORD_SCHEMA
});

export { validator, userSchema, groupSchema, addUsersToGroupSchema, authenticateSchema };
