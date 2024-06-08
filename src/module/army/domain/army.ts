import {
  ArmySpeciality as PrismaArmy,
  ArmySpecialityCertificate as PrismaArmyCertificate,
} from '@prisma/client';

import { ArmyCertificate } from '@/module/army/domain/amry-certificate';

import { ArmyRes } from '@/module/army/infra/rest/dto/response';

export interface ArmyType extends PrismaArmy {
  armySpecialityCertificates?: PrismaArmyCertificate[];
}

interface IArmy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  armySpecialityCertificates: ArmyCertificate[] | null;
}

export class Army implements IArmy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  armySpecialityCertificates: ArmyCertificate[] | null;

  constructor(
    id: string,
    createdAt: Date,
    updateAt: Date,
    name: string,
    description: string,
    armySpecialityCertificates: ArmyCertificate[] | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updateAt;
    this.name = name;
    this.description = description;
    this.armySpecialityCertificates = armySpecialityCertificates;
  }

  public static fromPrisma(props: ArmyType): Army {
    return new Army(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.description,
      (props.armySpecialityCertificates ?? []).map((armyCertificate) =>
        ArmyCertificate.fromPrisma(armyCertificate),
      ),
    );
  }

  public toRes(): ArmyRes {
    return ArmyRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      certificates: (this.armySpecialityCertificates ?? []).map(
        (armyCertificate) => armyCertificate.toRes(),
      ),
    });
  }
}
