import express from 'express';
import http from 'http';
import router from './router';
import { SEQUELIZE } from './config';
import { errorController } from './controllers';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', router);
app.use(errorController);
http.createServer(app).listen(PORT);

SEQUELIZE().sync();
