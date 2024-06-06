// import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';

// import { PrismaService } from '@/common/injectable/prisma.service';
// import { ArmyCertificateType } from '@/module/army/domain/amry-certificate';

// @Injectable()
// export class ArmyCertificateService {
//   constructor(private readonly prisma: PrismaService) {}

//   async findAll(
//     props: {
//       where?: Prisma.ArmySpecialityCertificateWhereInput;
//       include?: Prisma.ArmySpecialityCertificateInclude;
//     },
//     tx: Prisma.TransactionClient = this.prisma,
//   ): Promise<ArmyCertificateType[]> {
//     return tx.armySpecialityCertificate.findMany(props);
//   }
// }
