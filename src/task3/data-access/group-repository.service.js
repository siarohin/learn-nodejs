export class GroupRepositoryService {
    constructor(model) {
        this.model = model;
    }

    get(id) {
        return this.model.findByPk(id);
    }

    getAll() {
        return this.model.findAll();
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
