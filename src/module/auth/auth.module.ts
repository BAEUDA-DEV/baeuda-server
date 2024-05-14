import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@/module/user/user.module';

import { AuthFacade } from '@/module/auth/application/facade/auth.facade';
import { AuthService } from '@/module/auth/application/service/auth.service';
import { GoogleService } from '@/module/auth/application/service/google.service';
import { TokenService } from '@/module/auth/application/service/token.service';
import { AuthController } from '@/module/auth/infra/rest/auth.controller';
import { GoogleStrategy } from '@/module/auth/infra/rest/guard/google.strategy';
import { UserService } from '@/module/user/application/service/user.service';

import { jwtModuleOptions } from '@/options/jwt.option';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 3 }),
    JwtModule.registerAsync(jwtModuleOptions),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    AuthFacade,
    AuthService,
    GoogleService,
    TokenService,
    UserService,
  ],
})
export class AuthModule {}
