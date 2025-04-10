import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProtectedResource(): string {
    return 'This is protected resource';
  }
}
