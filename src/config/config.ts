import { config } from 'dotenv';
config();
import { getEnv } from './get-env';

//Environment
export const PORT = +getEnv('PORT');
export const JWT_SECRET = getEnv('JWT_SECRET');

//DB
export const DB_PORT = +getEnv('DB_PORT');
export const DB_HOST = getEnv('DB_HOST');
export const DB_USERNAME = getEnv('DB_USERNAME');
export const DB_PASSWORD = getEnv('DB_PASSWORD');
export const DB_NAME = getEnv('DB_NAME');

//APIS
export const IP_API = getEnv('IP_API');
