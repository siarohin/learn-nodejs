import express from 'express';
import { validator, userSchema } from './validator';
import { ROUTER_PATH } from './config';
import { createUser, deleteUser, findUser, getUser, getUsers, updateUser } from './controllers';

const router = express.Router();

router.route(ROUTER_PATH.user)
    .all(findUser)
    .get(getUser)
    .put(validator.body(userSchema), updateUser)
    .delete(deleteUser);

router.route(ROUTER_PATH.users)
    .get(getUsers)
    .post(validator.body(userSchema), createUser);

export default router;
