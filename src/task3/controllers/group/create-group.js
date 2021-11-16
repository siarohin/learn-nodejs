import { nanoid } from 'nanoid';
import { GroupService } from '../../services';
import { GroupRepositoryService } from '../../data-access';
import { GroupModel } from '../../models';
import { getGroup } from '../../utils';

const groupService = new GroupService(new GroupRepositoryService(GroupModel));

export function createGroup(req, res) {
    const newGroup = { ...getGroup(req.body), id: nanoid() };
    return groupService.create(newGroup)
        .then((group) => res.send(group))
        .catch((error) => res.status(500).send(error.message));
}
