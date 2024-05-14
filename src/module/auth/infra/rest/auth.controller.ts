import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { OAuthUserType } from '@/module/auth/infra/rest/guard';
import { GoogleAuthGuard } from '@/module/auth/infra/rest/guard/google-auth.guard';
import { OAuthUser } from '@/module/auth/infra/rest/guard/oauth-user.decorator';

import { AuthFacade } from '@/module/auth/application/facade/auth.facade';

import {
  ReissueReq,
  SignInReq,
  SignUpReq,
} from '@/module/auth/infra/rest/dto/request';
import { AuthRes, OAuthRes } from '@/module/auth/infra/rest/dto/response';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('/login')
  @ApiResponse({ type: AuthRes })
  async signIn(@Body() req: SignInReq): Promise<AuthRes> {
    return this.authFacade.signIn(req).then((it) => it.toRes());
  }

  @Post('/new')
  @ApiResponse({ type: AuthRes })
  async signUp(@Body() req: SignUpReq): Promise<AuthRes> {
    return this.authFacade.signUp(req).then((it) => it.toRes());
  }

  @Post('/reissue')
  @ApiResponse({ type: AuthRes })
  async reissue(@Body() req: ReissueReq): Promise<AuthRes> {
    return this.authFacade.reissue(req).then((it) => it.toRes());
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async google(): Promise<void> {}

  @Get('/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiResponse({ type: OAuthRes })
  async redirect(@OAuthUser() user: OAuthUserType): Promise<OAuthRes> {
    return OAuthRes.from({
      provider: user.provider,
      providerAccessToken: user.accessToken,
      hasAuthtentication: await user.hasAuthentication,
    });
  }
}
