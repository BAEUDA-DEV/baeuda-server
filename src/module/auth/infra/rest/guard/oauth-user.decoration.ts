import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';

import { OAuthUserType } from '@/module/auth/infra/rest/guard';

export const OAuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): OAuthUserType => {
    const req = ctx.switchToHttp().getRequest<{ user?: OAuthUserType }>();
    if (!req?.user) {
      throw new HttpException(
        '인증 정보를 찾을 수 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return req.user;
  },
);
