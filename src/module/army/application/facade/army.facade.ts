import { Injectable } from '@nestjs/common';

import { ArmyService } from '@/module/army/application/service/army.service';

import { Pagination } from '@/common/domain/pagination';
import { Army } from '@/module/army/domain/army';

import { FindAllArmyReq } from '@/module/army/infra/rest/dto/request';

@Injectable()
export class ArmyFacade {
  constructor(private readonly armyService: ArmyService) {}

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
}
