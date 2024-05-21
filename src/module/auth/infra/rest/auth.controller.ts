import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OAuthType } from '@/module/auth/infra/rest/guard';
import { GoogleAuthGuard } from '@/module/auth/infra/rest/guard/google-auth.guard';
import { OAuthUser } from '@/module/auth/infra/rest/guard/oauth-user.decorator';

import { AuthFacade } from '@/module/auth/application/facade/auth.facade';

import { ReissueReq } from '@/module/auth/infra/rest/dto/request';
import { AuthRes } from '@/module/auth/infra/rest/dto/response';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Get('/')
  @ApiExcludeEndpoint()
  @ApiResponse({ type: AuthRes })
  @UseGuards(GoogleAuthGuard)
  async oauth(@OAuthUser() req: OAuthType): Promise<AuthRes> {
    return this.authFacade.sign(req).then((it) => it.toRes());
  }

  @Get('/google')
  @ApiOperation({ summary: '구글 로그인' })
  @UseGuards(GoogleAuthGuard)
  async google(): Promise<void> {}

  @Post('/reissue')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({ type: AuthRes })
  async reissue(@Body() req: ReissueReq): Promise<AuthRes> {
    return this.authFacade.reissue(req).then((it) => it.toRes());
  }
}
