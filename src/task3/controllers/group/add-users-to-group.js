import { GroupError, groupServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

export function addUsersToGroup(req, res, next) {
    const { id } = req.params;
    const { userIds } = req.body;
    return groupServiceInstance.addUsersToGroup(id, userIds)
        .then((group) => res.send(group))
        .catch(error => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
