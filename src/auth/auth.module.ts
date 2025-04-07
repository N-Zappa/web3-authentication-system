import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NonceModule } from 'src/nonces/nonce.module';

@Module({
  imports: [NonceModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
