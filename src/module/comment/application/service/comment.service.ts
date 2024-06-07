import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

import { CommentType } from '@/module/comment/domain/comment';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    props: {
      where?: Prisma.CommentWhereInput
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.comment.count(props);
  }

  async findOne(
    props: {
      where?: Prisma.CommentWhereInput;
      include?: Prisma.CommentInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CommentType | null> {
    return tx.comment.findFirst(props);
  }

  async findAll(
    props: {
      where?: Prisma.CommentWhereInput;
      include?: Prisma.CommentInclude;
      skip?: number;
      take?: number;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CommentType[]> {
    return tx.comment.findMany(props);
  }

  async create(
    props: {
      data: Omit<Prisma.CommentCreateInput, 'id' | 'createAt' | 'UpdateAt'>;
      include?: Prisma.CommentInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CommentType> {
    return tx.comment.create(props);
  }

  async update(
    props: {
      where: Prisma.CommentWhereUniqueInput;
      data: Omit<
        Prisma.CommentUpdateInput,
        'id' | 'createAt' | 'UpdateAt' | 'writer' | 'quiz'
      >;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CommentType> {
    return tx.comment.update(props);
  }

  async deleteOne(
    props: {
      where: Prisma.CommentWhereUniqueInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<CommentType> {
    return tx.comment.delete(props);
  }
}
