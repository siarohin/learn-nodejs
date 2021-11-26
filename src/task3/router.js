import express from 'express';
import { validator, userSchema, groupSchema, addUsersToGroupSchema } from './validator';
import { ROUTER_PATH } from './config';
import {
    addUsersToGroup,
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
    updateGroup
} from './controllers';

const router = express.Router();

router.route(ROUTER_PATH.user)
    .all(findUser)
    .get(getUser)
    .put(validator.body(userSchema), updateUser)
    .delete(deleteUser);

router.route(ROUTER_PATH.users)
    .get(getUsers)
    .post(validator.body(userSchema), createUser);

router.route(ROUTER_PATH.group)
    .all(findGroup)
    .get(getGroup)
    .put(validator.body(groupSchema), updateGroup)
    .patch(validator.body(addUsersToGroupSchema), addUsersToGroup)
    .delete(deleteGroup);

router.route(ROUTER_PATH.groups)
    .get(getGroups)
    .post(validator.body(groupSchema), createGroup);

export default router;
