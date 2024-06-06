import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { ArmyType } from '@/module/army/domain/army';

@Injectable()
export class ArmyService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    props: {
      where?: Prisma.ArmySpecialityWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.armySpeciality.count(props);
  }

  // find all army speciality
  async findAll(
    props: {
      where?: Prisma.ArmySpecialityWhereInput;
      include?: Prisma.ArmySpecialityInclude;
      skip?: number;
      take?: number;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<ArmyType[]> {
    return tx.armySpeciality.findMany(props);
  }
}
