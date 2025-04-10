import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EvmAddressValidationPipe } from 'src/pipes/evm-address-validation.pipe';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './public';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';

@Controller('auth')
@Public()
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
  async signIn(@Body(new ValidationPipe()) dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('refresh-access-token')
  async refreshAccessToken(
    @Body(new ValidationPipe()) dto: RefreshAccessTokenDto,
  ) {
    return this.authService.refreshAccessToken(dto);
  }
}
