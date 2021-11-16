import { GroupService } from '../../services';
import { GroupRepositoryService } from '../../data-access';
import { GroupModel } from '../../models';

const groupService = new GroupService(new GroupRepositoryService(GroupModel));

export function findGroup(req, res, next) {
    const { id } = req.params;
    return groupService.get(id)
        .then((group) => {
            req.group = group;
            next();
        })
        .catch((error) => res.status(404).send(error.message));
}
