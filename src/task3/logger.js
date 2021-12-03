import * as path from 'path';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf((parameters) => `[${parameters.timestamp}] ${parameters.level}: ${parameters.message}`);

export const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        customFormat,
    ),
    transports: [
        new transports.File({ filename: path.resolve(__dirname, '../../log/error.log'), level: 'error' }),
        new transports.File({ filename: path.resolve(__dirname, '../../log/info.log'), level: 'info' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
}
