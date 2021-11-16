import { GroupService } from '../../services';
import { GroupRepositoryService } from '../../data-access';
import { GroupModel } from '../../models';

const groupService = new GroupService(new GroupRepositoryService(GroupModel));

export function getGroups(req, res) {
    return groupService.getAll()
        .then((groups) => res.send(groups))
        .catch(error => res.status(500).send(error.message));
}