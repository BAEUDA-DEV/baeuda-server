import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { UserType } from '@/module/user/domain/user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    props: {
      where: Prisma.UserWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<UserType | null> {
    return tx.user.findFirst(props);
  }

  async create(
    props: {
      data: Omit<Prisma.UserCreateInput, 'id' | 'createAt' | 'updatedAt'>;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<UserType> {
    return tx.user.create(props);
  }

  async update(
    props: {
      data: Prisma.UserUpdateInput;
      where: Prisma.UserWhereUniqueInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<UserType> {
    return tx.user.update(props);
  }
}
