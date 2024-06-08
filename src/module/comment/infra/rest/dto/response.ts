import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { QuizRes } from '@/module/quiz/infra/rest/dto/response';
import { UserRes } from '@/module/user/infra/rest/dto/response';

interface ICommentRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  writer: UserRes | null;
  quiz: QuizRes | null;
  content: string;
}

export class CommentRes implements ICommentRes {
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
  @Type(() => UserRes)
  @IsOptional()
  writer: UserRes | null;

  @ApiProperty()
  @Type(() => QuizRes)
  @IsOptional()
  quiz: QuizRes | null;

  @ApiProperty()
  @IsString()
  content: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    writer: UserRes | null,
    quiz: QuizRes | null,
    content: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.writer = writer;
    this.quiz = quiz;
    this.content = content;
  }

  public static from(props: ICommentRes): CommentRes {
    return new CommentRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.writer,
      props.quiz,
      props.content,
    );
  }
}
