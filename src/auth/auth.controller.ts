import { Controller, Inject, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EvmAddressValidationPipe } from 'src/pipes/evm-address-validation.pipe';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('nonce')
  async getNonce(
    @Query('wallet', new EvmAddressValidationPipe())
    wallet: string,
  ) {
    return this.authService.getNonce(wallet);
  }
}
