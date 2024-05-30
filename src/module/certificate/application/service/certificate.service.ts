import { Injectable } from '@nestjs/common';
import { Certificate, Prisma, Test } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    where?: Prisma.CertificateCountArgs['where'],
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.certificate.count({
      where,
    });
  }

  async findAll(
    where?: Prisma.CertificateWhereInput,
    skip?: number,
    take?: number,
    include?: Prisma.CertificateInclude,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<(Certificate & { test?: Test })[]> {
    return tx.certificate.findMany({
      where,
      skip,
      take,
      include,
    });
  }
}
