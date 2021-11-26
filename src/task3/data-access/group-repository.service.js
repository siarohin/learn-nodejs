export class GroupRepositoryService {
    constructor(model, association) {
        if (!GroupRepositoryService.instance) {
            GroupRepositoryService.instance = this;
            this.model = model;
            this.association = association;
        }
        return GroupRepositoryService.instance;
    }

    get(id, transaction) {
        return transaction ? this.model.findByPk(id, transaction) : this.model.findByPk(id, { include: [this.association] });
    }

    getAll() {
        return this.model.findAll({
            include: [this.association]
        });
    }

    create(group) {
        return this.model.create(group);
    }

    update(group) {
        return this.model.update(group, { where: { id: group.id } });
    }

    delete(group) {
        return this.model.destroy({ where: { id: group.id } });
    }
}
