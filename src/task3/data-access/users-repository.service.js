import { Op } from 'sequelize';

export class UsersRepositoryService {
    constructor(model) {
        this.model = model;
    }

    get(id) {
        return this.model.findByPk(id);
    }

    getAll(query) {
        return query
            ? this.model.findAll({
                where: {
                    login: { [Op.like]: `%${  query.toLowerCase()  }%` }
                }
            })
            : this.model.findAll();
    }

    create(user) {
        return this.model.create(user);
    }

    update(user) {
        return this.model.update(user, { where: { id: user.id } });
    }
}
