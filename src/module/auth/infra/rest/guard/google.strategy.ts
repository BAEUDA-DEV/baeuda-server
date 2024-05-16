import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { ConfigOptions } from '@/options/config.option';

import { AuthService } from '@/module/auth/application/service/auth.service';
import { GoogleService } from '@/module/auth/application/service/google.service';
import { OAuthProvider } from '@/module/auth/domain/oauth';
import { OAuthUserType } from '@/module/auth/infra/rest/guard';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configSerivce: ConfigService<ConfigOptions>,
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {
    super({
      clientID: configSerivce.get('OAUTH_GOOGLE_ID'),
      clientSecret: configSerivce.get('OAUTH_GOOGLE_SECRET'),
      callbackURL: configSerivce.get('OAUTH_GOOGLE_REDIRECT'),
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): OAuthUserType {
    const hasAuthentication = this.googleService
      .getUserId(accessToken)
      .then((providerId) =>
        this.authService.findOne({
          provider: OAuthProvider.GOOGLE,
          providerId,
        }),
      )
      .then((it) => !!it)
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });

    return {
      provider: OAuthProvider.GOOGLE,
      providerId: profile.id,
      accessToken,
      refreshToken,
      hasAuthentication,
    };
  }
}
