import cors from 'cors';
import express from 'express';
import { validator, userSchema, groupSchema, addUsersToGroupSchema, authenticateSchema } from './validator';
import { CORS_OPTIONS, ROUTER_PATH } from './config';
import {
    addUsersToGroup,
    authenticate,
    createUser,
    createGroup,
    deleteUser,
    deleteGroup,
    findUser,
    findGroup,
    getUser,
    getGroup,
    getUsers,
    getGroups,
    updateUser,
    updateGroup,
    verifyAccess
} from './controllers';

const router = express.Router();
router.use(cors(CORS_OPTIONS));

router.route(ROUTER_PATH.user)
    .all(verifyAccess, findUser)
    .get(getUser)
    .put(validator.body(userSchema), updateUser)
    .delete(deleteUser);

router.route(ROUTER_PATH.users)
    .get(verifyAccess, getUsers)
    .post(verifyAccess, validator.body(userSchema), createUser);

router.route(ROUTER_PATH.group)
    .all(verifyAccess, findGroup)
    .get(getGroup)
    .put(validator.body(groupSchema), updateGroup)
    .patch(validator.body(addUsersToGroupSchema), addUsersToGroup)
    .delete(deleteGroup);

router.route(ROUTER_PATH.groups)
    .get(verifyAccess, getGroups)
    .post(verifyAccess, validator.body(groupSchema), createGroup);

router.route(ROUTER_PATH.authenticate)
    .post(validator.body(authenticateSchema), authenticate);

export default router;
