import express from 'express';
import { env } from '../env';
import router from '../routes/urlRoutes';
import { logger } from '../utils/logger';

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(env.APP_PORT, env.APP_HOST, () => {
  logger.info(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`);
});
