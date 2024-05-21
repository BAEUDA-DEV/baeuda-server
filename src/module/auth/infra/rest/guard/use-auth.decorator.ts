import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

import { AuthGuard } from '@/module/auth/infra/rest/guard/auth.guard';

export const UseAuth = () =>
  applyDecorators(
    UseGuards(AuthGuard),
    ApiSecurity('authorization', ['global']),
  );
