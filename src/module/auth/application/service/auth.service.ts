import { Injectable } from '@nestjs/common';
import { Auth, Prisma, User } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    props: {
      where: Prisma.AuthWhereInput;
      include?: Prisma.AuthInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<(Auth & { user?: User }) | null> {
    return tx.auth.findFirst(props);
  }

  async create(
    props: {
      data: Omit<Prisma.AuthCreateInput, 'id' | 'createdAt' | 'updatedAt'>;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<Auth> {
    return tx.auth.create(props);
  }
}
