import { GroupError, groupServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

export function getGroups(req, res, next) {
    return groupServiceInstance.getAll()
        .then((groups) => res.send(groups))
        .catch(error => {
            if (error instanceof GroupError) {
                logger.error(getKeyValueString({ ...error, message: error.message }));
                return res.status(500).send(error.message);
            }
            return next(error);
        });
}
