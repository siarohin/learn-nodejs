import { GroupService, GroupError } from '../../services';
import { GroupRepository } from '../../data-access';
import { Group, Users } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

const groupService = new GroupService(new GroupRepository(Group, Users));

export function getGroups(req, res, next) {
    return groupService.getAll()
        .then((groups) => res.send(groups))
        .catch(error => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
