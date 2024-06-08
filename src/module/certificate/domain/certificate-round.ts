import {
  Certificate as PrismaCertificate,
  CertificateRound as PrismaCertificateRound,
} from '@prisma/client';

import { Certificate } from '@/module/certificate/domain/certificate';

import {
  CertificateRes,
  CertificateRoundRes,
} from '@/module/certificate/infra/rest/dto/response';

export interface CertificateRoundType extends PrismaCertificateRound {
  certificate?: PrismaCertificate;
}

interface ICertificateRound {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: Certificate | null;
  certificateId: string;
  year: number;
  step: number;
  registrationStart: Date;
  registrationEnd: Date;
  testStart: Date;
  testEnd: Date;
  resultAnnouncement: Date;
  userCount: number;
}

export class CertificateRound implements ICertificateRound {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: Certificate | null;
  certificateId: string;
  year: number;
  step: number;
  registrationStart: Date;
  registrationEnd: Date;
  testStart: Date;
  testEnd: Date;
  resultAnnouncement: Date;
  userCount: number;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificate: Certificate | null,
    certificateId: string,
    year: number,
    step: number,
    registrationStart: Date,
    registrationEnd: Date,
    testStart: Date,
    testEnd: Date,
    resultAnnouncement: Date,
    userCount: number,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.certificate = certificate;
    this.certificateId = certificateId;
    this.year = year;
    this.step = step;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.testStart = testStart;
    this.testEnd = testEnd;
    this.resultAnnouncement = resultAnnouncement;
    this.userCount = userCount;
  }

  public static fromPrisma(props: CertificateRoundType): CertificateRound {
    return new CertificateRound(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.certificate ? Certificate.fromPrisma(props.certificate) : null,
      props.certificateId,
      props.year,
      props.step,
      props.registrationStart,
      props.registrationEnd,
      props.testStart,
      props.testEnd,
      props.resultAnnouncement,
      props.userCount,
    );
  }

  public toRes(): CertificateRoundRes {
    return CertificateRoundRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      certificate: this.certificate
        ? CertificateRes.from(this.certificate)
        : null,
      year: this.year,
      step: this.step,
      registrationStart: this.registrationStart,
      registrationEnd: this.registrationEnd,
      testStart: this.testStart,
      testEnd: this.testEnd,
      resultAnnouncement: this.resultAnnouncement,
      userCount: this.userCount,
    });
  }
}
