import { UsersError, usersServiceInstance } from '../../services';
import { getKeyValueString, getUser } from '../../utils';
import { logger } from '../../logger';

export function updateUser(req, res, next) {
    const newUser = { ...req.user, ...getUser(req.body) };
    return usersServiceInstance.update(newUser)
        .then((user) => res.send(user))
        .catch(error => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
