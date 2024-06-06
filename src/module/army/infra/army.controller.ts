import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';
import { ArmyFacade } from '@/module/army/application/facade/army.facade';
import { PaginationRes } from '@/common/dto/pagination.response';
import {
  //   ArmyCertificateRes,
  ArmyRes,
} from '@/module/army/infra/dto/response';
import { FindAllArmyReq } from '@/module/army/infra/dto/request';

@Controller('/api/army')
@ApiTags('Army')
@UseAuth()
export class ArmyController {
  constructor(private readonly armyFacade: ArmyFacade) {}

  @Get('/list')
  @ApiOperation({ summary: '특기병 목록 조회' })
  @ApiResponse({ type: PaginationRes<ArmyRes> })
  async findAll(
    @Query() req: FindAllArmyReq,
  ): Promise<PaginationRes<ArmyRes[]>> {
    return this.armyFacade
      .findAll(req)
      .then((it) =>
        it.toRes<ArmyRes[]>((data) => data.map((child) => child.toRes())),
      );
  }
}
