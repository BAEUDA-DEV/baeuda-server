import { Injectable } from '@nestjs/common';
import { Certificate, CertificateRound, Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

@Injectable()
export class CertificateRoundService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    where: Prisma.CertificateRoundWhereInput,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<(CertificateRound & { certificate: Certificate })[]> {
    return tx.certificateRound.findMany({
      where,
      include: { certificate: true },
    });
  }
}
