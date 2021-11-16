import _ from 'lodash';

export class UsersService {
    constructor(repository) {
        this.repository = repository;
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

    update(user) {
        return this.repository.update(user)
            .then(() => user) // returns updated user instead of id from response
            .catch(() => {
                throw new Error('Can not update user');
            });
    }

    getLimited(users, limit) {
        return limit ? _.take(users, limit) : users;
    }
}
