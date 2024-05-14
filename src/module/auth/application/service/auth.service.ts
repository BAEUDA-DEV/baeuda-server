import { Injectable } from '@nestjs/common';
import { Auth, Prisma, ProviderType, User } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    params: {
      provider: ProviderType;
      providerId: string;
    },
    include?: Prisma.AuthInclude,
  ): Promise<Auth & { user?: User }> {
    return this.prisma.auth.findFirst({
      where: params,
      include,
    });
  }

  async create(
    params: {
      provider: ProviderType;
      providerId: string;
      userId: string;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<Auth> {
    return tx.auth.create({
      data: params,
    });
  }
}
