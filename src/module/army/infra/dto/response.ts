import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { CertificateRes } from '@/module/certificate/infra/dto/response';

interface IArmyRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  certificates: ArmyCertificateRes[] | null;
}

interface IArmyCertificateRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: CertificateRes | null;
}

export class ArmyRes implements IArmyRes {
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

  @ApiProperty({ nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArmyCertificateRes)
  certificates: ArmyCertificateRes[] | null;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    certificates: ArmyCertificateRes[] | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.certificates = certificates;
  }

  static from(props: IArmyRes): ArmyRes {
    return new ArmyRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.certificates,
    );
  }
}

export class ArmyCertificateRes implements IArmyCertificateRes {
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
  certificate: CertificateRes | null;

  constructor(
    id: string,
    createdAt: Date,
    updateAt: Date,
    certificate: CertificateRes | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updateAt;
    this.certificate = certificate;
  }

  public static from(props: IArmyCertificateRes): ArmyCertificateRes {
    return new ArmyCertificateRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.certificate,
    );
  }
}
