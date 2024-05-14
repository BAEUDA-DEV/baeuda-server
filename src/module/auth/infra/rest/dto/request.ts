import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { OAuthProvider } from '@/module/auth/domain/oauth';

export class SignInReq {
  @ApiProperty({ enum: OAuthProvider })
  @IsNotEmpty()
  @IsEnum(OAuthProvider)
  provider: OAuthProvider;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  providerAccessToken: string;
}

export class SignUpReq extends SignInReq {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ReissueReq {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
