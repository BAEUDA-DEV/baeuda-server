import { Module } from '@nestjs/common';

import { ArmyFacade } from '@/module/army/application/facade/army.facade';
import { ArmyController } from '@/module/army/infra/army.controller';
import { ArmyService } from '@/module/army/application/service/army.service';
// import { ArmyCertificateService } from '@/module/army/application/service/army-certificate.service';

@Module({
  controllers: [ArmyController],
  providers: [ArmyFacade, ArmyService],
})
export class ArmyModule {}
