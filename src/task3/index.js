import express from 'express';
import http from 'http';
import router from './router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', router);

http.createServer(app).listen(PORT);
