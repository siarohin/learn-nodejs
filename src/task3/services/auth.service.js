import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { getName } from '../utils';
import { TOKEN_SECRET } from '../config';
import { AuthError, AuthErrorType } from './models';

export class AuthService {
    constructor(repository) {
        if (!AuthService.instance) {
            AuthService.instance = this;
            this.repository = repository;
        }
        return AuthService.instance;
    }

    authenticate(credentials) {
        return this.repository.getAll(credentials.login)
            .then((data) => _.map(data, 'dataValues'))
            .then(users => {
                const existingUser = _.find(users, { login: credentials.login, password: credentials.password });
                if (!existingUser || existingUser.isDeleted) {
                    throw new AuthError('Username or password is invalid. Authentication failed.', getName(this.authenticate), arguments);
                } else {
                    const payload = { success: true, id: existingUser.id };
                    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1h' });
                }
            });
    }

    verify(token) {
        console.log(token);
        return Promise.resolve().then(() => {
            if (_.isNil(token)) {
                throw new AuthError(AuthErrorType.Unauthorized, getName(this.verify), arguments);
            } else {
                jwt.verify(token, TOKEN_SECRET, (err) => {
                    if (err) {
                        throw new AuthError(AuthErrorType.Forbidden, getName(this.verify), arguments);
                    }
                });
            }
        });
    }
}
