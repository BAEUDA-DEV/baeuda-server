import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthUserType } from '@/module/auth/infra/rest/guard';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserType => {
    const req = ctx.switchToHttp().getRequest<{ payload: AuthUserType }>();

    return req!.payload;
  },
);
