import express from 'express';
import http from 'http';
import router from './router';
import { joiErrorLogger, dataLogger, unhandledErrorLogger } from './controllers';
import { terminate } from './utils';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(dataLogger);
app.use('/api/v1', router);
app.use(joiErrorLogger);
app.use(unhandledErrorLogger);

const server = http.createServer(app);
const exitHandler = terminate(server, { coredump: false,  timeout: 500 });
process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
server.listen(PORT);
