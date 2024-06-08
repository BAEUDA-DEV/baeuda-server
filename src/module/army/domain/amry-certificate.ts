import { ArmySpecialityCertificate as PrismaArmyCertificate } from '@prisma/client';

import {
  Certificate,
  CertificateType,
} from '@/module/certificate/domain/certificate';
import { Army, ArmyType } from '@/module/army/domain/army';
import { ArmyCertificateRes } from '@/module/army/infra/rest/dto/response';

export interface ArmyCertificateType extends PrismaArmyCertificate {
  armySpeciality?: ArmyType;
  certificate?: CertificateType;
}

interface IArmyCertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  armySpeciality: Army | null;
  armySpecialityId: string;
  certificate: Certificate | null;
  certificateId: string;
}

export class ArmyCertificate implements IArmyCertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  armySpeciality: Army | null;
  armySpecialityId: string;
  certificate: Certificate | null;
  certificateId: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    armySpeciality: Army | null,
    armySpecialityId: string,
    certificate: Certificate | null,
    certificateId: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.armySpeciality = armySpeciality;
    this.armySpecialityId = armySpecialityId;
    this.certificate = certificate;
    this.certificateId = certificateId;
  }

  public static fromPrisma(props: ArmyCertificateType): ArmyCertificate {
    return new ArmyCertificate(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.armySpeciality ? Army.fromPrisma(props.armySpeciality) : null,
      props.armySpecialityId,
      props.certificate ? Certificate.fromPrisma(props.certificate) : null,
      props.certificateId,
    );
  }

  public toRes(): ArmyCertificateRes {
    return ArmyCertificateRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      certificate: this.certificate?.toRes() ?? null,
    });
  }
}
