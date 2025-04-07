import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nonce } from './entities/nonce.entity';
import { Repository } from 'typeorm';
import { INonce } from './types/nonce.type';

@Injectable()
export class NonceService {
  constructor(
    @InjectRepository(Nonce)
    private nonceRepository: Repository<Nonce>,
  ) {}

  async getNonceByWallet(wallet: string) {
    return await this.nonceRepository.findOne({
      where: { wallet: wallet.toLowerCase() },
    });
  }

  async insertNonce(wallet: string, nonce: string) {
    const timestamp: number = Date.now();
    const insertNonce: INonce = {
      nonce: nonce,
      wallet: wallet.toLowerCase(),
      timestamp: timestamp,
    };
    return await this.nonceRepository.save(insertNonce);
  }
}
