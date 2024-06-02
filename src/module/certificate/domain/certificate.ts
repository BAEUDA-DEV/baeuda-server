import {
  Certificate as PrismaCertificate,
  CertificateRound as PrismaCertificateRound,
  Quiz as PrismaQuiz,
} from '@prisma/client';

import { CertificateRes } from '@/module/certificate/infra/rest/dto/response';

export interface CertificateType extends PrismaCertificate {
  rounds?: PrismaCertificateRound[];
  quiz?: PrismaQuiz[];
}

interface ICertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;
}

export class Certificate implements ICertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    code: string,
    name: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.code = code;
    this.name = name;
  }

  public static fromPrisma(props: CertificateType): Certificate {
    return new Certificate(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.code,
      props.name,
    );
  }

  public toRes(): CertificateRes {
    return CertificateRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
    });
  }
}
