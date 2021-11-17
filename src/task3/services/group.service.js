import _ from 'lodash';
import { SEQUELIZE } from '../config';

export class GroupService {
    constructor(repository) {
        if (!GroupService.instance) {
            GroupService.instance = this;
            this.repository = repository;
        }
        return GroupService.instance;
    }

    get(id) {
        return this.repository.get(id)
            .then((data) => {
                if (!data) {
                    throw new Error(`Can not find group with id ${id}`);
                } else {
                    return data.dataValues;
                }
            });
    }

    getAll() {
        return this.repository.getAll()
            .then((data) => _.map(data, 'dataValues'))
            .catch(() => {
                throw new Error('Can not get groups');
            });
    }

    create(group) {
        return this.repository.create(group)
            .then((data) => data.dataValues)
            .catch((err) => {
                console.log(err);
                throw new Error('Can not create group');
            });
    }

    update(group) {
        return this.repository.update(group)
            .then(() => group) // returns updated group instead of id from response
            .catch(() => {
                throw new Error('Can not update group');
            });
    }

    delete(group) {
        return this.repository.delete(group)
            .then(() => group) // returns updated group instead of empty from response
            .catch(() => {
                throw new Error('Can not delete group');
            });
    }

    addUsersToGroup(groupId, userIds) {
        return SEQUELIZE().transaction((t) => this.repository.get(groupId, { transaction: t })
            .then((group) => group.addUsers(userIds, { transaction: t })))
            .then(() => this.get(groupId))
            .catch((error) => {
                console.error('ERROR', error);
                throw new Error('Transaction failed. Users were not added');
            });
    }
}
