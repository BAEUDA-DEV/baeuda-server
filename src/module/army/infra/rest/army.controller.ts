import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ApiPaginationResponse,
  PaginationRes,
} from '@/common/dto/pagination.response';
import { ArmyFacade } from '@/module/army/application/facade/army.facade';
import {
  FindAllArmyCertificateReq,
  FindAllArmyReq,
} from '@/module/army/infra/rest/dto/request';
import { ArmyRes } from '@/module/army/infra/rest/dto/response';
import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';

@Controller('/api/army')
@ApiTags('Army')
@UseAuth()
export class ArmyController {
  constructor(private readonly armyFacade: ArmyFacade) {}

  @Get('/list')
  @ApiOperation({ summary: '특기병 목록 조회' })
  @ApiPaginationResponse(ArmyRes)
  async findAll(
    @Query() req: FindAllArmyReq,
  ): Promise<PaginationRes<ArmyRes[]>> {
    return this.armyFacade
      .findAll(req)
      .then((it) =>
        it.toRes<ArmyRes[]>((data) => data.map((child) => child.toRes())),
      );
  }

  @Get('/list/certificate/:certificateId')
  @ApiOperation({ summary: '자격증별 특기병 목록 조회' })
  @ApiPaginationResponse(ArmyRes)
  async findByCertificateId(
    @Param('certificateId') certificateId: string,
    @Query() req: FindAllArmyCertificateReq,
  ): Promise<PaginationRes<ArmyRes[]>> {
    return this.armyFacade
      .findByCertificateId(certificateId, req)
      .then((it) => it.toRes((data) => data.map((child) => child.toRes())));
  }
}
