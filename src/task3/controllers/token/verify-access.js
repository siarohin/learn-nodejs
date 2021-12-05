import { AuthError, AuthErrorType, AuthService } from '../../services';
import { UsersRepository } from '../../data-access';
import { Group, Users } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

const authService = new AuthService(new UsersRepository(Users, Group));

export function verifyAccess(req, res, next) {
    const token = req.headers['x-access-token'];
    return authService.verify(token)
        .then(() => next())
        .catch((error) => {
            if (error instanceof AuthError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                let statusCode;
                switch (error.message) {
                    case AuthErrorType.Unauthorized:
                        statusCode = 401;
                        break;
                    case AuthErrorType.Forbidden:
                        statusCode = 403;
                        break;
                    default:
                        statusCode = 406;
                        break;
                }
                return res.status(statusCode).send();
            }
        });
}
