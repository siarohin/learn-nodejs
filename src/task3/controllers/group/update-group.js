import { GroupService } from '../../services';
import { GroupRepositoryService } from '../../data-access';
import { GroupModel } from '../../models';
import { getGroup } from '../../utils';

const groupService = new GroupService(new GroupRepositoryService(GroupModel));

export function updateGroup(req, res) {
    const newGroup = { ...req.group, ...getGroup(req.body) };
    return groupService.update(newGroup)
        .then((group) => res.send(group))
        .catch(error => res.status(500).send(error.message));
}
