import { Module } from '@nestjs/common';

import { UserFacade } from '@/module/user/application/facade/user.facade';
import { UserService } from '@/module/user/application/service/user.service';
import { UserController } from '@/module/user/infra/rest/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserFacade, UserService],
  exports: [UserService],
})
export class UserModule {}
