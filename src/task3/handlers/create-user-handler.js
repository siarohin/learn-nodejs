import { nanoid } from 'nanoid';
import { db } from '../db';
import { getUser } from '../utils';

export function createUserHandler(req, res) {
    const user = { ...getUser(req.body), id: nanoid() };
    db.users.push(user);
    res.send(user);
}
