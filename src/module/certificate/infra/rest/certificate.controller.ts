import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';

import { PaginationRes } from '@/common/dto/pagination.response';
import { FindAllCertificateReq } from '@/module/certificate/infra/rest/dto/request';
import { CertificateRes } from '@/module/certificate/infra/rest/dto/response';

import { CertificateFacade } from '@/module/certificate/application/facade/certificate.facade';

@Controller('/api/certificate')
@ApiTags('Certificate')
@UseAuth()
export class CertificateController {
  constructor(private readonly certificateFacade: CertificateFacade) {}

  @Get('/list')
  @ApiOperation({ summary: '자격증 목록 조회' })
  @ApiResponse({ type: PaginationRes<CertificateRes[]> })
  async findAll(
    @Query() req: FindAllCertificateReq,
  ): Promise<PaginationRes<CertificateRes[]>> {
    return this.certificateFacade
      .findAll(req)
      .then((it) =>
        it.toRes<CertificateRes[]>((data) =>
          data.map((child) => child.toRes()),
        ),
      );
  }
}
