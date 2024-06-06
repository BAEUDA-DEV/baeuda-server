import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindAllArmyReq {
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString()
  query?: string;

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

// maybe not necessary
export class FindAllRegisteredArmyReq {
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
