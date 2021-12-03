/* eslint-disable no-unused-expressions */
import { logger } from '../logger';

export function terminate(server, options = { coredump: false, timeout: 500 }) {
    const exit = (code) => {
        options.coredump ? process.abort() : process.exit(code);
    };

    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            logger.error(err.message, err.stack);
        }
        setTimeout(exit, options.timeout).unref();
    };
}
