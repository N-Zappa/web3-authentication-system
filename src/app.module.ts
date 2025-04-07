import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './config/config';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Nonce } from './nonces/entities/nonce.entity';
import { NonceModule } from './nonces/nonce.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [User, Nonce],
      migrations: [__dirname.replace('src', 'migrations') + '/*.ts'],
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    NonceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
