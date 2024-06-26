import { Injectable } from '@nestjs/common';

import { ArmyService } from '@/module/army/application/service/army.service';

import { Pagination } from '@/common/domain/pagination';
import { Army } from '@/module/army/domain/army';

import {
  FindAllArmyCertificateReq,
  FindAllArmyReq,
} from '@/module/army/infra/rest/dto/request';

@Injectable()
export class ArmyFacade {
  constructor(private readonly armyService: ArmyService) {}

  async findAll(req: FindAllArmyReq): Promise<Pagination<Army[]>> {
    const count = await this.armyService.countAll({
      where: { name: { contains: req?.query?.trim() ?? '' } },
    });

    return Pagination.from<Army[]>({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.armyService
        .findAll({
          where: { name: { contains: req?.query?.trim() ?? '' } },
          include: {
            armySpecialityCertificates: { include: { certificate: true } },
          },
          skip: req.skip,
          take: req.take,
        })
        .then((res) => res.map((it) => Army.fromPrisma(it))),
    });
  }

  async findByCertificateId(
    certificateId: string,
    req: FindAllArmyCertificateReq,
  ): Promise<Pagination<Army[]>> {
    const count = await this.armyService.countAll({
      where: {
        armySpecialityCertificates: {
          some: {
            certificateId,
          },
        },
        name: { contains: req?.query?.trim() ?? '' },
      },
    });

    return Pagination.from<Army[]>({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.armyService
        .findAll({
          where: {
            armySpecialityCertificates: {
              some: {
                certificateId,
              },
            },
            name: { contains: req?.query?.trim() ?? '' },
          },
          include: {
            armySpecialityCertificates: { include: { certificate: true } },
          },
          skip: req.skip,
          take: req.take,
        })
        .then((res) => res.map((it) => Army.fromPrisma(it))),
    });
  }
}
