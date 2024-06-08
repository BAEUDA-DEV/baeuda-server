import { Module } from '@nestjs/common';

import { ArmyFacade } from '@/module/army/application/facade/army.facade';
import { ArmyController } from '@/module/army/infra/rest/army.controller';
import { ArmyService } from '@/module/army/application/service/army.service';

@Module({
  controllers: [ArmyController],
  providers: [ArmyFacade, ArmyService],
})
export class ArmyModule {}
