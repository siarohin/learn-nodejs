import { UsersError, usersServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

export function findUser(req, res, next) {
    const { id } = req.params;
    return usersServiceInstance.get(id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((error) => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(404).send(error.message);
            }
            return next(error);
        });
}
