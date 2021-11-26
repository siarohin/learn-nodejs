import { GroupService } from '../../services';
import { GroupRepositoryService } from '../../data-access';
import { Group, Users } from '../../models';

const groupService = new GroupService(new GroupRepositoryService(Group, Users));

export function deleteGroup(req, res) {
    return groupService.delete(req.group)
        .then((group) => res.send(group))
        .catch(error => res.status(500).send(error.message));
}
