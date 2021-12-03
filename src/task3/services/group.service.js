import _ from 'lodash';
import { SEQUELIZE } from '../config';
import { getName } from '../utils';
import { GroupError } from './models';
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
                    throw new GroupError(`Can not find group with id ${id}`, getName(this.get), arguments);
                } else {
                    return data.dataValues;
                }
            });
    }

    getAll() {
        return this.repository.getAll()
            .then((data) => _.map(data, 'dataValues'))
            .catch(() => {
                throw new GroupError('Can not get groups', getName(this.get), arguments);
            });
    }

    create(group) {
        return this.repository.create(group)
            .then((data) => data.dataValues)
            .catch(() => {
                throw new GroupError('Can not create group', getName(this.get), arguments);
            });
    }

    update(group) {
        return this.repository.update(group)
            .then(() => group) // returns updated group instead of id from response
            .catch(() => {
                throw new GroupError('Can not update group', getName(this.get), arguments);
            });
    }

    delete(group) {
        return this.repository.delete(group)
            .then(() => group) // returns updated group instead of empty from response
            .catch(() => {
                throw new GroupError('Can not delete group', getName(this.get), arguments);
            });
    }

    addUsersToGroup(groupId, userIds) {
        return SEQUELIZE().transaction((t) => this.repository.get(groupId, { transaction: t })
            .then((group) => group.addUsers(userIds, { transaction: t })))
            .then(() => this.get(groupId))
            .catch(() => {
                throw new GroupError('Transaction failed. Users were not added', getName(this.get), arguments);
            });
    }
}
