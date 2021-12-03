import { GroupService, GroupError } from '../../services';
import { GroupRepository } from '../../data-access';
import { Group, Users } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

const groupService = new GroupService(new GroupRepository(Group, Users));

export function addUsersToGroup(req, res, next) {
    const { id } = req.params;
    const { userIds } = req.body;
    return groupService.addUsersToGroup(id, userIds)
        .then((group) => res.send(group))
        .catch(error => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
