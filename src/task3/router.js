import express from 'express';
import { validator, userSchema } from './validator';
import { ROUTER_PATH } from './const';
import {
    createUserHandler,
    deleteUserHandler,
    findUserHandler,
    getUserHandler,
    getUsersHandler,
    updateUserHandler
} from './handlers';

const router = express.Router();

router.route(ROUTER_PATH.user)
    .all(findUserHandler)
    .get(getUserHandler)
    .put(validator.body(userSchema), updateUserHandler)
    .delete(deleteUserHandler);

router.route(ROUTER_PATH.users)
    .get(getUsersHandler)
    .post(validator.body(userSchema), createUserHandler);

export default router;
