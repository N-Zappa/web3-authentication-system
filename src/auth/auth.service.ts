import { Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { NonceService } from 'src/nonces/nonce.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly nonceService: NonceService;

  private generateNonce() {
    return `${randomBytes(32).toString('hex')}-${Date.now()}`;
  }

  async getNonce(wallet: string) {
    const nonceInfo = await this.nonceService.getNonceByWallet(wallet);
    if (!nonceInfo) {
      const nonce = this.generateNonce();
      await this.nonceService.insertNonce(wallet, nonce);
      return nonce;
    }
    return { nonce: nonceInfo.nonce };
  }
}
