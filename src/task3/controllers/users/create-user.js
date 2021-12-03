import { nanoid } from 'nanoid';
import { UsersService, UsersError } from '../../services';
import { UsersRepository } from '../../data-access';
import { Users, Group } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString, getUser } from '../../utils';

const usersService = new UsersService(new UsersRepository(Users, Group));

export function createUser(req, res, next) {
    const newUser = { ...getUser(req.body), id: nanoid() };
    return usersService.create(newUser)
        .then((user) => res.send(user))
        .catch((error) => {
            if (error instanceof UsersError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
