import _ from 'lodash';
import { SEQUELIZE } from '../config';
import { getName } from '../utils';
import { UsersError } from './models';

export class UsersService {
    constructor(repository) {
        if (!UsersService.instance) {
            UsersService.instance = this;
            this.repository = repository;
        }
        return UsersService.instance;
    }

    get(id) {
        return this.repository.get(id)
            .then((data) => {
                if (!data) {
                    throw new UsersError(`Can not find user with id ${id}`, getName(this.get), arguments);
                } else {
                    return data.dataValues;
                }
            });
    }

    getAll({ loginSubstring, limit }) {
        return this.repository.getAll(loginSubstring)
            .then((data) => _.map(data, 'dataValues'))
            .then((users) => _.sortBy(users, ['login']))
            .then((users) => this.getLimited(users, limit))
            .catch(() => {
                throw new UsersError('Can not get users', getName(this.getAll), arguments);
            });
    }

    create(user) {
        return this.repository.create(user)
            .then((data) => data.dataValues)
            .catch(() => {
                throw new UsersError('Can not create user', getName(this.create), arguments);
            });
    }

    update(user, transaction) {
        return this.repository.update(user, transaction)
            .then(() => user) // returns updated user instead of id from response
            .catch(() => {
                throw new UsersError('Can not update user', getName(this.update), arguments);
            });
    }

    // We need manualy delete users from UserGroups table while user has 'soft' delete behavior through DB
    delete(user) {
        return SEQUELIZE().transaction((t) => {
            return this.repository.get(user.id, { transaction: t })
                .then((dbUser) => dbUser.removeGroups(dbUser.Groups, { transaction: t }))
                .then(() => this.update({ ...user, Groups: [] }, { transaction: t })) // Note: map on empty Group to avoid calling get for fresh data
                .catch(() => {
                    throw new UsersError('Transaction failed. Can not delete user', getName(this.delete), arguments);
                });
        });
    }

    getLimited(users, limit) {
        return limit ? _.take(users, limit) : users;
    }
}
