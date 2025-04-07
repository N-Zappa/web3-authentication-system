import { Module } from '@nestjs/common';
import { NonceService } from './nonce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nonce } from './entities/nonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nonce])],
  providers: [NonceService],
  exports: [NonceService],
})
export class NonceModule {}
