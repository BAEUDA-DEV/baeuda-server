import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { CertificateType } from '@/module/certificate/domain/certificate';

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    props: {
      where?: Prisma.CertificateWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.certificate.count(props);
  }

  async findAll(
    props: {
      where?: Prisma.CertificateWhereInput;
      include?: Prisma.CertificateInclude;
      skip?: number;
      take?: number;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CertificateType[]> {
    return tx.certificate.findMany(props);
  }
}
