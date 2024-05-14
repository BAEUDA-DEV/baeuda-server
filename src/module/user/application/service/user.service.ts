import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    where: Prisma.UserWhereInput,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<User> {
    return tx.user.findFirst({
      where,
    });
  }

  async create(
    params: { name: string; email: string },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<User> {
    return tx.user.create({
      data: params,
    });
  }
}
