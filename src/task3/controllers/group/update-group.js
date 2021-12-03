import { GroupService, GroupError } from '../../services';
import { GroupRepository } from '../../data-access';
import { Group, Users } from '../../models';
import { getGroup, getKeyValueString } from '../../utils';
import { logger } from '../../logger';

const groupService = new GroupService(new GroupRepository(Group, Users));

export function updateGroup(req, res, next) {
    const newGroup = { ...req.group, ...getGroup(req.body) };
    return groupService.update(newGroup)
        .then((group) => res.send(group))
        .catch(error => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
