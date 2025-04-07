import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { NonceService } from 'src/nonces/nonce.service';
import { SignInDto } from './dto/sign-in.dto';
import { verifyMessage } from 'ethers';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly nonceService: NonceService;

  @Inject()
  private readonly usersService: UsersService;

  private generateNonce() {
    const timestamp = Date.now();
    return {
      nonce: `${randomBytes(32).toString('hex')}-${timestamp}`,
      timestamp: timestamp,
    };
  }

  async getNonce(wallet: string) {
    const nonceInfo = await this.nonceService.getNonceByWallet(wallet);
    if (!nonceInfo) {
      const generatedNonce = this.generateNonce();
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
      if (!(await this.usersService.existsByWallet(dto.wallet))) {
        await this.usersService.saveUser({
          wallet: dto.wallet,
          status: 'ACTIVE',
          createdAt: new Date(),
          lastLoginAt: new Date(),
        });
      }
    }
  }
}
