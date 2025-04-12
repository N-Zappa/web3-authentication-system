import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nonce } from './entities/nonce.entity';
import { Repository } from 'typeorm';
import { INonce } from './types/nonce.type';
import { randomBytes } from 'crypto';
import { GenerateNonce } from './types/generate-nonce.type';

@Injectable()
export class NonceService {
  constructor(
    @InjectRepository(Nonce)
    private nonceRepository: Repository<Nonce>,
  ) {}

  generateNonce(): GenerateNonce {
    const timestamp = Date.now();
    return {
      nonce: `${randomBytes(32).toString('hex')}-${timestamp}`,
      timestamp: timestamp,
    };
  }

  async getNonceByWallet(wallet: string): Promise<Nonce | null> {
    return await this.nonceRepository.findOne({
      where: { wallet: wallet.toLowerCase() },
    });
  }

  async insertNonce(wallet: string, nonce: string): Promise<Nonce> {
    const timestamp: number = Date.now();
    const insertNonce: INonce = {
      nonce: nonce,
      wallet: wallet.toLowerCase(),
      timestamp: timestamp,
    };
    return await this.nonceRepository.save(insertNonce);
  }
}
