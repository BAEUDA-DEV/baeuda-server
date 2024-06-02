import {
  Answer as PrismaAnswer,
  Certificate as PrismaCertificate,
  Quiz as PrismaQuiz,
} from '@prisma/client';

import { Certificate } from '@/module/certificate/domain/certificate';
import { Answer } from '@/module/quiz/domain/answer';
import { QuizRes } from '@/module/quiz/infra/dto/response';

export interface QuizType extends PrismaQuiz {
  certificate?: PrismaCertificate;
  answers?: PrismaAnswer[];
}

interface IQuiz {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: Certificate | null;
  certificateId: string;
  question: string;
  answers: Answer[];
}

export class Quiz implements IQuiz {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  certificate: Certificate | null;
  certificateId: string;
  question: string;
  answers: Answer[];

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    certificate: Certificate | null,
    certificateId: string,
    question: string,
    answers: Answer[],
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.certificate = certificate;
    this.certificateId = certificateId;
    this.question = question;
    this.answers = answers;
  }

  public static fromPrisma(props: QuizType): Quiz {
    return new Quiz(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.certificate ? Certificate.fromPrisma(props.certificate) : null,
      props.certificateId,
      props.question,
      (props?.answers ?? []).map((answer) => Answer.fromPrisma(answer)),
    );
  }

  public toRes(): QuizRes {
    return QuizRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      certificate: this.certificate?.toRes() ?? null,
      question: this.question,
      answers: this.answers.map((answer) => answer.toRes()),
    });
  }
}
