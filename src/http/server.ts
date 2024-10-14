import express from 'express';
import { env } from '../env';
import router from '../routes/urlRoutes';
import { logger } from '../utils/logger';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
// TODO(guilherme): configurar o cors para aceitar apenas POST do front e apenas GET do navegador

app.use('/', router);

app.listen(env.APP_PORT, env.APP_HOST, () => {
  logger.info(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`);
});
