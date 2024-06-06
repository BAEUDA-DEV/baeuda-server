import { Module } from '@nestjs/common';

import { CertificateController } from '@/module/certificate/infra/certificate.controller';
import { CertificateFacade } from '@/module/certificate/application/facade/certificate.facade';
import { CertificateService } from '@/module/certificate/application/service/certificate.service';
import { CertificateRoundService } from '@/module/certificate/application/service/certificate-round.service';
import { CertificateUserService } from '@/module/certificate/application/service/certificate-user.service';

@Module({
  controllers: [CertificateController],
  providers: [
    CertificateFacade,
    CertificateService,
    CertificateRoundService,
    CertificateUserService,
  ],
})
export class CertificateModule {}
