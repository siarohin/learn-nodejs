import { GroupError, groupServiceInstance } from '../../services';
import { getGroup, getKeyValueString } from '../../utils';
import { logger } from '../../logger';

export function updateGroup(req, res, next) {
    const newGroup = { ...req.group, ...getGroup(req.body) };
    return groupServiceInstance.update(newGroup)
        .then((group) => res.send(group))
        .catch(error => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
