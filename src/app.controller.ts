import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWalletInfo, WalletInfo } from './decorators/wallet.decorator';

@Controller()
@ApiBearerAuth()
@ApiTags('Protected resources')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected-resource')
  secureRoute(@WalletInfo() walletInfo: RequestWalletInfo): string {
    return this.appService.getProtectedResource(walletInfo.wallet);
  }
}
