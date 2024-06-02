import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    props: {
      where: Prisma.UserWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<User | null> {
    return tx.user.findFirst(props);
  }

  async create(
    props: {
      data: Omit<Prisma.UserCreateInput, 'id' | 'createAt' | 'updatedAt'>;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<User> {
    return tx.user.create(props);
  }
}
