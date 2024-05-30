import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface ICertificateRes {
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
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  round: number;

  @ApiProperty()
  @IsDate()
  registrationStartDate: Date;

  @ApiProperty()
  @IsDate()
  registrationEndDate: Date;

  @ApiProperty()
  @IsDate()
  testStartDate: Date;

  @ApiProperty()
  @IsDate()
  testEndDate: Date;

  @ApiProperty()
  @IsDate()
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

  static from(props: ICertificateRes): CertificateRes {
    return new CertificateRes(
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
}
