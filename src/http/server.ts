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

app.listen(env.APP_PORT, () => {
  logger.info(`Server is running on port ${env.APP_PORT}`);
});
