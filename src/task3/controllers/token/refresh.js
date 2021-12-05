import { getKeyValueString } from '../../utils';
import { AuthService, AuthError } from '../../services';
import { logger } from '../../logger';
import { UsersRepository } from '../../data-access';
import { Group, Users } from '../../models';

const authService = new AuthService(new UsersRepository(Users, Group));

export function refresh(req, res, next) {
    const { refreshToken } = req.body;
    return authService.refresh(refreshToken)
        .then(token => res.send(token))
        .catch((error) => {
            if (error instanceof AuthError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(403).send();
            }
            return next(error);
        });
}
