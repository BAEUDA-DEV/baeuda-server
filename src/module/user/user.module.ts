import { Module } from '@nestjs/common';

import { UserService } from '@/module/user/application/service/user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
