import { Injectable } from '@nestjs/common';
import {
  CertificateRound,
  CertificateUser,
  Prisma,
  User,
} from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { CertificateUserType } from '@/module/certificate/domain/certificate-user';

@Injectable()
export class CertificateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    props: {
      where?: Prisma.CertificateUserWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.certificateUser.count(props);
  }

  async findAll(
    props: {
      where?: Prisma.CertificateUserWhereInput;
      include?: Prisma.CertificateUserInclude;
      orderBy?: Prisma.CertificateUserOrderByWithRelationInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CertificateUserType[]> {
    return tx.certificateUser.findMany(props);
  }

  async findOne(
    props: {
      where?: Prisma.CertificateUserWhereInput;
      include?: Prisma.CertificateUserInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CertificateUserType | null> {
    return tx.certificateUser.findFirst(props);
  }

  async create(
    props: {
      data: Omit<
        Prisma.CertificateUserCreateInput,
        'id' | 'createdAt' | 'updatedAt'
      >;
      include: Prisma.CertificateUserInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<
    CertificateUser & {
      certificateRound: CertificateRound;
      user: User;
    }
  > {
    return tx.certificateUser.create(props);
  }
}
