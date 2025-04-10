import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsString()
  @ApiProperty()
  refreshToken: string;

  @IsString()
  @ApiProperty()
  @IsUUID()
  sessionId: string;
}
