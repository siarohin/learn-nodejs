import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { getName } from '../utils';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_DURATION, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_DURATION } from '../config';
import { AuthError, AuthErrorType } from './models';

export class AuthService {
    _tokens = {};

    constructor(repository) {
        if (!AuthService.instance) {
            AuthService.instance = this;
            this.repository = repository;
        }
        return AuthService.instance;
    }

    get tokens() {
        return this._tokens;
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
                    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
                    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });
                    const tokens = { accessToken, refreshToken };
                    this._tokens[refreshToken] = tokens;
                    return tokens;
                }
            });
    }

    refresh(token) {
        return Promise.resolve().then(() => {
            if (token && token in this.tokens) {
                const payload = { success: true };
                const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
                this.tokens[token].accessToken = accessToken;
                return { accessToken };
            }
            throw new AuthError(AuthErrorType.Forbidden, getName(this.refresh), arguments);
        });
    }

    verify(token) {
        return Promise.resolve().then(() => {
            if (_.isNil(token)) {
                throw new AuthError(AuthErrorType.Unauthorized, getName(this.verify), arguments);
            } else {
                jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
                    if (err) {
                        throw new AuthError(AuthErrorType.Forbidden, getName(this.verify), arguments);
                    }
                });
            }
        });
    }

    delete(token) {
        return Promise.resolve().then(() => {
            if (token && token in this.tokens) {
                delete this._tokens[token];
            } else {
                throw new AuthError(AuthErrorType.NotFound, getName(this.delete), arguments);
            }
        });
    }
}
