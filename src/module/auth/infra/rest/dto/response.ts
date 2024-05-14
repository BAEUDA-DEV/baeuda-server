import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { OAuthProvider } from '@/module/auth/domain/oauth';

interface IAuthRes {
  accessToken: string;
  refreshToken: string;
}

interface IOAuthRes {
  provider: OAuthProvider;
  providerAccessToken: string;
  hasAuthtentication: boolean;
}

export class AuthRes implements IAuthRes {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  static from(props: IAuthRes): AuthRes {
    return new AuthRes(props.accessToken, props.refreshToken);
  }
}

export class OAuthRes implements IOAuthRes {
  @ApiProperty({ enum: OAuthProvider })
  @IsNotEmpty()
  @IsEnum(OAuthProvider)
  provider: OAuthProvider;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  providerAccessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hasAuthtentication: boolean;

  constructor(
    provider: OAuthProvider,
    providerAccessToken: string,
    hasAuthtentication: boolean,
  ) {
    this.provider = provider;
    this.providerAccessToken = providerAccessToken;
    this.hasAuthtentication = hasAuthtentication;
  }

  static from(props: IOAuthRes): OAuthRes {
    return new OAuthRes(
      props.provider,
      props.providerAccessToken,
      props.hasAuthtentication,
    );
  }
}
