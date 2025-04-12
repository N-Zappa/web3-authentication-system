import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NonceModule } from 'src/nonces/nonce.module';
import { UsersModule } from 'src/users/users.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/config';

@Module({
  imports: [
    NonceModule,
    UsersModule,
    SessionsModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '10s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
