import _ from 'lodash';

export class GroupService {
    constructor(repository) {
        this.repository = repository;
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
            .catch(() => {
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
}
