import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface IUserRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  profileImageUrl: string | null;
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
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  profileImageUrl: string | null;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    email: string,
    profileImageUrl: string | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.email = email;
    this.profileImageUrl = profileImageUrl;
  }

  public static from(props: IUserRes): UserRes {
    return new UserRes(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.email,
      props.profileImageUrl,
    );
  }
}
