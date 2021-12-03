import { logger } from '../logger';
import { getKeyValueString } from '../utils';

const getActualRequestDuration = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const dataLogger = (req, res, next) => {
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDuration(start);
    const log = `${ req.method }:${ req.url } ${ res.statusCode } ${ getKeyValueString(req.body) } ${ durationInMilliseconds.toLocaleString() } ms`;
    logger.info(log);
    next();
};
