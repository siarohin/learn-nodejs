import { GroupService, GroupError } from '../../services';
import { GroupRepository } from '../../data-access';
import { Group, Users } from '../../models';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

const groupService = new GroupService(new GroupRepository(Group, Users));

export function findGroup(req, res, next) {
    const { id } = req.params;
    return groupService.get(id)
        .then((group) => {
            req.group = group;
            next();
        })
        .catch((error) => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(404).send(error.message);
            }
            return next(error);
        });
}
