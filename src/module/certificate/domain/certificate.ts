import { Certificate as PrismaCertificate, Test } from '@prisma/client';

import { CertificateRes } from '@/module/certificate/infra/rest/dto/response';

interface ICertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;
  round: number;
  registrationStartDate: Date;
  registrationEndDate: Date;
  testStartDate: Date;
  testEndDate: Date;
  passDate: Date;
}

export class Certificate implements ICertificate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;
  round: number;
  registrationStartDate: Date;
  registrationEndDate: Date;
  testStartDate: Date;
  testEndDate: Date;
  passDate: Date;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    code: string,
    name: string,
    round: number,
    registrationStartDate: Date,
    registrationEndDate: Date,
    testStartDate: Date,
    testEndDate: Date,
    passDate: Date,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.code = code;
    this.name = name;
    this.round = round;
    this.registrationStartDate = registrationStartDate;
    this.registrationEndDate = registrationEndDate;
    this.testStartDate = testStartDate;
    this.testEndDate = testEndDate;
    this.passDate = passDate;
  }

  static fromPrisma(props: PrismaCertificate & { test?: Test }): Certificate {
    return new Certificate(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.code,
      props.name,
      props.round,
      props.registrationStartDate,
      props.registrationEndDate,
      props.testStartDate,
      props.testEndDate,
      props.passDate,
    );
  }

  public toRes(): CertificateRes {
    return CertificateRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      code: this.code,
      name: this.name,
      round: this.round,
      registrationStartDate: this.registrationStartDate,
      registrationEndDate: this.registrationEndDate,
      testStartDate: this.testStartDate,
      testEndDate: this.testEndDate,
      passDate: this.passDate,
    });
  }
}
