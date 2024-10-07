import { z } from 'zod';
import { logger } from './utils/logger';

const envSchema = z.object({
  APP_HOST: z.string(),
  APP_PORT: z.coerce.number().int(),
});

export const validate = envSchema.safeParse(process.env);

if (!validate.success) {
  logger.error(
    'Erro na validação das variáveis de ambiente:',
    validate.error.format(),
  );
  process.exit(1);
}

export const env = validate.data;
