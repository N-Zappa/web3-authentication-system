import { join } from 'path';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/config/config';
import { Nonce } from 'src/nonces/entities/nonce.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Nonce],
  migrations: [join(__dirname, '..', '..', 'migrations', '*.js')],
  synchronize: false,
  logging: false,
});

export default dataSource;
