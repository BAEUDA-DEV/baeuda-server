import { User as PrismaUser } from '@prisma/client';

import { UserRes } from '@/module/user/infra/rest/dto/response';

interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
}

export class User implements IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
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

  public static from(props: IUser): User {
    return new User(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.name,
      props.email,
    );
  }

  public static fromPrisma(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.name,
      prismaUser.email,
    );
  }

  public toRes(): UserRes {
    return UserRes.from({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      email: this.email,
    });
  }
}
