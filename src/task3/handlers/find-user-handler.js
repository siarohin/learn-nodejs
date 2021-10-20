import _ from 'lodash';
import { db } from '../db';

export function findUserHandler(req, res, next) {
    const { id } = req.params;
    const user = _.find(db.users, { id });
    const index = _.indexOf(db.users, user);
    req.user = { user, index };
    next();
}
