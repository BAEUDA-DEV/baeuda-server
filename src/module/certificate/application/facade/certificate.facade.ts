import { BadRequestException, Injectable } from '@nestjs/common';

import { CertificateService } from '@/module/certificate/application/service/certificate.service';
import { CertificateRoundService } from '@/module/certificate/application/service/certificate-round.service';
import { CertificateUserService } from '@/module/certificate/application/service/certificate-user.service';

import { Pagination } from '@/common/domain/pagination';
import { Certificate } from '@/module/certificate/domain/certificate';
import { CertificateRound } from '@/module/certificate/domain/certificate-round';
import { CertificateUser } from '@/module/certificate/domain/certificate-user';

import {
  FindAllCertificateReq,
  FindAllRegisteredCertificateReq,
} from '@/module/certificate/infra/rest/dto/request';

@Injectable()
export class CertificateFacade {
  constructor(
    private readonly certificateService: CertificateService,
    private readonly certificateRoundService: CertificateRoundService,
    private readonly certificateUserService: CertificateUserService,
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
        .findAll(
          { name: { contains: req?.query?.trim() ?? '' } },
          req.skip,
          req.take,
        )
        .then((res) => res.map((it) => Certificate.fromPrisma(it))),
    });
  }

  async findRoundByCertificateId(
    certificateId: string,
  ): Promise<CertificateRound[]> {
    return this.certificateRoundService
      .findAll({ certificateId })
      .then((rounds) =>
        rounds.map((round) => CertificateRound.fromPrisma(round)),
      );
  }

  async findCertificateUser(
    userId: string,
    req: FindAllRegisteredCertificateReq,
  ): Promise<Pagination<CertificateUser[]>> {
    const count = await this.certificateUserService.countAll({
      userId,
    });

    return Pagination.from({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.certificateUserService
        .findAll({ userId })
        .then((certificateUsers) =>
          certificateUsers.map((certificateUser) =>
            CertificateUser.fromPrisma(certificateUser),
          ),
        ),
    });
  }

  async register(
    userId: string,
    certificateRoundId: string,
  ): Promise<CertificateUser> {
    if (
      await this.certificateUserService.findOne({ userId, certificateRoundId })
    ) {
      throw new BadRequestException('등록되어 있는 자격증입니다.');
    }

    return this.certificateUserService
      .create({
        userId,
        certificateRoundId,
      })
      .then((certificateUser) => CertificateUser.fromPrisma(certificateUser));
  }
}
