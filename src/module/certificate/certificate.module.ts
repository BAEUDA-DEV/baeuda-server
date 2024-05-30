import { Module } from '@nestjs/common';

import { CertificateFacade } from '@/module/certificate/application/facade/certificate.facade';
import { CertificateService } from '@/module/certificate/application/service/certificate.service';
import { CertificateController } from '@/module/certificate/infra/rest/certificate.controller';

@Module({
  controllers: [CertificateController],
  providers: [CertificateFacade, CertificateService],
})
export class CertificateModule {}
