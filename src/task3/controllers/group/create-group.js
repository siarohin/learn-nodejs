import { nanoid } from 'nanoid';
import { GroupError, groupServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString, getGroup } from '../../utils';

export function createGroup(req, res, next) {
    const newGroup = { ...getGroup(req.body), id: nanoid() };
    return groupServiceInstance.create(newGroup)
        .then((group) => res.send(group))
        .catch((error) => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
