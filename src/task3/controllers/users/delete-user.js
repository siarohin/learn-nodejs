import { UsersError, usersServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString, getUser } from '../../utils';

export function deleteUser(req, res, next) {
    const newUser = { ...req.user, ...getUser(req.body, { isDeleted: true }) };
    return usersServiceInstance.delete(newUser)
        .then((user) => res.send(user))
        .catch(error => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
