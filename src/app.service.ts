import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProtectedResource(wallet: string): string {
    return `This is protected resource. Your wallet: ${wallet}`;
  }
}
