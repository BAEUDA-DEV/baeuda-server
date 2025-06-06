import { ArmySpeciality as PrismaArmy } from '@prisma/client';

import {
  ArmyCertificate,
  ArmyCertificateType,
} from '@/module/army/domain/amry-certificate';

import { ArmyRes } from '@/module/army/infra/rest/dto/response';

export interface ArmyType extends PrismaArmy {
  armySpecialityCertificates?: ArmyCertificateType[];
}

interface IArmy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  armySpecialityCertificates: ArmyCertificate[];
}

export class Army implements IArmy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  armySpecialityCertificates: ArmyCertificate[];

  constructor(
    id: string,
    createdAt: Date,
    updateAt: Date,
    name: string,
    description: string,
    armySpecialityCertificates: ArmyCertificate[],
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
      (props?.armySpecialityCertificates ?? []).map((armyCertificate) =>
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
      certificates: (this.armySpecialityCertificates ?? [])
        .map((armyCertificate) => armyCertificate.certificate)
        .filter((certificate) => !!certificate)
        .map((certificate) => certificate.toRes()),
    });
  }
}
