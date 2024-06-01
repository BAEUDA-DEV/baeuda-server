import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

interface IAuthRes {
  accessToken: string;
  refreshToken: string;
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

  public static from(props: IAuthRes): AuthRes {
    return new AuthRes(props.accessToken, props.refreshToken);
  }
}
