import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserUpdateReq {
  @ApiProperty()
  @IsString()
  name: string;
}
