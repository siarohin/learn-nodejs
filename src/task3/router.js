import express from 'express';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { db } from './db';
import { getUser, updateUsersDB } from './utils';

const router = express.Router();

router.route('/users/:id')
    .all((req, res, next) => {
        const { id } = req.params;
        const user = _.find(db.users, { id });
        const index = _.indexOf(db.users, user);
        req.user = { user, index };
        next();
    })
    // Get user
    .get((req, res) => {
        const { user } = req.user;
        if (!user) {
            return res.status(404).send('Can not find user with such id.');
        }
        res.send(user);
    })
    // Update user
    .put((req, res) => {
        const { user: currUser, index } = req.user;
        if (!currUser) {
            return res.status(404).send('Can not find user with such id.');
        }
        const newUser = { ...currUser, ...getUser(req.body) };
        db.users = updateUsersDB(db.users, newUser, index);
        res.send(newUser);
    })
    // Soft delete user (update `isDelete`)
    .delete((req, res) => {
        const { user: currUser, index } = req.user;
        if (!currUser) {
            return res.status(404).send('Can not find user with such id.');
        }
        const newUser = { ...currUser, ...getUser(req.body, { isDeleted: true }) };
        db.users = updateUsersDB(db.users, newUser, index);
        res.send(newUser);
    });

router.route('/users')
    // Get auto-suggest list from limit users
    .get((req, res) => {
        const { loginSubstring, limit } = req.query;
        const users = _(db.users)
            .filter((user) => loginSubstring ? user.login.toLowerCase().includes(loginSubstring.toLowerCase()) : user)
            .sortBy(['login'])
            .take(_.isUndefined(limit) ? db.users.length : limit);
        res.send(users);
    })
    // Add new user
    .post((req, res) => {
        const user = { ...getUser(req.body), id: nanoid() };
        db.users.push(user);
        res.send(user);
    });

export default router;
