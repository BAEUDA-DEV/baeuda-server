import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class FindAllQuizReq {
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
