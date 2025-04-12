import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { NonceService } from 'src/nonces/nonce.service';
import { SignUpDto } from './dto/sign-up.dto';
import { verifyMessage } from 'ethers';
import { UsersService } from 'src/users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import axios from 'axios';
import { IP_API } from 'src/config/config';
import { GetNonce } from './types/get-nonce.type';
import { SignUp } from './types/sign-up.type';
import { RefreshAccessToken } from './types/refresh-access-token.type';

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

  async getNonce(wallet: string): Promise<GetNonce> {
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

  async signUp(dto: SignUpDto): Promise<SignUp> {
    const recoveredWallet = verifyMessage(dto.nonce, dto.signature);

    if (recoveredWallet.toLowerCase() !== dto.wallet.toLowerCase()) {
      throw new ForbiddenException('Wrong signature');
    } else {
      let user = null;
      if (await this.usersService.existsByWallet(dto.wallet.toLowerCase())) {
        user = await this.usersService.getUserByWallet(
          dto.wallet.toLowerCase(),
        );
      } else {
        user = await this.usersService.saveUser({
          wallet: dto.wallet.toLowerCase(),
          status: 'ACTIVE',
          createdAt: new Date(),
          lastLoginAt: new Date(),
        });
      }

      const existingSession = await this.sessionsService.findExistingSession(
        user.id,
        dto.fingerprint,
        dto.userAgent,
        dto.ip,
      );

      if (existingSession) {
        return {
          accessToken: await this.jwtService.signAsync({
            wallet: user.wallet,
          }),
          refreshToken: existingSession.refresh_token,
          sessionId: existingSession.id,
        };
      }

      const refreshToken = this.generateRefreshToken();

      const response = await axios.get(`${IP_API}/${dto.ip}/json/`);
      const country = response.data;

      const session = await this.sessionsService.createSession({
        user: user,
        refresh_token: refreshToken,
        fingerprint: dto.fingerprint,
        ip: dto.ip,
        user_agent: dto.userAgent,
        created_at: new Date(),
        last_used_at: new Date(),
        is_active: true,
        countryCode: country.country_code,
      });

      return {
        accessToken: await this.jwtService.signAsync({
          wallet: user.wallet,
        }),
        refreshToken: session.refresh_token,
        sessionId: session.id,
      };
    }
  }

  async refreshAccessToken(
    dto: RefreshAccessTokenDto,
  ): Promise<RefreshAccessToken> {
    const session = await this.sessionsService.getSessionById(dto.sessionId);
    if (!session) {
      throw new UnauthorizedException('No session found');
    }
    if (session.refresh_token !== dto.refreshToken) {
      throw new UnauthorizedException('Wrong refresh token');
    } else {
      const payload = {
        wallet: session.user.wallet,
      };

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: session.refresh_token,
      };
    }
  }
}
