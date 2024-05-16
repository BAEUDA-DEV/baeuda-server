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

  constructor(provider: OAuthProvider, providerAccessToken: string) {
    this.provider = provider;
    this.providerAccessToken = providerAccessToken;
  }

  static from(props: {
    provider: OAuthProvider;
    providerAccessToken: string;
  }): SignInReq {
    return new SignInReq(props.provider, props.providerAccessToken);
  }
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
