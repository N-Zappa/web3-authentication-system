import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { NonceService } from 'src/nonces/nonce.service';
import { SignInDto } from './dto/sign-in.dto';
import { verifyMessage } from 'ethers';
import { UsersService } from 'src/users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly nonceService: NonceService;

  @Inject()
  private readonly usersService: UsersService;

  @Inject()
  private readonly sessionsService: SessionsService;

  @Inject()
  private readonly jwtService: JwtService;

  private generateRefreshToken() {
    return randomBytes(32).toString('hex');
  }

  async getNonce(wallet: string) {
    const nonceInfo = await this.nonceService.getNonceByWallet(wallet);
    if (!nonceInfo) {
      const generatedNonce = this.nonceService.generateNonce();
      await this.nonceService.insertNonce(wallet, generatedNonce.nonce);
      return {
        nonce: generatedNonce.nonce,
        timestamp: generatedNonce.timestamp,
      };
    }
    return { nonce: nonceInfo.nonce, timestamp: nonceInfo.timestamp };
  }

  async signIn(dto: SignInDto) {
    const recoveredWallet = verifyMessage(dto.nonce, dto.signature);

    if (recoveredWallet.toLowerCase() !== dto.wallet.toLowerCase()) {
      throw new ForbiddenException('Wrong signature');
    } else {
      if (await this.usersService.existsByWallet(dto.wallet.toLowerCase())) {
        const user = await this.usersService.getUserByWallet(dto.wallet);
        const session = await this.sessionsService.getSessionByUserId(user.id);
        if (session.refresh_token !== dto.refresh_token) {
          throw new UnauthorizedException('Wrong refresh token');
        } else {
          const payload = {
            wallet: dto.wallet,
          };

          return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: session.refresh_token,
          };
        }
      } else {
        const savedUser = await this.usersService.saveUser({
          wallet: dto.wallet.toLowerCase(),
          status: 'ACTIVE',
          createdAt: new Date(),
          lastLoginAt: new Date(),
        });

        const refreshToken = this.generateRefreshToken();

        await this.sessionsService.createSession({
          user: savedUser,
          refresh_token: refreshToken,
          fingerprint: dto.fingerprint,
          ip: dto.ip,
          user_agent: dto.userAgent,
          created_at: new Date(),
          last_used_at: new Date(),
          is_active: true,
        });

        const payload = {
          wallet: dto.wallet,
        };

        return {
          accessToken: await this.jwtService.signAsync(payload),
          refreshToken: refreshToken,
        };
      }
    }
  }
}
