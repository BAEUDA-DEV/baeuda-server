import { Controller, Get, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';
import { UserFacade } from '@/module/user/application/facade/user.facade';

import { AuthUserType } from '@/module/auth/infra/rest/guard';
import { AuthUser } from '@/module/auth/infra/rest/guard/auth-user.decorator';

import { UserUpdateReq } from '@/module/user/infra/rest/dto/request';
import { UserRes } from '@/module/user/infra/rest/dto/response';

@Controller('/api/user')
@ApiTags('User')
@UseAuth()
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get('/me')
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({ type: UserRes })
  async me(@AuthUser() { userId }: AuthUserType): Promise<UserRes> {
    return this.userFacade.me(userId).then((it) => it.toRes());
  }

  @Patch('/me')
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiResponse({ type: UserRes })
  async update(
    @AuthUser() { userId }: AuthUserType,
    req: UserUpdateReq,
  ): Promise<UserRes> {
    return this.userFacade.update(userId, req).then((it) => it.toRes());
  }
}
