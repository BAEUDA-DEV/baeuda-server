import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CommentListReq {
  @ApiProperty()
  @IsString()
  quizId: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  skip: number;

  @ApiProperty({ default: 10 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  take: number;
}

export class CreateCommentReq {
  @ApiProperty()
  @IsString()
  quizId: string;

  @ApiProperty()
  @IsString()
  content: string;
}

export class UpdateCommentReq {
  @ApiProperty()
  @IsString()
  content: string;
}
