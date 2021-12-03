import { logger } from '../logger';

export const unhandledErrorLogger = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).end();
};
