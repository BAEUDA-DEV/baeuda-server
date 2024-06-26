import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CertificateRes } from '@/module/certificate/infra/rest/dto/response';
import { UserRes } from '@/module/user/infra/rest/dto/response';

interface IAnswerRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  isCorrect: boolean;
}

interface IQuizRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: CertificateRes | null;
  question: string;
  answers: AnswerRes[];
}

interface IQuizLogRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserRes | null;
  answer: AnswerRes | null;
}

export class AnswerRes implements IAnswerRes {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    content: string,
    isCorrect: boolean,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.content = content;
    this.isCorrect = isCorrect;
  }

  public static from(props: IAnswerRes): AnswerRes {
    return new AnswerRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.content,
      props.isCorrect,
    );
  }
}

export class QuizRes implements IQuizRes {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ nullable: true, type: CertificateRes })
  certificate: CertificateRes | null;

  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({ type: [AnswerRes] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerRes)
  answers: AnswerRes[];

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificate: CertificateRes | null,
    question: string,
    answers: AnswerRes[],
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.certificate = certificate;
    this.question = question;
    this.answers = answers;
  }

  public static from(props: IQuizRes): QuizRes {
    return new QuizRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.certificate,
      props.question,
      props.answers,
    );
  }
}

export class QuizLogRes implements IQuizLogRes {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ nullable: true, type: UserRes })
  @Type(() => UserRes)
  user: UserRes | null;

  @ApiProperty({ nullable: true, type: AnswerRes })
  @Type(() => AnswerRes)
  answer: AnswerRes | null;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    user: UserRes | null,
    answer: AnswerRes | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.answer = answer;
  }

  public static from(props: IQuizLogRes): QuizLogRes {
    return new QuizLogRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.user,
      props.answer,
    );
  }
}
