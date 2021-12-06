import { UsersError, usersServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

export function getUsers(req, res, next) {
    return usersServiceInstance.getAll(req.query)
        .then((users) => res.send(users))
        .catch(error => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
