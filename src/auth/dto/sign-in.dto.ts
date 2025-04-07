import { IsNumber, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  wallet: string;

  @IsString()
  nonce: string;

  @IsString()
  signature: string;

  @IsNumber()
  timestamp: number;
}
