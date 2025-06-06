import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReissueReq {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
