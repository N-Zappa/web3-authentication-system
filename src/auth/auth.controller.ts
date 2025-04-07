import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EvmAddressValidationPipe } from 'src/pipes/evm-address-validation.pipe';
import { SignInDto } from './dto/sign-in.dto';

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

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
