import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '@/module/user/application/service/user.service';

import { User } from '@/module/user/domain/user';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  async me(userId: string): Promise<User> {
    const user = await this.userService.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return User.fromPrisma(user);
  }
}
