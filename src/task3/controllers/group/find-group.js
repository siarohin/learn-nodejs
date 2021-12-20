import { GroupError, groupServiceInstance } from '../../services';
import { logger } from '../../logger';
import { getKeyValueString } from '../../utils';

export function findGroup(req, res, next) {
    const { id } = req.params;
    return groupServiceInstance.get(id)
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
