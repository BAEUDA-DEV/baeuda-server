import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { ConfigOptions } from '@/options/config.option';

import { OAuthProvider } from '@/module/auth/domain/oauth';
import { OAuthType } from '@/module/auth/infra/rest/guard';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configSerivce: ConfigService<ConfigOptions>) {
    super({
      clientID: configSerivce.get('OAUTH_GOOGLE_ID'),
      clientSecret: configSerivce.get('OAUTH_GOOGLE_SECRET'),
      callbackURL: configSerivce.get('OAUTH_GOOGLE_REDIRECT'),
      scope: ['email', 'profile'],
    });
  }

  public validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): OAuthType {
    return {
      provider: OAuthProvider.GOOGLE,
      providerId: profile.id,
      name: profile?.name?.givenName ?? null,
      email: profile?.emails?.[0]?.value ?? null,
      profileImageUrl: profile?.photos?.[0]?.value ?? null,
    };
  }
}
