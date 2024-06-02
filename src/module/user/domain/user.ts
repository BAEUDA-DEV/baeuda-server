import { User as PrismaUser } from '@prisma/client';

import { UserRes } from '@/module/user/infra/rest/dto/response';

export interface UserType extends PrismaUser {}

interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  profileImageUrl: string | null;
}

export class User implements IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
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

  public static from(props: IUser): User {
    return new User(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.email,
      props.profileImageUrl,
    );
  }

  public static fromPrisma(props: UserType): User {
    return new User(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.email,
      props.profileImageUrl,
    );
  }

  public toRes(): UserRes {
    return UserRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      email: this.email,
      profileImageUrl: this.profileImageUrl,
    });
  }
}
