import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { CertificateRoundType } from '@/module/certificate/domain/certificate-round';

@Injectable()
export class CertificateRoundService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    props: {
      where?: Prisma.CertificateRoundWhereInput;
      include?: Prisma.CertificateRoundInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CertificateRoundType[]> {
    return tx.certificateRound.findMany(props);
  }
}
