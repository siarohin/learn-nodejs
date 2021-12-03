import { UsersService, UsersError } from '../../services';
import { UsersRepository } from '../../data-access';
import { Users, Group } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

const usersService = new UsersService(new UsersRepository(Users, Group));

export function findUser(req, res, next) {
    const { id } = req.params;
    return usersService.get(id)
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
