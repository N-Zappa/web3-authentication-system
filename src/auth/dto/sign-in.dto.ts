import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty()
  wallet: string;

  @IsString()
  @ApiProperty()
  nonce: string;

  @IsString()
  @ApiProperty()
  signature: string;

  @IsString()
  @ApiProperty()
  fingerprint: string;

  @IsString()
  @ApiProperty()
  ip: string;

  @IsString()
  @ApiProperty()
  userAgent: string;

  @IsString()
  @ApiProperty()
  refresh_token: string;
}
