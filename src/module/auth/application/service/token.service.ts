import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { match } from 'ts-pattern';

import { ConfigOptions } from '@/options/config.option';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService<ConfigOptions>,
    private readonly jwtSerivce: JwtService,
  ) {}

  async parse(
    token: string,
  ): Promise<{ payload: { userId: string }; isRefresh: boolean }> {
    try {
      return {
        payload: await this.jwtSerivce.verifyAsync(token, {
          secret: this.configService.get('JWT_SECRET'),
        }),
        isRefresh: false,
      };
    } catch (e) {}

    try {
      return {
        payload: await this.jwtSerivce.verifyAsync(token, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        }),
        isRefresh: true,
      };
    } catch (e) {}

    return { payload: null, isRefresh: null };
  }

  async generate(
    payload: { userId: string },
    isRefresh: boolean = false,
  ): Promise<string> {
    return match(isRefresh)
      .with(true, () => {
        return this.jwtSerivce.signAsync(payload, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
        });
      })
      .with(false, () => {
        return this.jwtSerivce.signAsync(payload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_EXPIRE'),
        });
      })
      .exhaustive();
  }
}
