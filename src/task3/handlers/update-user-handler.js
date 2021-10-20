import { db } from '../db';
import { getUser, updateUsersDB } from '../utils';

export function updateUserHandler(req, res) {
    const { user: currUser, index } = req.user;
    if (!currUser) {
        return res.status(404).send('Can not find user with such id.');
    }
    const newUser = { ...currUser, ...getUser(req.body) };
    db.users = updateUsersDB(db.users, newUser, index);
    res.send(newUser);
}