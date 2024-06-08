import {
  Quiz as PrismaQuiz,
  User as PrismaUser,
  Comment as PrismaComment,
} from '@prisma/client';

import { Quiz } from '@/module/quiz/domain/quiz';
import { User } from '@/module/user/domain/user';
import { CommentRes } from '@/module/comment/infra/rest/dto/response';

export interface CommentType extends PrismaComment {
  writer?: PrismaUser;
  quiz?: PrismaQuiz;
}

export class Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  writer: User | null;
  writerId: string;
  quiz: Quiz | null;
  quizId: string;
  content: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    writer: User | null,
    writerId: string,
    quiz: Quiz | null,
    quizId: string,
    content: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.writer = writer;
    this.writerId = writerId;
    this.quiz = quiz;
    this.quizId = quizId;
    this.content = content;
  }

  public static fromPrisma(props: CommentType): Comment {
    return new Comment(
      props.id,
      props.createdAt,
      props.updatedAt,
      props?.writer ? User.fromPrisma(props.writer) : null,
      props.writerId,
      props?.quiz ? Quiz.fromPrisma(props.quiz) : null,
      props.quizId,
      props.content,
    );
  }

  public toRes(): CommentRes {
    return CommentRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      writer: this.writer?.toRes() ?? null,
      quiz: this.quiz?.toRes() ?? null,
      content: this.content,
    });
  }
}
