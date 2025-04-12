import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EvmAddressValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!ethers.isAddress(value)) {
      throw new BadRequestException('Wrong evm-wallet');
    }
    return value.toLowerCase();
  }
}
