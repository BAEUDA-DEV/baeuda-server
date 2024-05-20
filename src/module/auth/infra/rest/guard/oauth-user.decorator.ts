import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

import { OAuthType } from '@/module/auth/infra/rest/guard';

export const OAuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): OAuthType => {
    const req = ctx.switchToHttp().getRequest<{ user?: OAuthType }>();
    if (!req?.user) {
      throw new UnauthorizedException('인증 정보를 찾을 수 없습니다.');
    }

    return req.user;
  },
);
