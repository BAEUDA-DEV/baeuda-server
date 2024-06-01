import {
  CertificateRound as PrismaCertificateRound,
  CertificateUser as PrismaCertificateUser,
  User as PrismaUser,
} from '@prisma/client';

import { User } from '@/module/user/domain/user';
import { CertificateRound } from '@/module/certificate/domain/certificate-round';

import {
  CertificateRoundRes,
  CertificateUserRes,
} from '@/module/certificate/infra/rest/dto/response';
import { UserRes } from '@/module/user/infra/rest/dto/response';

interface ICertificateUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificateRound: CertificateRound;
  certificateRoundId: string;
  user: User;
  userId: string;
}

export class CertificateUser implements ICertificateUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificateRound: CertificateRound;
  certificateRoundId: string;
  user: User;
  userId: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificate: CertificateRound,
    certificateId: string,
    user: User,
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

  public static fromPrisma(
    props: PrismaCertificateUser & {
      certificateRound: PrismaCertificateRound;
      user: PrismaUser;
    },
  ): CertificateUser {
    return new CertificateUser(
      props.id,
      props.createdAt,
      props.updatedAt,
      CertificateRound.fromPrisma(props.certificateRound),
      props.certificateRoundId,
      User.fromPrisma(props.user),
      props.userId,
    );
  }

  public toRes(): CertificateUserRes {
    return CertificateUserRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      certificateRound: CertificateRoundRes.from(this.certificateRound),
      user: UserRes.from(this.user),
    });
  }
}
