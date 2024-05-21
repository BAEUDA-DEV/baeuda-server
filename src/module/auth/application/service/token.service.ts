import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ConfigOptions } from '@/options/config.option';

import { Token } from '@/module/auth/domain/token';
import { AuthUserType } from '@/module/auth/infra/rest/guard';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService<ConfigOptions>,
    private readonly jwtSerivce: JwtService,
  ) {}

  async parse(token: string): Promise<{
    payload: AuthUserType | null;
    type: 'access' | 'refresh' | null;
  }> {
    try {
      return {
        payload: await this.jwtSerivce.verifyAsync<AuthUserType>(token, {
          secret: this.configService.get('JWT_SECRET'),
        }),
        type: 'access',
      };
    } catch (e) {}

    try {
      return {
        payload: await this.jwtSerivce.verifyAsync<AuthUserType>(token, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        }),
        type: 'refresh',
      };
    } catch (e) {}

    return { payload: null, type: null };
  }

  async generate(payload: AuthUserType): Promise<Token> {
    return Token.from({
      accessToken: await this.jwtSerivce.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRE'),
      }),
      refreshToken: await this.jwtSerivce.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
      }),
    });
  }
}
