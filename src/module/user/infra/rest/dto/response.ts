import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

interface IUserRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
}

export class UserRes implements IUserRes {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    email: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.email = email;
  }

  public static from(props: IUserRes): UserRes {
    return new UserRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.email,
    );
  }
}
