import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUserType } from '@/module/auth/infra/rest/guard';
import { AuthUser } from '@/module/auth/infra/rest/guard/auth-user.decorator';
import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';

import { PaginationRes } from '@/common/dto/pagination.response';
import { CertificateFacade } from '@/module/certificate/application/facade/certificate.facade';
import {
  FindAllCertificateReq,
  FindAllRegisteredCertificateReq,
} from '@/module/certificate/infra/rest/dto/request';
import {
  CertificateRes,
  CertificateRoundRes,
  CertificateUserRes,
} from '@/module/certificate/infra/rest/dto/response';

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

  @Get('/:certificateId/round/list')
  @ApiOperation({ summary: '자격증 일정 조회' })
  @ApiParam({ name: 'certificateId', description: '자격증 ID' })
  @ApiResponse({ type: [CertificateRoundRes] })
  async findRoundsByCertificateId(
    @Param('certificateId') certificateId: string,
  ): Promise<CertificateRoundRes[]> {
    return this.certificateFacade
      .findRoundByCertificateId(certificateId)
      .then((rounds) => rounds.map((round) => round.toRes()));
  }

  @Get('/registered')
  @ApiOperation({ summary: '관심 등록된 자격증 목록 조회' })
  @ApiResponse({ type: PaginationRes<CertificateUserRes[]> })
  async findRegisteredCertificate(
    @AuthUser() { userId }: AuthUserType,
    @Query() req: FindAllRegisteredCertificateReq,
  ): Promise<PaginationRes<CertificateUserRes[]>> {
    return this.certificateFacade
      .findCertificateUser(userId, req)
      .then((it) =>
        it.toRes<CertificateUserRes[]>((data) =>
          data.map((child) => child.toRes()),
        ),
      );
  }

  @Post('/:certificateRoundId/register')
  @ApiOperation({ summary: '관심 자격증 등록' })
  @ApiParam({ name: 'certificateRoundId', description: '자격증 회차 ID' })
  @ApiResponse({ type: CertificateUserRes })
  async registerCertificate(
    @AuthUser() { userId }: AuthUserType,
    @Param('certificateRoundId') certificateRoundId: string,
  ): Promise<CertificateUserRes> {
    return this.certificateFacade
      .register(userId, certificateRoundId)
      .then((it) => it.toRes());
  }
}
