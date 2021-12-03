import { UsersService, UsersError } from '../../services';
import { UsersRepository } from '../../data-access';
import { Users, Group } from '../../models';
import { getKeyValueString, getUser } from '../../utils';
import { logger } from '../../logger';

const usersService = new UsersService(new UsersRepository(Users, Group));

export function updateUser(req, res, next) {
    const newUser = { ...req.user, ...getUser(req.body) };
    return usersService.update(newUser)
        .then((user) => res.send(user))
        .catch(error => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
