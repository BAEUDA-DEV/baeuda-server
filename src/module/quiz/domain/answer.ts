import { AnswerRes } from '@/module/quiz/infra/dto/response';
import { Answer as PrismaAnswer } from '@prisma/client';

interface IAnswer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quizId: string;
  content: string;
  isCorrect: boolean;
}

export class Answer implements IAnswer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quizId: string;
  content: string;
  isCorrect: boolean;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    quizId: string,
    content: string,
    isCorrect: boolean,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.quizId = quizId;
    this.content = content;
    this.isCorrect = isCorrect;
  }

  public static fromPrisma(props: PrismaAnswer): Answer {
    return new Answer(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.quizId,
      props.content,
      props.isCorrect,
    );
  }

  public toRes(): AnswerRes {
    return AnswerRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      content: this.content,
      isCorrect: this.isCorrect,
    });
  }
}
