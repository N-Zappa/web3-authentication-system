import dotenv from 'dotenv';
dotenv.config();
import { getEnv } from './get-env';

//Environment
export const PORT = +getEnv('PORT');
