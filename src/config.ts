import { config } from 'dotenv';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
const { parsed } = config({ path: envFilePath });

export const getEnvVar = (key: string) => {
  if (!process.env[key] && !parsed?.[key]) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || parsed[key];
};

/** Runtime mode */
export const NODE_ENV = getEnvVar('NODE_ENV');
/** Dev mode */
export const isDevEnv = NODE_ENV === 'development';
/** Prod mode */
export const isProdEnv = NODE_ENV === 'production';

export const PORT = getEnvVar('PORT');
