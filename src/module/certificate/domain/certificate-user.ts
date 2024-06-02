import {
  CertificateRound as PrismaCertificateRound,
  CertificateUser as PrismaCertificateUser,
  User as PrismaUser,
} from '@prisma/client';

import { CertificateRound } from '@/module/certificate/domain/certificate-round';
import { User } from '@/module/user/domain/user';

import {
  CertificateRoundRes,
  CertificateUserRes,
} from '@/module/certificate/infra/rest/dto/response';

export interface CertificateUserType extends PrismaCertificateUser {
  certificateRound?: PrismaCertificateRound;
  user?: PrismaUser;
}

interface ICertificateUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificateRound: CertificateRound | null;
  certificateRoundId: string;
  user: User | null;
  userId: string;
}

export class CertificateUser implements ICertificateUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificateRound: CertificateRound | null;
  certificateRoundId: string;
  user: User | null;
  userId: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificate: CertificateRound | null,
    certificateId: string,
    user: User | null,
    userId: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.certificateRound = certificate;
    this.certificateRoundId = certificateId;
    this.user = user;
    this.userId = userId;
  }

  public static fromPrisma(props: CertificateUserType): CertificateUser {
    return new CertificateUser(
      props.id,
      props.createdAt,
      props.updatedAt,
      props?.certificateRound
        ? CertificateRound.fromPrisma(props.certificateRound)
        : null,
      props.certificateRoundId,
      props?.user ? User.fromPrisma(props.user) : null,
      props.userId,
    );
  }

  public toRes(): CertificateUserRes {
    return CertificateUserRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      certificateRound: this.certificateRound
        ? CertificateRoundRes.from(this.certificateRound)
        : null,
    });
  }
}
