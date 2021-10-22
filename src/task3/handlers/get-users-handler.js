import _ from 'lodash';
import { db } from '../db';

export function getUsersHandler(req, res) {
    const { loginSubstring, limit } = req.query;
    const users = _(db.users)
        .filter((user) => loginSubstring ? user.login.toLowerCase().includes(loginSubstring.toLowerCase()) : user)
        .sortBy(['login'])
        .take(_.isUndefined(limit) ? db.users.length : limit);
    res.send(users);
}
