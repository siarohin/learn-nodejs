import { UsersService, UsersError } from '../../services';
import { UsersRepository } from '../../data-access';
import { Users, Group } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

const usersService = new UsersService(new UsersRepository(Users, Group));

export function getUsers(req, res, next) {
    return usersService.getAll(req.query)
        .then((users) => res.send(users))
        .catch(error => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
