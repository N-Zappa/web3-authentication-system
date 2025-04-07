import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NonceModule } from 'src/nonces/nonce.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [NonceModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
