import { Injectable } from '@nestjs/common';

import { Pagination } from '@/common/domain/pagination';

import { ArmyService } from '@/module/army/application/service/army.service';
// import { ArmyCertificateService } from '@/module/army/application/service/army-certificate.service';

import { Army } from '@/module/army/domain/army';
// import { ArmyCertificate } from '@/module/army/domain/amry-certificate';
import { FindAllArmyReq } from '@/module/army/infra/dto/request';

@Injectable()
export class ArmyFacade {
  constructor(
    private readonly armyService: ArmyService,
    // private readonly armyCertificateService: ArmyCertificateService,
  ) {}

  // necess method
  // findAll : return all
  async findAll(req: FindAllArmyReq): Promise<Pagination<Army[]>> {
    const count = await this.armyService.countAll({});

    return Pagination.from<Army[]>({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.armyService
        .findAll({
          where: { name: { contains: req?.query?.trim() ?? '' } },
          skip: req.skip,
          take: req.take,
        })
        .then((res) => res.map((it) => Army.fromPrisma(it))),
    });
  }

  // async findArmyCertificateByArmyId(
  //   armySpecialityId: string,
  // ): Promise<ArmyCertificate[]> {
  //   return this.armyCertificateService
  //     .findAll({
  //       where: { armySpecialityId },
  //       include: { armySpeciality: true },
  //     })
  //     .then((armyCertificates) =>
  //       armyCertificates.map((armyCertificate) =>
  //         ArmyCertificate.fromPrisma(armyCertificate),
  //       ),
  //     );
  // }
}
