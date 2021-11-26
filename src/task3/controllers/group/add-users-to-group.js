import { GroupService } from '../../services';
import { GroupRepositoryService } from '../../data-access';
import { Group, Users } from '../../models';

const groupService = new GroupService(new GroupRepositoryService(Group, Users));

export function addUsersToGroup(req, res) {
    const { id } = req.params;
    const { userIds } = req.body;
    return groupService.addUsersToGroup(id, userIds)
        .then((group) => res.send(group))
        .catch(error => res.status(500).send(error.message));
}
