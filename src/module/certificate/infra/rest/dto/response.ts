import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import dayjs from 'dayjs';

interface ICertificateRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

interface ICertificateRoundRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: CertificateRes | null;
  year: number;
  step: number;
  registrationStart: Date;
  registrationEnd: Date;
  testStart: Date;
  testEnd: Date;
  resultAnnouncement: Date;
  remainDay: number;
}

interface ICertificateUserRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificateRound: CertificateRoundRes | null;
}

export class CertificateRes implements ICertificateRes {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(id: string, createdAt: Date, updatedAt: Date, name: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
  }

  static from(props: ICertificateRes): CertificateRes {
    return new CertificateRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
    );
  }
}

export class CertificateRoundRes implements ICertificateRoundRes {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ type: CertificateRes, nullable: true })
  @Type(() => CertificateRes)
  certificate: CertificateRes | null;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsNumber()
  step: number;

  @ApiProperty()
  @IsDate()
  registrationStart: Date;

  @ApiProperty()
  @IsDate()
  registrationEnd: Date;

  @ApiProperty()
  @IsDate()
  testStart: Date;

  @ApiProperty()
  @IsDate()
  testEnd: Date;

  @ApiProperty()
  @IsDate()
  resultAnnouncement: Date;

  @ApiProperty()
  @IsNumber()
  remainDay: number;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificate: CertificateRes | null,
    year: number,
    step: number,
    registrationStart: Date,
    registrationEnd: Date,
    testStart: Date,
    testEnd: Date,
    resultAnnouncement: Date,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.certificate = certificate;
    this.year = year;
    this.step = step;
    this.registrationStart = registrationStart;
    this.registrationEnd = registrationEnd;
    this.testStart = testStart;
    this.testEnd = testEnd;
    this.resultAnnouncement = resultAnnouncement;
    this.remainDay = dayjs(testStart).diff(new Date(), 'd');
  }

  public static from(props: ICertificateRoundRes): CertificateRoundRes {
    return new CertificateRoundRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.certificate,
      props.year,
      props.step,
      props.registrationStart,
      props.registrationEnd,
      props.testStart,
      props.testEnd,
      props.resultAnnouncement,
    );
  }
}

export class CertificateUserRes implements ICertificateUserRes {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ type: CertificateRoundRes, nullable: true })
  @Type(() => CertificateRoundRes)
  certificateRound: CertificateRoundRes | null;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificateRound: CertificateRoundRes | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.certificateRound = certificateRound;
  }

  public static from(props: ICertificateUserRes): CertificateUserRes {
    return new CertificateUserRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.certificateRound,
    );
  }
}
