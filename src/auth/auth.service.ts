import { Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { NonceService } from 'src/nonces/nonce.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly nonceService: NonceService;

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
}
