import { getKeyValueString } from '../utils';
import { AuthService, AuthError } from '../services';
import { logger } from '../logger';
import { UsersRepository } from '../data-access';
import { Group, Users } from '../models';

const authService = new AuthService(new UsersRepository(Users, Group));

export function authenticate(req, res, next) {
    const { login, password } = req.body;
    return authService.authenticate({ login, password })
        .then(token => res.send(token))
        .catch((error) => {
            if (error instanceof AuthError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(401).send({ success: false, message: error.message });
            }
            return next(error);
        });
}
