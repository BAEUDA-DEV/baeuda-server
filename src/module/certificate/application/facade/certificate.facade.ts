import { Injectable } from '@nestjs/common';

import { Pagination } from '@/common/domain/pagination';
import { CertificateService } from '@/module/certificate/application/service/certificate.service';
import { CertificateRoundService } from '@/module/certificate/application/service/certificate-round.service';

import { Certificate } from '@/module/certificate/domain/certificate';
import { CertificateRound } from '@/module/certificate/domain/certificate-round';

import { FindAllCertificateReq } from '@/module/certificate/infra/rest/dto/request';

@Injectable()
export class CertificateFacade {
  constructor(
    private readonly certificateService: CertificateService,
    private readonly certificateRoundService: CertificateRoundService,
  ) {}

  async findAll(
    req: FindAllCertificateReq,
  ): Promise<Pagination<Certificate[]>> {
    const count = await this.certificateService.countAll();

    return Pagination.from<Certificate[]>({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.certificateService
        .findAll({ name: req?.query ?? undefined }, req.skip, req.take)
        .then((res) => res.map((it) => Certificate.fromPrisma(it))),
    });
  }

  async findRoundByCertificateId(
    certificateId: string,
  ): Promise<CertificateRound[]> {
    return this.certificateRoundService
      .findByCertificateId({ certificateId })
      .then((rounds) =>
        rounds.map((round) => CertificateRound.fromPrisma(round)),
      );
  }
}
