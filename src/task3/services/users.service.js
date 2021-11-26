import _ from 'lodash';
import { SEQUELIZE } from '../config';

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
                    throw new Error(`Can not find user with id ${id}`);
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
                throw new Error('Can not get users');
            });
    }

    create(user) {
        return this.repository.create(user)
            .then((data) => data.dataValues)
            .catch(() => {
                throw new Error('Can not create user');
            });
    }

    update(user, transaction) {
        return this.repository.update(user, transaction)
            .then(() => user) // returns updated user instead of id from response
            .catch(() => {
                throw new Error('Can not update user');
            });
    }

    // We need manualy delete users from UserGroups table while user has 'soft' delete behavior through DB
    delete(user) {
        return SEQUELIZE().transaction((t) => {
            return this.repository.get(user.id, { transaction: t })
                .then((dbUser) => dbUser.removeGroups(dbUser.Groups, { transaction: t }))
                .then(() => this.update({ ...user, Groups: [] }, { transaction: t })) // Note: map on empty Group to avoid calling get for fresh data
                .catch(() => {
                    throw new Error('Transaction failed. Can not delete user');
                });
        });
    }

    getLimited(users, limit) {
        return limit ? _.take(users, limit) : users;
    }
}
