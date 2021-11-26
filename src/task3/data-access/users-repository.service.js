import { Op } from 'sequelize';

export class UsersRepositoryService {
    constructor(model, association) {
        if (!UsersRepositoryService.instance) {
            UsersRepositoryService.instance = this;
            this.model = model;
            this.association = association;
        }
        return UsersRepositoryService.instance;
    }

    get(id) {
        return this.model.findByPk(id, { include: [this.association] });
    }

    getAll(query) {
        return query
            ? this.model.findAll({
                where: {
                    login: { [Op.like]: `%${  query.toLowerCase()  }%` }
                },
                include: [this.association]
            })
            : this.model.findAll({
                include: [this.association]
            });
    }

    create(user) {
        return this.model.create(user, { include: this.association });
    }

    update(user, transaction = {}) {
        return this.model.update(user, { where: { id: user.id }, ...transaction });
    }
}
