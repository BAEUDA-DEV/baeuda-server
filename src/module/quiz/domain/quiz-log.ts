import {
  Answer as PrismaAnswer,
  QuizLog as PrismaQuizLog,
  User as PrismaUser,
} from '@prisma/client';

import { Answer } from '@/module/quiz/domain/answer';
import { AnswerRes, QuizLogRes } from '@/module/quiz/infra/dto/response';
import { User } from '@/module/user/domain/user';
import { UserRes } from '@/module/user/infra/rest/dto/response';

export interface QuizLogType extends PrismaQuizLog {
  user?: PrismaUser;
  answer?: PrismaAnswer;
}

interface IQuizLog {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: User | null;
  answer: Answer | null;
}

export class QuizLog implements IQuizLog {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: User | null;
  answer: Answer | null;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    user: User | null,
    answer: Answer | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.answer = answer;
  }

  public static fromPrisma(props: QuizLogType): QuizLog {
    return new QuizLog(
      props.id,
      props.createdAt,
      props.updatedAt,
      props?.user ? User.fromPrisma(props.user) : null,
      props?.answer ? Answer.fromPrisma(props.answer) : null,
    );
  }

  public toRes(): QuizLogRes {
    return QuizLogRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this?.user ? UserRes.from(this.user) : null,
      answer: this?.answer ? AnswerRes.from(this.answer) : null,
    });
  }
}
