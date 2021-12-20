import { nanoid } from 'nanoid';
import { UsersError, usersServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString, getUser } from '../../utils';

export function createUser(req, res, next) {
    const newUser = { ...getUser(req.body), id: nanoid() };
    return usersServiceInstance.create(newUser)
        .then((user) => res.send(user))
        .catch((error) => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
