import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '@/module/user/application/service/user.service';

import { User } from '@/module/user/domain/user';

import { UserUpdateReq } from '@/module/user/infra/rest/dto/request';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  async me(userId: string): Promise<User> {
    const user = await this.userService.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return User.fromPrisma(user);
  }

  async update(userId: string, req: UserUpdateReq): Promise<User> {
    return this.userService
      .update({
        data: { name: req.name },
        where: { id: userId },
      })
      .then((user) => User.fromPrisma(user));
  }
}
