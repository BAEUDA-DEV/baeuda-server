import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindAllQuizReq {
  @ApiProperty()
  @IsString()
  certificateId: string;

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

export class FindAllQuizLogsReq {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certificateId: string;

  @ApiProperty({ required: false })
  @IsOptional()
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

export class SaveQuizLogReq {
  @ApiProperty({ type: Number, default: 0 })
  @IsString()
  answerId: string;
}
