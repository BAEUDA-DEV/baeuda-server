import { Injectable } from '@nestjs/common';
import {
  CertificateRound,
  CertificateUser,
  Prisma,
  User,
} from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class CertificateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    where?: Prisma.CertificateUserWhereInput,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.certificateUser.count({
      where,
    });
  }

  async findAll(
    where?: Prisma.CertificateUserWhereInput,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<
    (CertificateUser & { certificateRound: CertificateRound; user: User })[]
  > {
    return tx.certificateUser.findMany({
      where,
      include: { certificateRound: true, user: true },
    });
  }

  async findOne(
    where?: Prisma.CertificateUserWhereInput,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<
    | (CertificateUser & { certificateRound: CertificateRound; user: User })
    | null
  > {
    return tx.certificateUser.findFirst({
      where: where,
      include: { certificateRound: true, user: true },
    });
  }

  async create(
    params: {
      certificateRoundId: string;
      userId: string;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<
    CertificateUser & {
      certificateRound: CertificateRound;
      user: User;
    }
  > {
    return tx.certificateUser.create({
      data: params,
      include: { certificateRound: true, user: true },
    });
  }
}
