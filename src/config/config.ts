import { config } from 'dotenv';
config();
import { getEnv } from './get-env';

//Environment
export const PORT = +getEnv('PORT');

//DB
export const DB_PORT = +getEnv('DB_PORT');
export const DB_HOST = getEnv('DB_HOST');
export const DB_USERNAME = getEnv('DB_USERNAME');
export const DB_PASSWORD = getEnv('DB_PASSWORD');
export const DB_NAME = getEnv('DB_NAME');
